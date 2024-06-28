const Cart = require("../models/productCart.js");
const Food = require("../models/food.js");

// Sepete ürün ekleme
const addToCart = async (req, res) => {
  const { userId, foodId, quantity } = req.body;

  try {
    const product = await Food.findById(foodId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      const itemIndex = cart.items.findIndex((item) =>
        item.product.equals(foodId)
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity; // Doğrudan yeni miktarı ayarlayın
        if (cart.items[itemIndex].quantity > product.stock) {
          return res.status(400).json({ message: "Insufficient stock" });
        }
      } else {
        cart.items.push({ product: foodId, quantity });
      }
    } else {
      cart = new Cart({
        user: userId,
        items: [{ product: foodId, quantity }],
      });
    }

    await cart.save();

    const cartItem = cart.items.find((item) => item.product.equals(foodId));
    const totalPrice = cartItem.quantity * product.price;

    res.status(200).json({
      message: "Product added to cart",
      cartItem: {
        name: product.name,
        quantity: cartItem.quantity,
        price: product.price,
        totalPrice,
      },
      cart,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: err });
  }
};

// Sepeti görüntüleme
const viewCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ cartItems: [] });
    }

    const cartItems = cart.items.map((item) => {
      const totalPrice = item.quantity * item.product.foodPrice;
      return {
        foodId: item.product._id,
        name: item.product.foodName,
        quantity: item.quantity,
        price: item.product.foodPrice,
        totalPrice,
      };
    });

    res.status(200).json({ cartItems });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err });
  }
};

// Sepetten ürün çıkarma
const removeFromCart = async (req, res) => {
  const { userId, foodId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = cart.items.filter((item) => !item.product.equals(foodId));
      await cart.save();
      res.status(200).json({ message: "Product removed from cart", cart });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing product from cart", error: err });
  }
};

module.exports = { addToCart, viewCart, removeFromCart };
