import QRCodeStyling from "https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/+esm";
import { options, qrCodes } from "./config.js";

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function generateAndDownload(qrData) {
  const qrCode = new QRCodeStyling({
    ...options,
    data: qrData.url,
  });

  const blob = await qrCode.getRawData("png");
  downloadBlob(blob, qrData.filename);
}

async function main() {
  for (const item of qrCodes) {
    await generateAndDownload(item);
  }

  console.log("✅ All QR codes downloaded.");
}

main();
