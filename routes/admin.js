import express from "express";
import { addSubAdmin } from "../controllers/adminController.js";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/add-sub-admin", addSubAdmin);

export default router;
