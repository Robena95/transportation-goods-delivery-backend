const transporterService = require("../services/transporterService");

// Register a new transporter
async function register(req, res, next) {
  try {
    const transporter = await transporterService.registerTransporter(req.body);
    res
      .status(201)
      .json({ message: "Transporter registered successfully", transporter });
  } catch (error) {
    next(error);
  }
}

// Update availability status
async function updateAvailability(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const transporter = await transporterService.updateAvailability(id, status);
    res.status(200).json({ message: "Availability updated", transporter });
  } catch (error) {
    next(error);
  }
}

// Get transporter profile
async function getProfile(req, res, next) {
  try {
    const { id } = req.params;
    const transporter = await transporterService.getTransporterProfile(id);
    if (!transporter)
      return res.status(404).json({ message: "Transporter not found" });
    res.status(200).json(transporter);
  } catch (error) {
    next(error);
  }
}
async function getAllTranspoter(req, res, next) {
  try {
    const transporters = await transporterService.getTransporters();
    if (!transporters)
      return res.status(404).json({ message: "Transporter not found" });
    res.status(200).json(transporters);
  } catch (error) {
    next(error);
  }
}

// Add a rating to a transporter
async function rateTransporter(req, res, next) {
  try {
    const { id } = req.params;
    const ratingData = req.body;
    const transporter = await transporterService.addRating(id, ratingData);
    res.status(200).json({ message: "Rating added", transporter });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  updateAvailability,
  getProfile,
  rateTransporter,
  getAllTranspoter,
};
