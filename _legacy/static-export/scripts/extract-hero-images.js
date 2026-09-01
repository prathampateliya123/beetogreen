const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*section-hero__side/g)];
console.log("side imgs via regex1", imgs);

const idx = html.indexOf("section-hero__side-image--");
console.log("side image html:", html.slice(idx, idx + 1200));

// all image src in hero section
const heroStart = html.indexOf('class="section-hero"');
const heroEnd = html.indexOf("</section>", heroStart);
const hero = html.slice(heroStart, heroEnd);
const srcs = [...hero.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
console.log("\nHero srcs:", srcs);

// Activez - card h3 titles
const activezStart = html.indexOf('class="activez"');
const activezEnd = html.indexOf("</section>", activezStart);
const activez = html.slice(activezStart, activezStart + 5000);
const h3s = [...activez.matchAll(/<h3[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]/g)].map((m) => m[1]);
console.log("\nActivez h3 titles:", h3s);

// CTA split titles and buttons
const ctaTitles = [...html.matchAll(/section-cta-split__title[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]/g)].map((m) => m[1]);
console.log("\nCTA titles:", ctaTitles);

const ctaBtns = [...html.matchAll(/section-cta-split[\s\S]*?button__text[^>]*>[\s\S]*?<!--\[-->([^<]+)<!--\]/g)].map((m) => m[1]);
console.log("CTA buttons (rough):", [...new Set(ctaBtns)]);
