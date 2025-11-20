import Stripe from "stripe";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-04-10",
    });

    const { amount, items, email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "pen",
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items),
        email: email || "cliente@ejemplo.com",
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: `ORD-${Date.now()}`,
    });

  } catch (error: any) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: error.message });
  }
}