const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
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

//multer konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//router konfigürasyonları
router.post(
  "/food/addFood",
  upload.single("foodImage"),
  authMiddleware,
  adminMiddleware,
  addFood
);
router.post(
  "/food/updateFood",
  upload.single("foodImage"),
  authMiddleware,
  adminMiddleware,
  updateFood
);

router.get("/food/getAllPizza", getAllPizza);
router.get("/food/getAllHamburger", getAllHamburger);
router.get("/food/getAllMakarna", getAllMakarna);
router.get("/food/getAllFood", getAllFood);
router.get("/food/deleteFood/:foodId", authMiddleware, deleteFood);

module.exports = router;
