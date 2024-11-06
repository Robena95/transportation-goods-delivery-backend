// const Transporter = require("../models/transporterModel");
const User = require("../models/userModel");

// Update availability status
async function updateAvailability(transporterId, status) {
  return await User.findByIdAndUpdate(
    transporterId,
    { availability: status },
    { new: true }
  );
}

// Get transporter profile
async function getTransporterProfile(transporterId) {
  return await User.findOne({ _id: transporterId, role: "transporter" }).select(
    "-__v"
  );
}

// Get transporters
async function getTransporters() {
  return await User.find({ role: "transporter" }).select("-__v");
}

// Add a rating for a transporter
async function addRating(transporterId, ratingData) {
  return await User.findByIdAndUpdate(
    transporterId,
    { $push: { ratings: ratingData } },
    { new: true }
  );
}

module.exports = {
  updateAvailability,
  getTransporterProfile,
  addRating,
  getTransporters,
};
