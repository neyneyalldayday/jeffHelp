const router = require("express").Router()
const postRoutes = require("./postRoutes")
// const commentRoutes = require("./commentRoutes")
const userRoutes = require("./userRoutes")
router.use("/user", userRoutes)
router.use("/post", postRoutes)
// router.use("/comment", commentRoutes)

module.exports = router
