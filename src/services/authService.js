const User = require("../models/userModel");
const twilio = require("twilio");
const UserOtp = require("../models/otpModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Load JWT secret from environment
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"; // Set token expiration

// Sample method to register a user
const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10); // Salt rounds = 10

  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
    location: userData.location,
    email: userData.email,
    password: hashedPassword,
    profileImage: userData.profileImage,
    note: userData.note,
    role: userData.role,
  });
  return await user.save();
};

// Sample method to login a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { user, token };
};

// Generate OTP for forgot password
const generateOtp = () => crypto.randomInt(100000, 999999).toString();
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
// Send OTP to user (this is a placeholder; in production, integrate with an email service)
const sendOtp = async (userId, phoneNumber) => {
  const otp = generateOtp();
  // Save OTP to the database
  await UserOtp.create({ userId, otp });

  // Send the OTP via Twilio SMS
  await twilioClient.messages.create({
    body: `Your OTP is ${otp}. This code will expire in 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });

  return { message: "OTP sent successfully via SMS" };
};

// Verify OTP
const verifyOtp = async (userId, otp) => {
  const userOtp = await UserOtp.findOne({ userId, otp });
  if (!userOtp) {
    throw new Error("Invalid or expired OTP");
  }
  // Delete OTP after verification
  await UserOtp.deleteOne({ _id: userOtp._id });

  return { message: "OTP verified successfully" };
};

module.exports = { registerUser, loginUser, sendOtp, verifyOtp };
