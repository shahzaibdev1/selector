import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
var router = express.Router();

/* GET home page. */
router.get("/", authMiddleware(["user", "admin"]), (req, res) => {
  return res.json(req.authUser);
});

export default router;
