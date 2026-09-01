const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../_tmp_live.html"), "utf8");
const urls = new Set();

for (const match of html.matchAll(/https?:\/\/[^"'\s)]+/g)) {
  const url = match[0].replace(/\\u002F/g, "/");
  if (
    url.includes("cloudinary") ||
    url.includes("/images/") ||
    url.includes("/media/") ||
    url.includes("/_nuxt/") ||
    url.includes(".mp4") ||
    url.includes(".png") ||
    url.includes(".jpg") ||
    url.includes(".webp") ||
    url.includes(".woff2")
  ) {
    urls.add(url.split("?")[0]);
  }
}

for (const match of html.matchAll(/\/(?:images|media|fonts|_nuxt)\/[^"'\s)]+/g)) {
  urls.add(`https://beetogreen.com${match[0].split("?")[0]}`);
}

console.log([...urls].sort().join("\n"));
