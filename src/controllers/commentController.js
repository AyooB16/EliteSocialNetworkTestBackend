import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      post: req.body.post,
      user: req.user._id,
      text: req.body.text,
    });

    await comment.save();
    post.comments.push(comment._id);
    await post.save();
    await comment.populate("user", ["username", "image"]);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a post
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "user",
      ["username", "image"]
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const post = await Post.findById(comment.post);
    if (post) {
      post.comments = post.comments.filter(
        (commentId) => commentId.toString() !== req.params.id.toString()
      );
      await post.save();
    }

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
