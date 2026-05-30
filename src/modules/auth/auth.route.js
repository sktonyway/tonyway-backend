import express from "express";
import {
  loginUser,
  registerUser,
  getMe,
  updateProfile,
  logoutUser,
} from "./auth.controller.js";

import { extractSessionDetails } from "./auth.middleware.js";
import {
  checkHeader,
  logged,
} from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", extractSessionDetails, loginUser);
router.post("/register", extractSessionDetails, registerUser);
router.get("/me", checkHeader,logged, getMe);
router.post("/me", checkHeader,logged, updateProfile);
router.get("/logout", checkHeader,logged, logoutUser);

export default router;
