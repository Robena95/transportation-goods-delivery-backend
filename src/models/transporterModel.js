const mongoose = require("mongoose");

const transporterSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehiclePhoto: { type: String },
    driverPhoto: { type: String },
    bio: { type: String },
    availability: { type: Boolean, default: false },
    ratings: [
      {
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transporter", transporterSchema);
