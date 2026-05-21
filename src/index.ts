import QRCode from "easyqrcodejs-nodejs";
import fs from "fs";
import path from "path";

import { options } from "../config/index.ts";
import { qrCodes } from "./generate.ts";
import type { QRCodeItem } from "./types.ts";

async function main() {
  const promises = qrCodes.map((item: QRCodeItem) => {
    const qrcode = new QRCode({ text: item.url, ...options });

    const filePath = path.resolve("./qr-codes", item.filename);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return qrcode
      .saveImage({
        path: filePath,
      })
      .then(() => {
        console.log(`🌱 ${item.filename} has been created`);
      })
      .catch((err: any) => {
        console.error(`❌ Failed to create ${item.filename}:`, err);
      });
  });

  await Promise.all(promises);
  console.info("\n🎉 Complete\n");
}

main();
