import { wtData } from "./data.js";
import { padIndex, slugify } from "./utils.js";

export const options = {
  width: 1024,
  height: 1024,
  margin: 16,
  dotsOptions: {
    color: "#000000",
    type: "rounded", // "rounded" | "dots" | "classy" | "classy-rounded" | "square" | "extra-rounded"
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  cornersSquareOptions: {
    type: "square", // "dot" | "square" | "extra-rounded"
  },
  cornersDotOptionsHelper: {
    color: "#000000",
    type: "square", // "dot" | "square"
  },
};

// Base URL used for dynamic generation
const BASE_URL = "https://wofford.edu/about/news/wofford-today/archive/2025/spring/class-of-2025-spotlights";
const UTM_SOURCE = "qr_code";
const UTM_MEDIUM = "wofford_today";
const UTM_CAMPAIGN = "wofford_today_2025_summer";

function generateQRCodes({ urls = null, groups = null, data = null }) {
  const qrCodes = [];

  if (urls && Array.isArray(urls)) {
    urls.forEach((url, index) => {
      qrCodes.push({
        url,
        filename: `${url}-${index + 1}.png`,
      });
    });
  } else if (groups) {
    Object.keys(groups).forEach((group) => {
      const count = groups[parseInt(group)];
      for (let i = 1; i <= count; i++) {
        const id = parseInt(group) + i;
        qrCodes.push({
          url: new URL(`${BASE_URL}${id}`).href,
          filename: `${id}.png`,
        });
      }
    });
  } else if (data) {
    data.forEach((item, index) => {
      const rawName = item.firstName2 ? `${item.firstName} ${item.lastName} ${item.firstName2} ${item.lastName2}` : `${item.firstName} ${item.lastName}`;
      const slugName = slugify(rawName);
      const filename = `${padIndex(index + 1, data.length)}-${slugName}.png`;

      const url = new URL(BASE_URL);
      url.searchParams.set("id", item.id);
      url.searchParams.set("utm_source", UTM_SOURCE);
      url.searchParams.set("utm_medium", UTM_MEDIUM);
      url.searchParams.set("utm_campaign", UTM_CAMPAIGN);
      url.searchParams.set("utm_id", `${UTM_CAMPAIGN}_${slugName}`);

      qrCodes.push({
        url: url.toString(),
        filename,
      });
    });
  }

  return qrCodes;
}

// Group pattern (key = starting number, value = count of codes to generate)
const groups = {
  100: 3,
  200: 2,
  300: 5,
};

// Or provide your own list of specific URLs
const urls = ["https://example.com", "https://example.com/about"];

// Export your preferred option
// export const qrCodes = generateQRCodes({ groups });
// export const qrCodes = generateQRCodes({ urls });
export const qrCodes = generateQRCodes({ data: wtData });
