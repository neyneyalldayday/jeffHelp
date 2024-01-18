const express = require("express");
const router = express.Router();
const { renderHomepage, renderSignIn, renderSignUp } = require("../controllers/homeController");

router.get("/", renderHomepage);
router.get("/signin", renderSignIn);
router.get("/signup", renderSignUp);

module.exports = router;