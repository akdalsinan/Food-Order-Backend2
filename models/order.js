const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  adress: { type: String, required: true },
  orderNote: { type: String },
  name: { type: String, required: true },
  dontRing: { type: Boolean, required: true },
  doorOK: { type: Boolean, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Bekliyor" },
  orderTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
