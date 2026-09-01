const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "../index.html"),
  "utf8"
);

const idx = html.indexOf("preloader__lottie");
console.log("preloader__lottie context:");
console.log(html.slice(Math.max(0, idx - 500), idx + 2000));

const rx = fs.readFileSync(path.join(__dirname, "../js/rxBUV76z.js"), "utf8");
const preIdx = rx.indexOf("Preloader");
console.log("\n\nPreloader in bundle:");
console.log(rx.slice(Math.max(0, preIdx - 300), preIdx + 2000));

const jsonMatches = [...rx.matchAll(/["']([^"']+\.json)["']/g)].map((m) => m[1]);
console.log("\nJSON files in bundle:", [...new Set(jsonMatches)]);

const lottieName = [...rx.matchAll(/name:\s*["']([^"']+)["']/g)]
  .map((m) => m[1])
  .filter((n) => /loader|preloader|logo|lottie|anim/i.test(n));
console.log("\nLottie-like names:", [...new Set(lottieName)]);
