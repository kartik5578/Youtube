const express = require("express");
const {SendOTP,VerifyOTP,otptocheck} = require( '../../controllers/auth/otp.controller')
const dotenv = require("dotenv");
const { authenticateToken } = require("../../Middlewares/jwtMiddleware");
const authRouter = express.Router();


authRouter.post('/verify-otp',authenticateToken, VerifyOTP);
authRouter.post('/send-otp',authenticateToken,SendOTP);

module.exports = authRouter;
