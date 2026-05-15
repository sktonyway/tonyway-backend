import { asyncHandler } from "../../utils/AsyncHandlers.js";
import { User } from "./auth.modal.js";

// import { setUser } from "./auth.middleware.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

// Params: username, email, password response with error or {username, token, id}
const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body;
  const user = await User.findOne({
    $or: [{ email }, { username: username.toLowerCase() }],
  });

  if (user) {
    return next(ApiError.conflict("Username or Email already registered."));
  }
  if (!user) {
    const createdUser = await User.create({
      username,
      email,
      password,
      sessions: [
        {
          ip: req.ip || "Unknown IP",
          device_name: req.device || "Unknown Device",
          location: req.location || "Unknown",
          isActive: true,
        },
      ],
    });

    const token = createdUser.generateToken(); // Holds _id
    return res.json(
      ApiResponse.created(
        { id: createdUser._id, username: createdUser.username, token },
        "User created successfully.",
      ),
    );
  }

  // Send welcome email to the users.
});

// Params: {email, password}
const loginUser = asyncHandler(async (req, res, next) => {
  // Check if registered and then verify credentials
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(ApiError.unAuthorised("Invalid Credentials"));
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return next(ApiError.unAuthorised("Invalid Credentials"));
  }

  // Construct the new session object
  const newSession = {
    ip: req.ip || "Unknown IP",
    device_name: req.device || "Unknown Device",
    location: req.location || "Unknown",
    isActive: true,
  };

  // Push new session & limit array size to the last 10 sessions
  user.sessions.push(newSession);

  if (user.sessions.length > 3) {
    user.sessions.shift(); // Removes the oldest session from the beginning of the array
  }

  // Save the updated user document
  await user.save();

  // will send email on new login.
  const token = user.generateToken();
  return res.json(
    ApiResponse.accepted(
      { id: user._id, username: user.username, token },
      "Login Successful",
    ),
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  return res.json(ApiResponse.success(null, "Logout successful"));
});

const getMe = asyncHandler(async (req, res) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  return res.json(ApiResponse.success(user));
});

const updateProfile = asyncHandler(async (req, res) => {
  let userId = req.user;
  const user = await User.findByIdAndUpdate(userId, req.body);
  return res.json(ApiResponse.success(user, "Update Successful"));
});

export { loginUser, registerUser, getMe, updateProfile, logoutUser };
