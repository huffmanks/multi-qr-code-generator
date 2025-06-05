import { existsSync, mkdirSync } from "fs";
// import QRCode from "qrcode";
import QRCode from "easyqrcodejs-nodejs";

// import { join } from "path";
import { qrCodes } from "./config.js";

const QR_CODE_DIRECTORY = "./qr-codes";

async function main() {
  if (!existsSync(QR_CODE_DIRECTORY)) {
    mkdirSync(QR_CODE_DIRECTORY, { recursive: true });
  }

  const promises = qrCodes.map((item) => {
    return new Promise((resolve, reject) => {
      // QRCode.toFile(
      //   join(QR_CODE_DIRECTORY, item.filename),
      //   item.url,
      //   {
      //     type: "png",
      //     width: 1024,
      //     margin: 2,
      //     scale: 4,
      //     color: {
      //       dark: "#000000",
      //       light: "#ffffff",
      //     },
      //   },
      //   function (err) {
      //     if (err) return reject(err);

      //     console.log(`🌱 ${item.filename} has been created`);
      //     resolve();
      //   }
      // );
      const options = { width: 1024, height: 1024, colorDark: "#000000", colorLight: "#ffffff" };
      const qrcode = new QRCode({ text: item.url, ...options });

      const filePath = path.join("./qr-codes", item.filename);

      const dir = path.dirname(filePath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      return qrcode
        .saveImage({
          path: filePath,
        })
        .then((_data) => {
          console.log(`🌱 ${item.filename} has been created`);
        });
    });
  });

  await Promise.all(promises);
  console.info("\n🎉 Complete\n");
}

main();
