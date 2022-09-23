import Stripe from "stripe";

export const stripe = Stripe(process.env.stripe_key);
