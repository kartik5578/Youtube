const express = require("express");
const {addContrat,getContract,updateContract}= require("../../controllers/contract/contract.controller")
const { authenticateToken } = require("../../Middlewares/jwtMiddleware");
const router = express.Router();


router.post('/get',authenticateToken,getContract)
router.post('/updatecontract',authenticateToken,updateContract)
router.post('/addcontract',authenticateToken,addContrat)

module.exports =router