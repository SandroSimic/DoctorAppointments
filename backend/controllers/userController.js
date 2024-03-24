import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import generateToken from "../utils/generateToken.js";

// @desc  Register User
// @route POST /api/user/register
// @access Public
const register = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // If there is a missing field
  if (!username || !email || !password || !role) {
    return next(new AppError("Please provide all fields", 400));
  }

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  // save the created user

  const newUser = await user.save();
  generateToken(res, newUser._id);
  res.status(200).json({ newUser });
});

// @desc  Login User
// @route POST /api/user/login
// @access Public
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // find the user by email
  const user = await User.findOne({ email });

  // Check if the user exists and if the does see if the password matches the entered password
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({ user });
  } else {
    return next(new AppError("Email or Password is incorrect", 401));
  }
});

// @desc  Logout
// @route POST /api/user/logout
// @access Protected
const logout = catchAsync(async (req, res, next) => {
  //remove the cookie
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc  Get currently authenticated user
// @route GET /api/user/me
// @access Protected
const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ user });
});

// @desc  Update User Profile
// @route PATCH /api/user/update
// @access Protected
const updateProfile = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const userId = req.user._id;

  let user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  user.username = username;
  user.email = email;
  user.password = password;

  user = await user.save();

  res.status(200).json({ user });
});

export { register, login, logout, getMe, updateProfile };
