const router = require("express").Router()
const{dashboardView} = require("../controllers/dashboardController")
router.get("/", dashboardView)







module.exports = router