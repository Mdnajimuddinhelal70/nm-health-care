import config from "src/config/index.js";
import Stripe from "stripe";

export const stripe = new Stripe(config.stripeSecretKey as string);
