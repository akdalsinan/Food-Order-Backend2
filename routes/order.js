const express = require("express");

const { authMiddleware } = require("../middleware/auth.js");
const { adminMiddleware } = require("../middleware/adminMiddleware.js");
const {
  addOrder,
  getOrderById,
  getAllOrder,
  updateOrder,
} = require("../controllers/order.js");

const router = express.Router();

router.post("/order/addOrder", authMiddleware, addOrder);
router.get("/order/getOrder/:userId", authMiddleware, getOrderById);
router.get("/order/getAllOrder", authMiddleware, adminMiddleware, getAllOrder);
router.post("/order/updateOrder", authMiddleware, adminMiddleware, updateOrder);

module.exports = router;
