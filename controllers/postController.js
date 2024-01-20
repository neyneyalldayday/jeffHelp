// controllers/postController.js

const db = require('../models');

const renderSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await db.Post.findByPk(postId, { include: db.User }); // Assuming a User association exists
    res.render('single-post', { post });
  } catch (error) {
    console.error('Error rendering single post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const renderNewPost = (req, res) => {
  res.render('new-post');
};

const createPost = async (req, res) => {
  console.log("yo doggy")
  try {
    const { title, content } = req.body;

    // Assuming user is authenticated and req.user contains user information
    const newPost = await db.Post.create({
      title,
      content,
      userId: req.session.userId,
    });

    res.json(newPost);
  } catch (error) {
    console.error('Error creating new post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const renderUpdatePost = async (req, res) => {
  try {
    const postToUpdate = await db.Post.findByPk(req.params.id);
    if (postToUpdate && postToUpdate.UserId === req.user.id) {
      res.render('update-post', { postToUpdate });
    } else {
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error fetching post to update:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    await db.Post.update(
      { title, content },
      { where: { id: req.params.id, UserId: req.user.id } }
    );
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const renderDeletePost = async (req, res) => {
  try {
    const postToDelete = await db.Post.findByPk(req.params.id);
    if (postToDelete && postToDelete.UserId === req.user.id) {
      res.render('delete-post', { postToDelete });
    } else {
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error fetching post to delete:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const renderDashboard = async (req, res) => {
//   try {
//     // Assuming you have a User model with a posts association
//     const user = await db.User.findByPk(req.user.id, {
//       include: {
//         model: db.Post,
//         order: [['createdAt', 'DESC']], // Order posts by creation date, newest first
//       },
//     });

//     if (user) {
//       // Render the dashboard view and pass user and user's posts to the view
//       res.render('dashboard', { user });
//     } else {
//       // Handle case where user is not found
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error rendering dashboard:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const deletePost = async (req, res) => {
  try {
    await db.Post.destroy({ where: { id: req.params.id, UserId: req.user.id } });
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const allPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll()
    res.status(200).json(posts)
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
    
  }
}

const onePost= async (req, res) => {
  try {
    userId = req.session.userId
    const one = await db.Post.findOne({
      where: {
        userId
      }
    })
    res.status(200).json({message: "why is there no userId" ,one})
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
}

module.exports = {
  renderSinglePost,
  renderNewPost,
  createPost,
  allPosts,
  onePost,
  // renderUpdatePost,
  // updatePost,
  // renderDeletePost,
  // renderDashboard,
  // deletePost,
};
