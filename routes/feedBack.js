const express = require("express");

const { authMiddleware } = require("../middleware/auth.js");
const { adminMiddleware } = require("../middleware/adminMiddleware.js");

const { addFeedBack, getAllFeedBack } = require("../controllers/feedBack.js");

const router = express.Router();

router.post("/feedback/addFeedback", authMiddleware, addFeedBack);

router.get(
  "/feedback/getAllFeedBack",
  authMiddleware,
  adminMiddleware,
  getAllFeedBack
);

module.exports = router;
