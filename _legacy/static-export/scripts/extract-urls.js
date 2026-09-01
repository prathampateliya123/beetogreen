const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

const cloudinary = [...html.matchAll(/https:\/\/res\.cloudinary\.com[^"'\s]+/g)].map((m) => m[0]);
console.log("Cloudinary URLs (unique):");
[...new Set(cloudinary)].slice(0, 30).forEach((u) => console.log(u));

const heroMedia = html.match(/Hero_mini[^"']+/g);
console.log("\nHero media refs:", [...new Set(heroMedia || [])]);

const preloaderBlock = html.match(/<div class="preloader"[\s\S]*?<\/div><\/div><\/div>/);
console.log("\nPreloader HTML snippet:");
console.log(preloaderBlock ? preloaderBlock[0].slice(0, 800) : "not found");

// Footer address
const footerSection = html.slice(html.indexOf("<footer"), html.indexOf("</footer>") + 9);
const values = [...footerSection.matchAll(/footer__col-value[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]/g)].map((m) => m[1].trim());
console.log("\nFooter col values:", values);

// Section order from index attributes
const sections = [...html.matchAll(/<section[^>]*index="(\d+)"[^>]*class="([^"]+)"/g)];
console.log("\nSection order:");
sections.forEach((m) => console.log(m[1], m[2]));
