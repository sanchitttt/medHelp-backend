"use strict";
const nodemailer = require("nodemailer");

async function sendEmail(email, link, type = "VERIFY") {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.email',
        secure: false,
        auth: {
            user: 'sanchittewari222@gmail.com',
            pass: 'aeoiaayciaxouart'
        }
    });

    const info = await transporter.sendMail({
        from: 'sanchittewari222@gmail.com', // sender address
        to: email, // list of receivers
        subject: type === 'VERIFY' ? 'Verify your password' : 'Reset your password', // Subject line
        html: `<!DOCTYPE html>
        <html>
        <head>
          <title>Email Verification</title>
        </head>
        <body>
          <h2>Email Verification</h2>
          <p>Hello,</p>
          <p>Thank you for signing up. Please click on the link below to verify your email:</p>
          <b><a href=${'http://localhost:8082/auth/signupusers/' + link}>Verification link</a></b>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you did not sign up for an account, you can safely ignore this email.</p>
          <p>Best regards,<br>Your Company</p>
        </body>
        </html>`, // html body
    });

    console.log("Message sent", info)
}

function generateOtp() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = { generateOtp, sendEmail };