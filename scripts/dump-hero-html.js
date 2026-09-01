const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const marker = '<section class="section-hero"';
const i = h.indexOf(marker);
console.log(h.slice(i, i + 3000));
