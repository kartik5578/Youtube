const { asyncHandler } = require("../../Handlers/asyncHandler");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
let otptocheck;
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "OTP sent successfully", email ,otp:otp});
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

module.exports= { SendOTP, VerifyOTP, otptocheck };
