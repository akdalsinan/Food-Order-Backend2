const express = require("express");
const {
  addFood,
  getAllPizza,
  getAllMakarna,
  getAllHamburger,
  updateFood,
  getAllFood,
  deleteFood,
} = require("../controllers/food.js");

const { authMiddleware } = require("../middleware/auth.js");
const { adminMiddleware } = require("../middleware/adminMiddleware.js");

const router = express.Router();

router.post("/food/addFood", authMiddleware, adminMiddleware, addFood);
router.post("/food/updateFood", authMiddleware, adminMiddleware, updateFood);

router.get("/food/getAllPizza", getAllPizza);
router.get("/food/getAllHamburger", getAllHamburger);
router.get("/food/getAllMakarna", getAllMakarna);
router.get("/food/getAllFood", getAllFood);
router.get("/food/deleteFood/:foodId", authMiddleware, deleteFood);

module.exports = router;
