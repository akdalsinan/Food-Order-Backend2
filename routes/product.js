const express = require("express");
const {
  addToCart,
  viewCart,
  removeFromCart,
} = require("../controllers/product.js");

const router = express.Router();

router.post("/basket/add", addToCart);
router.get("/basket/:userId", viewCart);
router.post("/basket/remove", removeFromCart);

module.exports = router;
