import { config } from "dotenv";
import PayStack from "paystack-node";
import crypto from "crypto";

config({ quiet: true });

class UsePaymentGateway {
  constructor() {
    if (!process.env.PAYSTACK_SK) {
      throw new Error("Missing PAYSTACK_SK in environment variables");
    }
    if (!process.env.HOST) {
      throw new Error("Missing HOST in environment variables");
    }

    this.paystack = new PayStack(
      process.env.PAYSTACK_SK,
      process.env.NODE_ENV === "production" ? "live" : "test"
    );
  }

  async initVerificationCheckout(user, amount = 5000) {
    const amountInKobo = amount * 100;
    const uniqueReference = crypto.randomUUID();

    try {
      const response = await this.paystack.initializeTransaction({
        email: user?.email,
        amount: amountInKobo,
        reference: uniqueReference,
        currency: "NGN",
        callback_url: `${process.env.HOST}/auth/verification/finish`,
        metadata: JSON.stringify({
          custom_fields: [
            {
              display_name: "Payment For",
              variable_name: "description",
              value: "Landhome Verification Payment",
            },
            {
              display_name: "Host URL",
              variable_name: "host_url",
              value: process.env.HOST,
            },
          ],
        }),
      });


      const { authorization_url, reference, access_code } = response.body.data;

      return { url: authorization_url, id: reference, access_code };
    } catch (error) {
      console.error(
        "Paystack Initialization Error:",
        error.response?.body || error.message || error
      );
      throw new Error("Failed to initialize Paystack transaction.");
    }
  }

  async verifyTransaction(reference) {
    try {
      const response = await this.paystack.verifyTransaction({ reference });
      return response.body.data;
    } catch (error) {
      console.error(
        "Paystack Verification Error:",
        error.response?.body || error.message || error
      );
      throw new Error("Failed to verify Paystack transaction.");
    }
  }
}

export default UsePaymentGateway;
