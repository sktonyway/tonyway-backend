import express from "express";
import {
  loginUser,
  registerUser,
  getMe,
  updateProfile,
  logoutUser,
} from "./auth.controller.js";

import {reqUserId} from '../../common/middlewares/authenticate.js'

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Message recieved");
});

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", reqUserId, getMe);
router.post("/me", reqUserId, updateProfile);
router.get("/logout", logoutUser);

export default router;
