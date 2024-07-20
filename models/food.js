const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const FoodSchema = new mongoose.Schema({
  foodId: {
    type: String,
    trim: true,
    unique: true,
    default: uuidv4, // UUID kullanarak benzersiz foodId oluşturulmasını sağlar
  },
  urunId: {
    type: Number,
    required: true,
  },
  urunName: {
    type: String,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  foodPrice: {
    type: Number,
    required: true,
  },
  foodDesc: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("food", FoodSchema);
