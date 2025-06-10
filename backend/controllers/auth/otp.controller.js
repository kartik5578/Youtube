const { asyncHandler } = require("../../Handlers/asyncHandler");
const nodemailer = require('nodemailer');
const brcyptjs = require('bcryptjs');
const crypto = require('crypto');
const bcryptjs = require("bcryptjs");
const numSaltRounds = 4
let otptocheck;


 async function generateAccessToken(email) {
  return await jwt.sign({ email }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
}

async function generateRefreshToken(email) {
  return await jwt.sign({ email }, process.env.REFRESH_SECRET, { expiresIn: '14d' });
}

const getRefreshandAccessToken= asyncHandler(async (req,res) => {
  const {email} = req.body
  const accessToken = await generateAccessToken(email);
  const refreshToken = await generateRefreshToken(email);
   res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax',
    maxAge: 14 * 24 * 60 * 60 * 1000, 
  });

  res.json({ accessToken });
});


const refreshToken=asyncHandler(async(req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ error: 'No refresh token provided' });

  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    const accessToken = generateAccessToken(payload.email);
    const refreshToken = generateRefreshToken(payload.email);

  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 14* 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (e) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
})


const SendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, 
    secure:false,
    service: "gmail",
    auth: {
      user: process.env.OTP_MAIL,
      pass: process.env.OTP_PASSWORD,
    },
  });
  function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  const otp = generateOTP();
  otptocheck = otp;
  

  const mailOptions = {
    from: '"Team@Dev" <mailerprj32@gmail.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  const hashedOtp = await bcryptjs.hash(otp,numSaltRounds)
 
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "OTP sent successfully", email ,otp:hashedOtp});
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send({ message: "Error sending OTP", error });
  }
});


const VerifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
try{
  if (!email || !otp) {
    return res.status(400).send({ message: "Email and OTP are required" });
  }

  if (otp === otptocheck) {
    res.status(200).send({ message: "OTP verification successful" });
  } else {
    res.status(400).send({ message: "Invalid OTP" });
  }
}
catch(error){
    console.log("Error in verification: ",error);
    res.status(500).json({
        success:false,
        error:"Server Error in otp verification"
    })
}
});

module.exports= { SendOTP, VerifyOTP, otptocheck , refreshToken, getRefreshandAccessToken};
