import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import adminRouter from "./routes/admin.js";
import billingRouter from "./routes/billingRoutes.js";
import selectorRouter from "./routes/SelectorRoutes.js";
import { stripe } from "./stripe.js";
import User from "./models/User.js";
import { generateApiKey } from "generate-api-key";

var app = express();
const baseUrl = process.env.BaseApiUrl || "/api/v1";

app.use(logger("dev"));

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());

app.use(`${baseUrl}/`, indexRouter);
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}/admin`, adminRouter);
app.use(`${baseUrl}/selectors`, selectorRouter);
app.use(`${baseUrl}/billing`, billingRouter);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret =
      "whsec_53ff7ba4ca953a9868389cdca5509f9232a8bedcf66f36d6562ed36be9503abd";
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case "customer.subscription.trial_will_end":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case "customer.subscription.updated":
        subscription = event.data.object;
        status = subscription.status;

        console.log(`Subscription status is ${status}.`);

        if (status === "active") {
          const user = await User.findOne({
            "stripe.customerId": subscription.customer,
          }).select("+stripe");

          if (!user) {
            return;
          }

          if (user.stripe.subscriptionId === subscription.id) {
            return;
          }
          user.stripe.subscriptionId = subscription.id;

          user.save();

          const updatesubscription = await stripe.subscriptions.update(
            subscription.id,
            { metadata: { apiKey: generateApiKey() } }
          );

          console.log(updatesubscription);
        }
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

export default app;
