import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMIddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD:POST
router.post("/register", registerController);

//LOGIN || METHOD:POST
router.post("/login", loginController);

//TEST || METHOD GET
router.get("/test", requireSignIn, isAdmin, testController);

//Private Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//forgot password || Post
router.post("/forgot-password", forgotPasswordController);

export default router;
