const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const db = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      // "mongodb+srv://alpertokat0760:xGAg9THvKKBX8UGY@cluster7.dfz2t5i.mongodb.net/",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // tls: true, // SSL/TLS bağlantısı için tls kullanın
        // tlsAllowInvalidCertificates: false, // Geçersiz sertifikalara izin verme
        // tlsAllowInvalidHostnames: false, // Geçersiz host isimlerine izin verme
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // ssl: false,
        // sslCA: "./path/to/ca.pem", // CA sertifika dosyasının yolu
        // sslCert: "./path/to/client-cert.pem", // İstemci sertifikası dosyasının yolu
        // sslKey: "./path/to/client-key.pem", // İstemci anahtar dosyasının yolu
        // sslPass: "your_ssl_passphrase", // Eğer sertifikalarınız parola korumalinvalid signatureıysa
      }
    );
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = db;
