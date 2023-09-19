import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  userSignin,
  userSignup,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router()

router.route('/').get(protect, admin, getUsers).post(userSignup)
router.post('/logout', logoutUser) // public
router.post('/login', userSignin)// public
router.route('/profile').put(protect, updateUserProfile)// private till login
router.route('/:userId/profile').get(protect, getUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)//private except admin

export default router
