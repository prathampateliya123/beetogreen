const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

const phrases = [
  "Discover Beetogreen",
  "Discover our solutions",
  "See our solutions",
  "Try for free",
  "Learn more",
  "Choose sustainable mobility",
  "Sustainable mobility that moves",
  "We partner with France",
  "A marketplace built",
  "Book a demo",
  "01 / 05",
  "01 / 08",
  "section-hero__side-image",
  "preloader_logo_animation",
  "imageSide",
  "preloader--exit",
  "endPreloaderTransition",
  "removePreloader",
  "onComplete",
  "MegaMenu",
  "NavigationMobile",
];

for (const p of phrases) {
  const i = html.indexOf(p);
  if (i >= 0) {
    console.log(`\n=== ${p} ===`);
    console.log(html.slice(i, i + 300).replace(/\s+/g, " "));
  }
}

const rx = fs.readFileSync(path.join(__dirname, "../js/rxBUV76z.js"), "utf8");
const pre = rx.indexOf("preloader_logo_animation");
console.log("\n=== preloader_logo_animation bundle context ===");
console.log(rx.slice(Math.max(0, pre - 400), pre + 1200));

const exit = rx.indexOf("endPreloaderTransition");
console.log("\n=== endPreloaderTransition usages ===");
let i = 0,
  c = 0;
while ((i = rx.indexOf("endPreloaderTransition", i)) !== -1 && c < 5) {
  console.log(rx.slice(Math.max(0, i - 200), i + 400));
  i++;
  c++;
}
