const express = require("express");
const { listAllCreators,getSingleCreator,addCreatorHandler } = require("../../Handlers/Creators/creator.handler");
const {getCreatorList,getCreator,addCreator}= require("../../controllers/creator/creator.controller")
const { authenticateToken } = require("../../Middlewares/jwtMiddleware");
const router = express.Router();


router.post('/getcreators',authenticateToken,getCreatorList)
router.get('/getcreator/:creatorId',authenticateToken,getCreator)
router.post('/addcreator',authenticateToken,addCreator)

module.exports =router