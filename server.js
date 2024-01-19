const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const helpers = require("./utils/helpers")
const db = require('./models'); // Adjust the path as needed
// const htmlRoutes = require('./routes/html-routes');
// const userRoutes = require('./routes/user-routes');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const path = require("path");
// Middleware for session management
const sessi = {
  secret: "secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",

  },
  resave: false, 
  saveUninitialized: true,
  store: new SequelizeStore({db: sequelize})

}
app.use(session(sessi));

// Configure Handlebars
const hbs = exphbs.create({ helpers }); // Specify default layout
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Initialize bcrypt
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")))
// // Use bcrypt for user authentication
// app.post('/user/signin', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find the user in the database using Sequelize
//     const user = await db.User.findOne({
//       where: { username },
//     });

//     if (user) {
//       // Compare the entered password with the hashed password stored in the database
//       const isPasswordMatch = await bcrypt.compare(password, user.password);

//       if (isPasswordMatch) {
//         // Successfully logged in, set user information in the session
//         req.session.user = {
//           id: user.id,
//           username: user.username,
//         };

//         res.redirect('/dashboard');
//       } else {
//         // Passwords do not match
//         res.redirect('/signin');
//       }
//     } else {
//       // User not found
//       res.redirect('/signin');
//     }
//   } catch (error) {
//     console.error('Error finding user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Include routes
// app.use(routes);
// app.use('/user', userRoutes);
app.use(require('./routes/'))

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  sequelize.sync({force: false});
});
