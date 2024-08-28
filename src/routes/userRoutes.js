// routes/userRoutes.js
import express from "express";
import upload from "../middlewares/multerConfig.js";
import { check } from "express-validator";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// User registration with image upload
router.post(
  "/register",
  upload.single("image"),
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  registerUser
);

// User login
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  loginUser
);

// Get user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile with image upload
router.put(
  "/profile",
  authMiddleware,
  upload.single("image"),
  updateUserProfile
);

// Delete user account
router.delete("/profile", authMiddleware, deleteUserProfile);

export default router;
