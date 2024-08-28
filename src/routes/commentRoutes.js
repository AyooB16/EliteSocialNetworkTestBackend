import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { checkCommentOwnership } from "../middlewares/authorizationMiddleware.js";

const router = express.Router();

// Create a new comment
router.post("/", authMiddleware, createComment);

// Get all comments for a post
router.get("/:postId", getComments);

// Update a comment
router.put("/:id", authMiddleware, checkCommentOwnership, updateComment);

// Delete a comment
router.delete("/:id", authMiddleware, checkCommentOwnership, deleteComment);

export default router;
