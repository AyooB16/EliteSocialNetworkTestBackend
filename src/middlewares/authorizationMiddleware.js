import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";
// Middleware to check if the user owns the post
export const checkPostOwnership = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to check if the user owns the comment
export const checkCommentOwnership = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
