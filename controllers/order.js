const Order = require("../models/order.js");
const Cart = require("../models/productCart.js");

// siparişi kaydetme
const addOrder = async (req, res) => {
  const {
    user,
    items,
    totalAmount,
    adress,
    orderNote,
    name,
    dontRing,
    doorOK,
  } = req.body;

  try {
    const newOrder = new Order({
      user: user,
      items,
      totalAmount,
      adress,
      orderNote,
      name,
      dontRing,
      doorOK,
    });

    const order = await newOrder.save();

    const cart = await Cart.findOne({ user });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json({
      isSuccess: true,
      order,
      resultMessage: "Sipariş Alındı",
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// siparişi görüntüleme
const getOrderById = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "items"
    );
    res.status(200).json({
      isSuccess: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//admin için bütün siparişleri görüntüleme
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.foodId");

    res.status(200).json({ isSuccess: true, orders });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// adminin sipariş durumunu güncelleme
const updateOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const status = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, status, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({
        isSuccess: false,
        resultMessage: "Sipariş Bilgisi Bulunamadı.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      data: updatedOrder,
      resultMessage: "Sipariş Güncellendi.",
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      resultMessage: "Sunucu Hatası",
      error: error.message,
    });
  }
};

module.exports = { addOrder, getOrderById, getAllOrder, updateOrder };
