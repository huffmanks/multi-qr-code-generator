export const options = {
  width: 512,
  height: 512,
  colorDark: "#000000",
  colorLight: "#ffffff",
  quietZone: 5,
};

// Base URL used for dynamic generation
const BASE_URL = "https://example.com/path?id=";

function generateQRCodes({ urls = null, groups = null }) {
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
export const qrCodes = generateQRCodes({ groups }); // or use { urls }
