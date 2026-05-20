export const options = {
  width: 1024,
  height: 1024,
  colorDark: "#000000",
  colorLight: "#ffffff",
  quietZone: 100,
  quality: 1,
};

// Base URL used for dynamic generation
const BASE_URL = "https://example.com?id=";

function generateQRCodes({ urls = null, groups = null, videos = null }) {
  const qrCodes = [];
  const timestamp = Math.floor(Date.now() / 1000);

  if (urls && Array.isArray(urls)) {
    urls.map((url, index) => {
      const domain = new URL(url).hostname;
      qrCodes.push({
        url,
        filename: `${domain}_${index + 1}_${timestamp}.png`,
      });
    });
  } else if (videos && Array.isArray(videos)) {
    videos.map((video, index) => {
      qrCodes.push({
        url: new URL(`${BASE_URL}${video.id}`).href,
        filename: `${video.name}.jpg`,
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

// URLs
const urls = ["https://example.com", "https://example.com/about"];

// Videos
const videos = [
  {
    id: "adsKAdaJH",
    name: "example",
  },
];

// Export your preferred option
export const qrCodes = generateQRCodes({ videos });
