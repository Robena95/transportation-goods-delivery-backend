const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transporterId: { type: mongoose.Schema.Types.ObjectId, ref: "Transporter" },
  dateOrder: { type: Date, default: Date.now },
  statusOrder: {
    type: String,
    enum: ["pending", "delivered", "canceled"],
    default: "pending",
  },
  departureAdress: { type: String, required: true },
  arrivalAdress: { type: String, required: true },
  price: { type: Number, required: true },
  statusPayment: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid",
  },
  pickupLocation: { type: Number, required: true },
  dropoffLocation: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
