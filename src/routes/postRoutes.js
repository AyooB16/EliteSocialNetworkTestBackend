import express from "express";
import {
  createPost,
  getPosts,
  getMyPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { checkPostOwnership } from "../middlewares/authorizationMiddleware.js";

const router = express.Router();

// Create a new post
router.post("/", authMiddleware, createPost);
router.get("/myposts", authMiddleware, getMyPosts);

// Get all posts
router.get("/", getPosts);

// Get a single post
router.get("/:id", getPost);

// Update a post
router.put("/:id", authMiddleware, checkPostOwnership, updatePost);

// Delete a post
router.delete("/:id", authMiddleware, checkPostOwnership, deletePost);

// Like a post
router.post("/:id/like", authMiddleware, likePost);

// Unlike a post
router.post("/:id/unlike", authMiddleware, unlikePost);

export default router;
