import express from "express";
import {
  createCheckoutSession,
  createPortalSession,
  getPrices,
  verifySession,
} from "../controllers/billingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import { stripe } from "../stripe.js";
var router = express.Router();

router.use(authMiddleware());

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/get-prices", getPrices);

router.get("/verify-session", verifySession);

router.post("/create-checkout-session", createCheckoutSession);

router.post("/create-portal-session", createPortalSession);

export default router;
