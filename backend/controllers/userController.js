import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //SET token as HTTPS only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSites: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid password or Email");
  }
});

const userSignup = asyncHandler(async (req, res) => {
  res.send("auth signup");
});

//private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message : 'User logged out successfully'})
});

//private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("my profile");
});

//private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("user update profile");
});

//private
const getUsers = asyncHandler(async (req, res) => {
  res.send("all users");
});

//private
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//private
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//private
const updateUser = asyncHandler(async (req, res) => {
  res.send("user update profile");
});

export {
  userSignin,
  userSignup,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
