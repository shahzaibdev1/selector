import { stripe } from "../stripe.js";

const apiMiddleware = () => {
  return async (req, res, next) => {
    const subscription = await stripe.subscriptions.search({
      query: `status:'active' AND metadata['apiKey']:'${req?.query?.apiKey}'`,
      expand: ["data.plan.product"],
    });

    if (subscription?.data?.length !== 0) {
      console.log("Plan", subscription.data, "Plan");
      //   req.plan = subscription.data[0]?.plan?.product?.id;
      switch (subscription?.data[0]?.plan?.product?.id) {
        case process.env.BASIC_PLAN:
          req.myQuery = ["amazon", "ebay", "facebook"];
          break;

        case process.env.STANDARD_PLAN:
          req.myQuery = ["amazon", "ebay", "facebook", "wallmart", "daraz.pk"];
          break;

        default:
          break;
      }
      next();
    } else {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }
  };
};

export default apiMiddleware;
