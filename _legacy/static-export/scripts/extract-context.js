const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

function context(needle, len = 400) {
  const i = html.indexOf(needle);
  if (i < 0) return `${needle}: NOT FOUND`;
  return html.slice(Math.max(0, i - 150), i + len).replace(/\s+/g, " ");
}

console.log("See our solutions:", context("See our solutions"));
console.log("\nTry for free:", context("Try for free"));
console.log("\nAvantage card CTA area:", context("avantage-card__cta"));
console.log("\nActivez card 1:", context("activez__card", 1500));
console.log("\nHero label:", context("section-hero__label"));
console.log("\nHero title start:", context("section-hero__title"));
console.log("\nDiscover our solutions in activez:", context("activez__cta"));

// Extract preloader lottie from bundle
const rx = fs.readFileSync(path.join(__dirname, "../js/rxBUV76z.js"), "utf8");
const start = rx.indexOf('preloader_logo_animation={');
const end = rx.indexOf("},__vite_glob_0_0", start);
if (start > 0) {
  console.log("\nLottie embedded - composition name found at", start);
  const nm = rx.slice(start, start + 200).match(/nm:"([^"]+)"/);
  console.log("Composition nm:", nm && nm[1]);
  const fr = rx.slice(start, start + 200).match(/fr:(\d+)/);
  const op = rx.slice(start, start + 200).match(/op:(\d+)/);
  console.log("fr/op:", fr && fr[1], op && op[1]);
}

// Preloader wipe trigger
const wipe = rx.indexOf("WIPE_TRIGGER_RATIO");
console.log("\nWipe trigger context:", rx.slice(wipe - 300, wipe + 500));
