const User = require("../models/userModel");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = { createUser, getUserById };
