const express = require("express");

const { authMiddleware } = require("../middleware/auth.js");

const {
  addCreditCart,
  getCreditCartById,
  updateCreditCart,
  deleteCreditCart,
} = require("../controllers/userCreditCart.js");

const router = express.Router();

router.post("/cart/addCreditCart", authMiddleware, addCreditCart);
router.post("/cart/updateCreditCart", authMiddleware, updateCreditCart);

router.get(
  "/cart/getCreditCartById/:userId",
  authMiddleware,
  getCreditCartById
);

router.get("/cart/deleteCreditCar/:cartId", authMiddleware, deleteCreditCart);

module.exports = router;
