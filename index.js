import fs from "fs";
import path from "path";
import QRCode from "easyqrcodejs-nodejs";

import { qrCodes, options } from "./config.js";

async function main() {
  const promises = qrCodes.map((item) => {
    const qrcode = new QRCode({ text: item.url, ...options });

    const filePath = path.join("./qr-codes", item.filename);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return qrcode
      .saveImage({
        path: filePath,
      })
      .then((_data) => {
        console.log(`🌱 ${item.filename} has been created`);
      });
  });

  await Promise.all(promises);

  console.info("\n🎉 Complete\n");
}

main();
