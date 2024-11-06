const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    vehicleType: { type: String },
    vehiclePhoto: { type: String },
    driverPhoto: { type: String },
    availability: { type: Boolean, default: false },
    bio: { type: String },
    ratings: [
      {
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
      },
    ],
    role: {
      type: String,
      enum: ["client", "transporter", "administrator"],
      required: true,
    },
    adress: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
