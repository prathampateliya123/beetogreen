const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

const sideIdx = html.indexOf("section-hero__side-image-el");
console.log("Hero side image block:");
console.log(html.slice(Math.max(0, sideIdx - 300), sideIdx + 400));

const shapeIdx = html.indexOf("section-hero__shape");
console.log("\nHero shape block:");
console.log(html.slice(Math.max(0, shapeIdx - 100), shapeIdx + 400));

const footerIdx = html.indexOf("Choose sustainable mobility");
console.log("\nFooter headline block:");
console.log(html.slice(footerIdx - 200, footerIdx + 800));

const address = html.match(/footer__address|footer__col-value|Paris|Lyon|France/gi);
console.log("\nAddress matches:", address);

// CTA split sections
["section-cta-split__title", "See our solutions", "Try for free", "A marketplace built", "Get in touch"].forEach((p) => {
  const i = html.indexOf(p);
  if (i > 0) console.log(`\n${p}:`, html.slice(i, i + 200).replace(/\s+/g, " "));
});

// Activez card structure sample
const cardIdx = html.indexOf("activez__card-title");
console.log("\nActivez card sample:");
console.log(html.slice(cardIdx, cardIdx + 600).replace(/\s+/g, " "));
