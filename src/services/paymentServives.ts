import { loadStripe, Stripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export const createPaymentIntent = async (
  amount: number, 
  items: any[], 
  email: string
): Promise<string> => {
  const isProduction = import.meta.env.PROD;
  const API_URL = isProduction 
    ? window.location.origin + '/api'
    : 'http://localhost:3001/api';

  const response = await fetch(`${API_URL}/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      amount, 
      items,
      email: email || 'cliente@ejemplo.com'
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al crear el pago');
  }

  const data = await response.json();
  return data.clientSecret;
};
