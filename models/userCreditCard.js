const mongoose = require("mongoose");

const CreditCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  cartName: { type: String, required: true },
  cartNo: { type: Number, required: true },
  cartExpiry: { type: String, required: true },
  cartCvc: { type: Number, required: true },
});

module.exports = mongoose.model("CreditCart", CreditCartSchema);
