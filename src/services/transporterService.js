const Transporter = require("../models/transporterModel");

// Register a new transporter
async function registerTransporter(data) {
  const transporter = new Transporter(data);
  return await transporter.save();
}

// Update availability status
async function updateAvailability(transporterId, status) {
  return await Transporter.findByIdAndUpdate(
    transporterId,
    { availability: status },
    { new: true }
  );
}

// Get transporter profile
async function getTransporterProfile(transporterId) {
  return await Transporter.findById(transporterId).select("-__v");
}

// Add a rating for a transporter
async function addRating(transporterId, ratingData) {
  return await Transporter.findByIdAndUpdate(
    transporterId,
    { $push: { ratings: ratingData } },
    { new: true }
  );
}

module.exports = {
  registerTransporter,
  updateAvailability,
  getTransporterProfile,
  addRating,
};
