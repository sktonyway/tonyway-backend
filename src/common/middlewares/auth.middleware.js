import { User } from "../../modules/auth/auth.modal.js";
import ApiError from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";

/**
 * 1. checkJWT (The "Soft" Check)
 * Use this on public routes where you want to identify the user IF they are logged in,
 * but don't want to block them if they are a guest.
 */
export async function checkHeader(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(); // No token? No problem, move to controller as guest.
    }

    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.jwt_secret); // Input: token, Output: { userId }

    if (decoded && decoded.id) {
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user._id; // Attach user to the request
      }
    }
    next();
  } catch (error) {
    next(); // Even on error, we treat them as a guest
  }
}

/**
 * 2. logged (The "Gatekeeper")
 * Use this on private routes (like /create-poll) AFTER checkJWT.
 */
export const logged = (req, res, next) => {
  if (!req.user) {
    return next(ApiError.unAuthorised("Invalid Token"));
  }
  next();
};
