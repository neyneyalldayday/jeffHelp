const router = require("express").Router()

const { handleSignUp, handleSignIn, logout} = require("../../controllers/userController")
router.route("/").post(handleSignUp)
router.route("/signin").post(handleSignIn)
router.route("/logout").post(logout)



module.exports = router




