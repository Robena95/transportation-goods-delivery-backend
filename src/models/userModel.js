const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateInscription: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ["client", "transporteur", "administrateur"],
      required: true,
    },
    adress: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
