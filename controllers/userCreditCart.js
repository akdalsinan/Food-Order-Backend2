const CreditCart = require("../models/userCreditCard");

//kart bilgilerini kaydetme
const addCreditCart = async (req, res) => {
  const { user, cartName, cartNo, cartExpiry, cartCvc } = req.body;
  try {
    const newCreditCart = new CreditCart({
      user,
      cartName,
      cartNo,
      cartExpiry,
      cartCvc,
    });
    const creditCart = await newCreditCart.save();
    res.status(201).json({
      isSuccess: true,
      creditCart,
      resultMessage: "Kart Bilgileri Kaydedildi",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//userid'ye göre kart bilgilerini getirme
const getCreditCartById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const creditCarts = await CreditCart.find({ user: userId });

    if (!creditCarts) {
      return res.status(404).json({
        isSuccess: false,
        resultMessage: "Kullanıcıya ait kart bilgisi bulunamadı.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      data: creditCarts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//kart bilgilerini güncelleme
const updateCreditCart = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const updateData = req.body;

    const updatedCart = await CreditCart.findByIdAndUpdate(cartId, updateData, {
      new: true,
    });

    if (!updatedCart) {
      return res.status(404).json({
        isSuccess: false,
        resultMessage: "Kart bilgisi bulunamadı.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      data: updatedCart,
      resultMessage: "Kart bilgisi güncellendi.",
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      resultMessage: "Sunucu Hatası",
      error: error.message,
    });
  }
};

//kart bilgilerini silme
const deleteCreditCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const deletedCart = await CreditCart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({
        isSuccess: false,
        resultMessage: "Kart bilgisi bulunamadı.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      resultMessage: "Kart bilgisi silindi.",
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      resultMessage: "Sunucu Hatası",
      error: error.message,
    });
  }
};

module.exports = {
  addCreditCart,
  getCreditCartById,
  updateCreditCart,
  deleteCreditCart,
};
