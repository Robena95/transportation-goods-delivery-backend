const authService = require("../services/authService");

// Register endpoint
const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

// Login endpoint
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};

// Forgot password endpoint (send OTP)
const forgotPassword = async (req, res, next) => {
  try {
    const { email, userId, phoneNumber } = req.body;
    if (email) {
      // sendgrid
    } else {
      const otp = await authService.sendOtp(userId, phoneNumber);
      res.status(200).json({ message: "OTP sent", otp });
    }
  } catch (error) {
    next(error);
  }
};

// Verify OTP endpoint
const verifyOtp = async (req, res, next) => {
  try {
    const { otp, userId } = req.body;
    const isValid = await authService.verifyOtp(userId, otp);
    res.status(200).json({ message: isValid ? "OTP verified" : "Invalid OTP" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, forgotPassword, verifyOtp };
