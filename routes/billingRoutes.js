import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import { stripe } from "../stripe.js";
var router = express.Router();

router.use(authMiddleware());

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/get-prices", async (req, res) => {
  let data = await stripe.prices.list({
    lookup_keys: ["my_secret", "my_secret1"],
  });

  return res.json({ data });
});

router.get("/verify-session", async (req, res) => {
  try {
    const user = await User.findById(req.authUser.userId).select("+stripe");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(
      user.stripe.sessionId || req.query.session_id
    );

    if (!checkoutSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    return res.json(checkoutSession);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "something went wrong", err: err.message });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  const user = await User.findById(req.authUser.userId);
  let lookup_keys = Array.isArray(req.body.lookup_key) || [req.body.lookup_key];

  let localUrl = "http://localhost:3000";
  let productionUrl = "http://localhost";

  let YOUR_DOMAIN =
    process.env.NODE_ENV === "development" ? localUrl : productionUrl;

  const prices = await stripe.prices.list({
    lookup_keys,
    expand: ["data.product"],
  });

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    metadata: {
      apiKey: "someKeys",
    },
    discounts: [
      {
        coupon: req.body.couponCode,
      },
    ],
    customer: user.stripe?.customerId,
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}/billing-page?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/billing-page?canceled=true`,
  });

  res.json({ url: session.url });
});

router.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  try {
    const user = await User.findById(req.authUser.userId).select("+stripe");

    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      user.stripe.sessionId || session_id
    );

    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    let localUrl = "http://localhost:3000";
    let productionUrl = "http://localhost";

    let YOUR_DOMAIN =
      process.env.NODE_ENV === "development" ? localUrl : productionUrl;

    const returnUrl = `${YOUR_DOMAIN}/billing-page?return-from-dashboard=true`;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    res.json({ url: portalSession.url });
    user.stripe.sessionId = checkoutSession.id;
    user.stripe.subscriptionId = checkoutSession.subscription;

    user.save();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
