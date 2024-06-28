const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // tokeni iki parçaya bölüyoruz ve ikinci parçayı alıyoruz

    if (!token) {
      return res.status(401).json({ message: "Giriş yapın" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: err.message });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authMiddleware };
