const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      adress,
      phoneNumber,
      dateOfBirth,
      gender,
      profilePicture,
    } = req.body;
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(200).json({
        isSuccess: false,
        resultMessage: "Bu Email Hesabı Zaten Bulunmakta",
      });
    }

    if (password.length < 6) {
      return res.status(200).json({
        isSuccess: false,
        resultMessage: "Şifreniz 6 Karakterden Küçük Olamamalı...",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      username,
      email,
      password: passwordHash,
      role,
      adress,
      phoneNumber,
      dateOfBirth,
      gender,
      profilePicture,
    });

    const fındUser = await Auth.findOne({ email });

    const token = await jwt.sign(
      {
        id: fındUser.id,
        username: fındUser.username,
        email: fındUser.email,
        role: fındUser.role,
        adress: fındUser.adress,
        phoneNumber: fındUser.phoneNumber,
        dateOfBirth: fındUser.dateOfBirth,
        gender: fındUser.gender,
        profilePicture: fındUser.profilePicture,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      isSuccess: true,
      // newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(200).json({
        isSuccess: false,
        resultMessage: "Böyle Bir Kullanıcı Yok...",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(200)
        .json({ isSuccess: false, resultMessage: "Parolanoz Yanlış" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        adress: user.adress,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        profilePicture: user.profilePicture,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      isSuccess: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        adress: user.adress,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        profilePicture: user.profilePicture,
      },
      token,
      resultMessage: "Giriş Başarılı",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updateData = req.body;

    const updatedUser = await Auth.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        isSuccess: false,
        resultMessage: "Kullanıcı Bulunamadı",
      });
    }

    //update olduğu zaman tekrar token ile kulanıcı bilgilerini gönderdim front^da token ile bilgileri çözmek için
    const token = jwt.sign(
      {
        id: userId,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        adress: updatedUser.adress,
        phoneNumber: updatedUser.phoneNumber,
        dateOfBirth: updatedUser.dateOfBirth,
        gender: updatedUser.gender,
        profilePicture: updatedUser.profilePicture,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      isSuccess: true,
      token: token,
      resultMessage: "Kullanıcı Bilgileri Güncellendi",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const tokenControl = async (req, res) => {
  try {
    return res.status(200).json({ message: "token", user: req.user });
  } catch (err) {
    return res.status(200).json({ message: "token süresi doldu", err: err });
  }
};

// router.get("/profile", authMiddleware, async (req, res) => {
//   try {
//     res.send(req.user);
//   } catch (err) {
//      return res.status(200).json({ message: "token süresi doldu" });
//   }
// });

module.exports = { register, login, tokenControl, updateUser };

// benim bu işlemleri yapabilmem için bir veritabınıyla eş çalışma olması lazım bu sebepten dolayı models altında veritaı işlemleri yapılacak
