const nodemailer = require("nodemailer");
const User = require("../models/userModel");
// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (userId, message) => {
  // Fetch user email from your user service, for example
  // This is a placeholder, replace it with actual user retrieval logic
  const user = await collection.findOne(
    { _id: userId },
    { projection: { email: 1 } }
  );

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Notification",
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
