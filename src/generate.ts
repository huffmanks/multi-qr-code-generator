import { data } from "../config/data.ts";
import type { QRCodeItem, TourData } from "./types.ts";

function generateQRCodes(data: TourData): QRCodeItem[] {
  const qrCodes: QRCodeItem[] = [];
  const timestamp = Math.floor(Date.now() / 1000);
  const folderName = `${data.name.trim().replace(/[^a-zA-Z0-9_.-]/g, "_")}-v${data.version}`;

  if (data.type === "url") {
    data.urls.forEach((url, index) => {
      const domain = new URL(url).hostname;
      qrCodes.push({
        url,
        filename: `${folderName}/${domain}_${index + 1}_${timestamp}.png`,
      });
    });
  } else if (data.type === "video") {
    data.videos.forEach((video) => {
      qrCodes.push({
        url: new URL(`${data.baseUrl}${video.id}`).href,
        filename: `${folderName}/${video.name}.jpg`,
      });
    });
  } else if (data.type === "group") {
    Object.keys(data.groups).forEach((groupKey) => {
      const groupNum = parseInt(groupKey);
      const count = data.groups[groupNum];

      for (let i = 1; i <= count; i++) {
        const id = groupNum + i;

        qrCodes.push({
          url: new URL(`${data.baseUrl}${id}`).href,
          filename: `${folderName}/${id}.png`,
        });
      }
    });
  } else {
    console.log("Invalid data type.");
  }

  return qrCodes;
}

export const qrCodes = generateQRCodes(data);
