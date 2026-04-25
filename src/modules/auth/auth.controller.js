import { asyncHandler } from "../../common/utils/AsyncHandlers.js";
import User from "../../common/utils/userSchema.js";
import { protect } from "./auth.middleware.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "This person is registered" });
  }
  if (!user) {
    const createdUser = await User.create({ email, password });
    sendTokenResponse(createdUser, 201, res);
  }

  // Send welcome email to the users.
});

const loginUser = asyncHandler(async (req, res) => {
  // Check if registered and then verify credentials
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials man" });
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid Credentials man" });
  }
  // will send email on new login.
  sendTokenResponse(user, 200, res);
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
    httpOnly: true,
  });
  res.status(200).json({ sucess: true, message: "Logged Out successful" });
});

const getMe = asyncHandler(async (req, res) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  res.json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
  let userId = req.user;
  const user = await User.findByIdAndUpdate(userId, req.body);
  res.json(user);
});

// Helper function
// Generate token from schema method using id:_id,
function sendTokenResponse(user, statusCode, res) {
  const token = user.generateToken(); // Holds _id

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true, // Prevents JS access (Crucial for security)
    secure: true, // Only sends over HTTPS in production
    sameSite: "Lax", // Protects against CSRF
  };
  user.password = undefined;
  res
    .status(statusCode)
    .cookie("token", token, cookieOptions) // Name of cookie is 'token'
    .json({
      success: true,
      user,
    });
}

export { loginUser, registerUser, getMe, updateProfile, logoutUser };
