const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authenticateToken = require("../services/middleware/authMiddleware");

router.post(
  "/notifications",
  authenticateToken,
  notificationController.createNotification
);
router.get(
  "/notifications/:userId",
  authenticateToken,
  notificationController.getUserNotifications
);

module.exports = router;
