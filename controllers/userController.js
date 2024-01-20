const db = require('../models');




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

    if (!newUser.id) {
      throw new Error('User ID not assigned');
    }

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username; 
      req.session.loggedIn = true;
      res.json({message:  "yo gimmie an id", newUser})
    })
    console.log('User signed up:', username);
    // Redirect to the login page after successful signup
    console.log("user creds", newUser)
   
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
          console.log("user creds", user)
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


const getAllUsers =  async (req, res) => {
try {
  const allUsers = await db.User.findAll()
  res.json(allUsers)
} catch (error) {
  console.error(error)
  res.status(500).json(error)
}
}

const getOneUser = async (req, res) => {
  try {
    const dood = await db.User.findOne({
      where: {
        id: req.params.id
      }
    })
    console.log(dood)
    res.status(200).json(dood);
  } catch (error) {
    console.error(error)
  res.status(500).json(error)
  }
}

module.exports = {
  renderSignUp,
  handleSignUp,
  handleSignIn,
  logout,
  getAllUsers,
  getOneUser,
};
