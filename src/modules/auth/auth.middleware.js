import jwt from "jsonwebtoken";
import User from "../../common/utils/userSchema.js";

// This just attach
const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }

  try {
    // Attaches user = _id
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = await decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

export { protect };
