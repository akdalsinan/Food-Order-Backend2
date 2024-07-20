const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const db = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      // "mongodb+srv://alpertokat0760:xGAg9THvKKBX8UGY@cluster7.dfz2t5i.mongodb.net/",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = db;
