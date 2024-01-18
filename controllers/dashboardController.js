// controllers/dashboardController.js

const db = require('../models');


const dashboardView =  async (req, res) => {
  try {
    // Fetch blog posts created by the logged-in user
    const userBlogPosts = await db.Post.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    const posts = userBlogPosts.map((post) => post.get({plain:true}))
    
    // Render the dashboard with the user's blog posts
    res.render('profile', { layout: "dashboard", posts });
  } catch (error) {
    console.error('Error fetching user blog posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  dashboardView
}
