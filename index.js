const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
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

let PORT = process.env.PORT || 5000;

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

// HTTP server ve Socket.IO sunucusunu oluştur
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let rooms = [];
let messages = {}; // Her oda için mesajları saklamak için bir obje

io.on("connection", (socket) => {
  console.log("A user connected");

  // Kullanıcı odaya katıldığında
  socket.on("joinRoom", (room) => {
    socket.join(room);
    if (!rooms.includes(room)) {
      rooms.push(room);
    }
    if (!messages[room]) {
      messages[room] = [];
    }
    console.log(`User joined room: ${room}`);
    io.emit("updateRooms", rooms); // Tüm kullanıcılara güncellenmiş oda listesini gönder

    // Odaya katılan kullanıcıya mevcut mesajları gönder
    socket.emit("loadMessages", messages[room]);
  });

  // Mesaj gönderildiğinde
  socket.on("sendMessage", (data) => {
    console.log(`Message received: ${data.message} in room: ${data.room}`);
    if (!messages[data.room]) {
      messages[data.room] = [];
    }
    messages[data.room].push({
      message: data.message,
      sender: data.sender,
    });
    io.to(data.room).emit("receiveMessage", {
      message: data.message,
      sender: data.sender,
      room: data.room, // Oda bilgisini ekleyelim
    });
    // Tüm istemcilere yeni mesaj olduğuna dair bildirim gönder
    io.emit("newMessage", { room: data.room });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
