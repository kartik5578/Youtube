const express = require("express");
const {SendOTP,VerifyOTP,otptocheck, refreshToken, getRefreshandAccessToken} = require( '../../controllers/auth/otp.controller')
const dotenv = require("dotenv");
const { authenticateToken } = require("../../Middlewares/jwtMiddleware");
const authRouter = express.Router();


authRouter.post('/verify-otp',authenticateToken, VerifyOTP);
authRouter.post('/send-otp',SendOTP);
authRouter.post('/refresh-token',refreshToken)
authRouter.post('/get-tokens',getRefreshandAccessToken)

module.exports = authRouter;
