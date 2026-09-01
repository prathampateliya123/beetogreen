const fs = require("fs");
const html = fs.readFileSync(
  "C:/Users/prath/Documents/GitHub/beetogreen/_legacy/static-export/index.html",
  "utf8"
);
const start = html.indexOf('<section class="section-hero"');
const end = html.indexOf("</section>", start);
const hero = html.slice(start, end);
console.log(hero.replace(/></g, ">\n<").slice(0, 3500));
