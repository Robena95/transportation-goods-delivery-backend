const packageSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  description: { type: String, required: true },
  nature: { type: String },
  weight: { type: Number, required: true },
  tracking_number: { type: String, unique: true, required: true },
  status: {
    type: String,
    enum: ["shipped", "In transit", "delivered"],
    default: "shipped",
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Package", packageSchema);
