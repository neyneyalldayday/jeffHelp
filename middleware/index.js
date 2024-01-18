// middleware/index.js

const ensureAuthenticated = (req, res, next) => {
  // Check if the user information is stored in the session
  if (req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler
    return next();
  }

  // User is not authenticated, redirect to the login page or handle accordingly
  res.redirect('/signin');
};

module.exports = { ensureAuthenticated };
