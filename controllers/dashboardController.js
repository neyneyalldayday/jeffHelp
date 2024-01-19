// controllers/dashboardController.js

const db = require('../models');


const dashboardView =  async (req, res) => {
  try {
    // Fetch blog posts created by the logged-in user
    const userBlogPosts = await db.Post.findAll({
      where: { 
        userId: req.session.id 
      },
      
    });

   console.log( "raw data 8))))))))))))))))))))))))))))))D~~~~", userBlogPosts)
    const posts = userBlogPosts.map((post) => post.get({plain:true}))
    
    // Render the dashboard with the user's blog posts
    console.log("this is the user posts", posts)
    res.render('profile', { layout: "dashboard", posts });
  } catch (error) {
    console.error('Error fetching user blog posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  dashboardView
}
