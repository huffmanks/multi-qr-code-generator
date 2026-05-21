import QRCode from "easyqrcodejs-nodejs";

export const options = {
  width: 1024,
  height: 1024,
  colorDark: "#000000",
  colorLight: "#ffffff",
  quietZone: 75,
  quality: 1,
  correctLevel: QRCode.CorrectLevel.L,
};
