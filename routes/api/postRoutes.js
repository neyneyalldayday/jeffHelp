const router = require("express").Router()
const {
  renderSinglePost,
  renderNewPost,
  createPost,
  allPosts,
  onePost
} = require("../../controllers/postController")

router.get("/singlepost", renderSinglePost);
router.get("/new", renderNewPost);
router.post("/", createPost);
router.get('/', allPosts);
router.get('/one/:id', onePost);

module.exports = router