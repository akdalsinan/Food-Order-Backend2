const FeedBack = require("../models/feedBack.js");

const addFeedBack = async (req, res) => {
  const { user, status, feedBack, userName, userEmail } = req.body;

  try {
    const newFeedBack = new FeedBack({
      user: user,
      status,
      feedBack,
      userName,
      userEmail,
    });

    const returnFeedBack = await newFeedBack.save();
    res.status(201).json({
      isSuccess: true,
      returnFeedBack,
      resultMessage: "Görüş ve Öneriniz Alındı",
    });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllFeedBack = async (req, res) => {
  try {
    const feedBacks = await FeedBack.find().populate();

    res.status(200).json({ isSuccess: true, feedBacks });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

module.exports = { addFeedBack, getAllFeedBack };
