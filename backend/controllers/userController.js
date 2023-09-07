import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

//login
const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    //create token and set it to cookie

    generateToken(res, user._id);
    res.status(200).json({
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

//register

const userSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User Already registered");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    //create token and save it through cookie
    generateToken(res, user._id);
    //return data of the user
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//private
//logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out successfully" });
});

//private
//logout
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
  }else{
    res.status(404)
    throw new Error('User not found')
  }
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
