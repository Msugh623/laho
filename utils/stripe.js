import { config } from "dotenv";
import Stripe from "stripe";

config({
  quiet: true,
});

class UseStripe {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SK);
  }
  async initVerificationCheckout() {
    const checkout = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card", "afterpay_clearpay"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: {
              name: "laho Verification Payment",
              description:
                "Become a verified landsmart dealer, a verified profile strengthens customer trust",
              images: ["/logo.png"],
            },
            unit_amount: 5000 * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.HOST}/auth/verification/finish`,
      cancel_url: `${process.env.HOST}/auth/verification/end`,
    });
    return { url: checkout.url, id: checkout.id };
  }
}

export default UseStripe;
