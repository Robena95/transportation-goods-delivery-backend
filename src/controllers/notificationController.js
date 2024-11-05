const Notification = require("../models/notificationModel");
const { sendEmail } = require("../utils/emailService");

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    const notification = new Notification({ userId, message, type });
    await notification.save();

    // Send email notification
    await sendEmail(userId, message);

    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
