const reviewSchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transporter_id: {
    type: Schema.Types.ObjectId,
    ref: "Transporter",
    required: true,
  },
  note: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
