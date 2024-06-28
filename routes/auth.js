const express = require("express");
const {
  register,
  login,
  tokenControl,
  updateUser,
} = require("../controllers/auth.js");
const { authMiddleware } = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", register); //register ve login controllers içerinde oluşturulacak
router.post("/login", login);
router.post("/updateUser", updateUser);
router.get("/tokenControl", authMiddleware, tokenControl);

module.exports = router;
