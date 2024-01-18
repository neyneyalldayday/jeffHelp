const bcrypt = require('bcrypt');
const db = require('../models');
const router = require("express").Router()
const renderSignUp = (req, res) => {
  res.render('signup');
};



const handleSignUp = async (req, res) => {
  try {
    const { username, password } = req.body;

 
   

    // Create a new user in the database
    const newUser = await db.User.create({
      username,
      password
    });
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username; 
      req.session.loggedIn = true;
    })
    console.log('User signed up:', username);
    // Redirect to the login page after successful signup
    res.json(newUser)
  } catch (error) {
    console.error('Error during signup:', error);

    // Render the error page or provide a flash message to the user
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};

const handleSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user by username
    const user = await db.User.findOne({ where: { username } });
    if (user) {
      // Compare the entered password with the hashed password stored in the database
      const isPasswordMatch = user.matchPassword(password)
      console.log(isPasswordMatch);
      if (isPasswordMatch) {
        // Successfully logged in, set user information in the session (optional)
        req.session.save(() => {
          req.session.userId = user.id; 
          req.session.username =  user.username;
          req.session.loggedIn = true;
          res.json({
            user, 
            message: "You are now logged in."
          })
        });
        console.log("User logged in:", username);
        
        // Redirect to the dashboard or any other authenticated route
      } else {
        // Passwords do not match
        // Render the error page or provide a flash message to the user
        res.render("error", { error: "Incorrect username or password" });
      }
    } else {
      // User not found
      // Render the error page or provide a flash message to the user
      res.render("error", { error: "User not found!" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    // Render the error page or provide a flash message to the user
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  if(req.session.loggedIn){
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
};

module.exports = {
  renderSignUp,
  handleSignUp,
  handleSignIn,
  logout,
};
