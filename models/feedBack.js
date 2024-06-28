const mongoose = require("mongoose");

const FeedBackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  userName: { type: String },
  userEmail: { type: String },
  status: { type: String },
  feedBack: { type: String },
  feedBackTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FeedBack", FeedBackSchema);
