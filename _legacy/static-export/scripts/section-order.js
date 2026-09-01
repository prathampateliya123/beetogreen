const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
const names = [
  "section-hero",
  "intro-logos",
  "process",
  "activez",
  "avantage",
  "stats",
  "logos-marquee",
  "simulator-co2",
  "section-cta-split",
  "testimonials",
  "faq",
];

const order = names
  .map((n) => ({ n, i: html.indexOf('class="' + n) }))
  .filter((x) => x.i >= 0)
  .sort((a, b) => a.i - b.i);

console.log("Section order:");
order.forEach((x) => console.log(x.n, "@", x.i));

// Count cta splits
const ctaCount = (html.match(/section-cta-split/g) || []).length;
console.log("\nCTA split count:", ctaCount);

// Avantage card buttons
const avantageIdx = html.indexOf("avantage-card__cta-link");
console.log("\nAvantage CTA sample:", html.slice(avantageIdx, avantageIdx + 500).replace(/\s+/g, " "));
