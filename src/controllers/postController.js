import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const post = new Post({
      user: req.user._id,
      text: req.body.text,
    });
    await post.save();
    await post.populate("user", ["username", "image"]);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get my posts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user._id,
    })
      .populate("user", ["username", "image"])
      .sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["username", "image"])
      .sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", [
      "username",
      "image",
    ]);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user", ["username", "image"]);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Comment.deleteMany({ post: req.params.id });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "Post already liked" });
    }
    post.likes.push(req.user._id);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "Post not liked yet" });
    }
    post.likes.pull(req.user._id);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
