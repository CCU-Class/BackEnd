const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const secret = speakeasy.generateSecret({ length: 32, name: "CCU Class" });
console.log("Secret Key:", secret.base32);
console.log("QR Code:", secret.otpauth_url);

