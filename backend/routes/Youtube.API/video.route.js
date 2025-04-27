const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../Middlewares/jwtMiddleware");
const { getVideoStatistics } = require("../../controllers/Youtube.API/Video.controller");



router.post('/video_statistics',authenticateToken,getVideoStatistics)

module.exports = router