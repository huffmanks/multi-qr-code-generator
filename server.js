import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import QRCode from "qrcode";

import { options, qrCodes } from "./config.js";

const QR_CODE_DIRECTORY = "./qr-codes";

async function main() {
  if (!existsSync(QR_CODE_DIRECTORY)) {
    mkdirSync(QR_CODE_DIRECTORY, { recursive: true });
  }

  const promises = qrCodes.map((item) => {
    return new Promise((resolve, reject) => {
      QRCode.toFile(
        join(QR_CODE_DIRECTORY, item.filename),
        item.url,
        {
          type: "png",
          width: options.width,
          height: options.height,
          margin: 4,
          scale: 15,
          color: {
            dark: options.dotsOptions.color,
            light: options.backgroundOptions.color,
          },
        },
        function (err) {
          if (err) return reject(err);

          console.log(`🌱 ${item.filename} has been created`);
          resolve();
        }
      );
    });
  });

  await Promise.all(promises);
  console.info("\n🎉 Complete\n");
}

main();
