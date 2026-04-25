import express from "express";
import {
  loginUser,
  registerUser,
  getMe,
  updateProfile,
  logoutUser,
} from "./auth.controller.js";
import { protect } from "./auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Message recieved");
});

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", protect, getMe);
router.post("/me", protect, updateProfile);
router.get("/logout", logoutUser);

export default router;
