const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database.js");

const Auth = require("./routes/auth.js");
const Food = require("./routes/food.js");
const Product = require("./routes/product.js");
const Order = require("./routes/order.js");
const UserCreditCart = require("./routes/userCreditCart.js");
const FeedBack = require("./routes/feedBack.js");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "denemeee" });
});

app.use("/", Auth);
app.use("/", Food);
app.use("/", Product);
app.use("/", Order);
app.use("/", UserCreditCart);
app.use("/", FeedBack);

db();
app.listen(process.env.PORT, () => {
  console.log("SERVER IS RUNNING ON PORT 5000");
});

//veri tabanına kayıt yapabilmek için models adında klasör açtık
// rotaları belirleyebilmek için routes klasörü açtık
//  rotalar uzamasın diye controllers klasörü
// auth işlemleri için middleware klasörü
