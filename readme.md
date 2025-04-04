# Multi-QR Code Generator 🧾➡️📱

A simple Node.js tool to quickly generate multiple QR codes in bulk.

## ✨ Features

- 🔗 Generate QR codes from a custom list of full URLs
- 🔄 Or use a base URL and grouped numeric patterns to dynamically generate URLs
- 🖼️ Saves each QR code as a PNG file

## ⚙️ Configuration

Modify the `config.js` file to define how your QR codes should be generated:

```js title=config.js
// Base URL used for dynamic generation
const BASE_URL = "https://example.com/path?id=";

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
```
