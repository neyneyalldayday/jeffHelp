// controllers/commentController.js
const router = require("express").Router()
const db = require('../models');

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    // Create a new comment in the database
    await db.Comment.create({
      text: comment,
      PostId: req.params.id,
      UserId: req.user.id,
    });

    // Redirect back to the single blog post after adding the comment
    res.redirect(`/post/${req.params.id}`);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// module.exports = {
//   addComment,
// };
module.exports = router