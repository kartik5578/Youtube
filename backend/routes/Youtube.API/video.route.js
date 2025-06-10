const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../../Middlewares/jwtMiddleware");
const { getVideoStatistics } = require("../../controllers/Youtube.API/Video.controller");
const {getChannelInfo} = require('../../controllers/youtube.API/Channel.controller')
const {getPlaylits,getPlayListItems}= require('../../controllers/youtube.API/Playlist.controller.js')


router.post('/video_statistics',authenticateToken,getVideoStatistics)
router.post('/channel_info',authenticateToken,getChannelInfo)
router.post('/playlists',authenticateToken,getPlaylits)
router.post('/playlistItems',authenticateToken,getPlayListItems)

module.exports = router