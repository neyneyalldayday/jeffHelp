// middleware/otherMiddleware.js

const timeout = require('connect-timeout');

// Function to handle session timeout
const sessionTimeout = (timeoutDuration) => (req, res, next) => {
  // If the user is authenticated, reset the session timeout
  if (req.isAuthenticated()) {
    req.session.touch();
  }

  // If the session timeout is reached, log the user out
  req.on('timeout', () => {
    req.logout();
    res.redirect('/signin');
  });

  // Set the session timeout duration
  req.setTimeout(timeoutDuration);

  // Continue to the next middleware
  next();
};

module.exports = {
  sessionTimeout,
};
