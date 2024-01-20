const router = require("express").Router()

const {
     handleSignUp,
      handleSignIn, 
      logout, 
      getAllUsers,
      getOneUser,
    } = require("../../controllers/userController");


router.route("/").post(handleSignUp);
router.route("/signin").post(handleSignIn);
router.route("/logout").post(logout);
router.route('/allusers').get(getAllUsers);
router.route('/dood/:id').get(getOneUser);


module.exports = router




