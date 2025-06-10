const express = require("express");
const {getOrganizationProfile,addOrganizationProfile,updateOrganizationProfile}= require("../../controllers/organization/organization.controller")
const { authenticateToken } = require("../../Middlewares/jwtMiddleware");
const router = express.Router();


router.post('/get',authenticateToken,getOrganizationProfile)
router.get('/updateorganization',authenticateToken,updateOrganizationProfile)
router.post('/addorganization',authenticateToken,addOrganizationProfile)

module.exports =router