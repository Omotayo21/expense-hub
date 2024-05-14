import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bcryptjs from 'bcryptjs';



export const sendEmail = async ({email, emailType, userId}) => {
    try {
        // create a hashed toked
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
     if(emailType === 'VERIFY') {
 await User.findByIdAndUpdate(userId,
        {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
     } else if(emailType === "RESET"){
         await User.findByIdAndUpdate(userId,
        {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
     }

     var transporter = nodemailer.createTransport({
       service: "gmail",
    
       auth: {
         user: process.env.NODEMAILER_MAIL,
         pass: process.env.NODEMAILER_PASS,
       },
     });
   //add credentials to environmentfile later

   const mailOptions = {
     from: "@rufaiabdulrahman21@gmail.com",
     to: email,
     subject:
       emailType === "VERIFY"
         ? "Welcome to Expense Hub, pls verify your email"
         : "Reset your password",
     html: `<p> 
 <div style="background-color: #fafafa; padding: 20px; border-radius: 10px;">
    <h1 style="color: #008000; margin-bottom: 20px;">Welcome to Expense Hub!</h1>
    <p style="color: #737373; margin-bottom: 15px;">Greetings from Expense Hub! </p>
    <p style="color: #737373; margin-bottom: 15px;">To complete your registration, please click on the button below to verify your email address:</p>
    <p style="text-align: center; margin-bottom: 20px;"><a href="${
      process.env.DOMAIN
    }/${
       emailType === "VERIFY" ? "verifyEmail" : "resetpassword"
     }?token=${hashedToken}" style="background-color: #008000; color: #fafafa; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email Address</a></p>
    <p style="color: #737373; margin-bottom: 15px;">Alternatively, you can copy and paste the following link into your browser:</p>
    <p style="color: #737373; margin-bottom: 15px;"> ${process.env.DOMAIN}/${
       emailType === "VERIFY" ? "verifyEmail" : "resetpassword"
     }?
     token=${hashedToken}</p>
    
  </div>
    </p>`,
   };
const mailResponse = await transporter.sendMail(mailOptions)
return mailResponse;  
} catch (error) {
      throw new Error(error.message)  
    }
}