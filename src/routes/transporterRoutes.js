const express = require("express");
const transporterController = require("../controllers/transporterController");
const authenticateToken = require("../services/middleware/authMiddleware");

const router = express.Router();

// router.post("/register", authenticateToken, transporterController.register);
router.patch(
  "/:id/availability",
  authenticateToken,
  transporterController.updateAvailability
);
router.get("/:id", authenticateToken, transporterController.getProfile);
router.get("/", authenticateToken, transporterController.getAllTranspoter);
router.post(
  "/:id/rate",
  authenticateToken,
  transporterController.rateTransporter
);

module.exports = router;
