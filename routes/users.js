import express from "express";
import {
  forgetPassword,
  getUser,
  signInUser,
  signUpUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-in", signInUser);
router.post("/get-user", authMiddleware(), getUser);
router.post("/sign-up", signUpUser);
router.post("/forget-password", forgetPassword);

export default router;
