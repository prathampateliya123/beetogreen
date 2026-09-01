const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

// Find rendered CTA sections (not CSS)
const marker = '<section class="section-cta-split"';
let pos = 0;
let idx = 0;
while ((pos = html.indexOf(marker, pos)) !== -1) {
  const end = html.indexOf("</section>", pos);
  const block = html.slice(pos, end);
  const title = block.match(/section-cta-split__title[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]>/);
  const btn = block.match(/button__text[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]>/);
  const label = block.match(/section-cta-split__label[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]>/);
  console.log(`CTA ${++idx}:`, {
    label: label?.[1],
    title: title?.[1],
    button: btn?.[1],
  });
  pos = end + 1;
}

// Avantage cards buttons
console.log("\nAvantage buttons:");
let ap = 0;
while ((ap = html.indexOf("avantage-card__cta-link", ap)) !== -1) {
  const block = html.slice(ap, ap + 600);
  const btn = block.match(/button__text[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]/);
  if (btn) console.log("-", btn[1]);
  ap += 1;
}

const underline = [...html.matchAll(/avantage-card__cta-underline[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]/g)].map((m) => m[1]);
console.log("\nAvantage underline CTAs:", underline);
