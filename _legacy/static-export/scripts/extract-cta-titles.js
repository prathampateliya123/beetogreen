const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

const titles = [...html.matchAll(/class="section-cta-split__title"[^>]*>[\s\S]*?>([^<]+)</g)].map(
  (m) => m[1].trim()
);
console.log("CTA titles:", titles);

const labels = [...html.matchAll(/class="section-cta-split__label"[^>]*>[\s\S]*?>([^<]+)</g)].map(
  (m) => m[1].trim()
);
console.log("CTA labels:", labels);

// buttons near section-cta-split
const blocks = html.split('class="section-cta-split"').slice(1);
blocks.forEach((b, i) => {
  const t = b.match(/section-cta-split__title[\s\S]{0,200}/);
  const btn = b.match(/>(Discover Beetogreen|See our solutions|Try for free|Book a demo|Get in touch|Learn more)</g);
  console.log(`Block ${i + 1} buttons:`, btn?.map((x) => x.slice(1)));
});
