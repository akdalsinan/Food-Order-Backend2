const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: null,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("auth", AuthSchema);
