const Food = require("../models/food.js");

//yemek ekleme
const addFood = async (req, res) => {
  try {
    // const { urunId, urunName, foodName, foodPrice, foodDesc } = req.body;

    const newFood = await Food.create(req.body);

    res.status(201).json({
      isSuccess: true,
      newFood,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//pizzaları getirme
const getAllPizza = async (req, res) => {
  try {
    const pizzas = await Food.find({ urunId: 1 });
    res
      .status(200)
      .json({ isSuccess: true, resultSet: pizzas, resultMessage: "" });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      resultMessage: [error.message],
      resultSet: [],
    });
  }
};

//hamburgerleri getirme
const getAllHamburger = async (req, res) => {
  try {
    const hamburgers = await Food.find({ urunId: 2 });
    res
      .status(200)
      .json({ isSuccess: true, resultSet: hamburgers, resultMessage: "" });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      resultMessage: [error.message],
      resultSet: [],
    });
  }
};

//makarnaları getirme
const getAllMakarna = async (req, res) => {
  try {
    const makarnas = await Food.find({ urunId: 3 });
    res
      .status(200)
      .json({ isSuccess: true, resultSet: makarnas, resultMessage: "" });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      resultMessage: [error.message],
      resultSet: [],
    });
  }
};

//yemek güncelleme
const updateFood = async (req, res) => {
  try {
    const foodId = req.body.foodId;
    const status = req.body;

    const updatedFood = await Food.findByIdAndUpdate(foodId, status, {
      new: true,
    });
    if (!updatedFood) {
      return res.status(404).json({
        isSuccess: false,
        resultMessage: "Yemek Bilgisi Bulunamadı.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      data: updatedFood,
      resultMessage: "Yemek Güncellendi.",
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      resultMessage: "Sunucu Hatası",
      error: error.message,
    });
  }
};

//tüm yemekleri getirme
const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find().populate();

    res.status(200).json({ isSuccess: true, foods });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

//yemek silme
const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.foodId;

    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).json({
        isSuccess: false,
        resultMessage: "Yemek bilgisi bulunamadı.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      resultMessage: "Yemek bilgisi silindi.",
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
  addFood,
  getAllPizza,
  getAllHamburger,
  getAllMakarna,
  updateFood,
  getAllFood,
  deleteFood,
};
