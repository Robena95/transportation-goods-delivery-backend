const orderSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transporterId: { type: Schema.Types.ObjectId, ref: "Transporter" },
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
