// api/create-payment-intent.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  // Solo permite POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { amount, items, email } = req.body;

    // Crear PaymentIntent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: 'pen', // Cambia a 'pen' si usas Soles
      automatic_payment_methods: { enabled: true },
      metadata: { 
        items: JSON.stringify(items),
        email: email || 'cliente@ejemplo.com'
      }
    });

    // Respuesta exitosa
    res.status(200).json({ 
      clientSecret: paymentIntent.client_secret,
      orderId: `ORD-${Date.now()}`
    });
  } catch (error: any) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
};