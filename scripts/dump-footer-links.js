const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const i = h.indexOf('footer__nav-list');
let count = 0;
let idx = 0;
while ((idx = h.indexOf('footer__nav-link', idx)) !== -1 && count < 15) {
  console.log(h.slice(idx, idx + 180).replace(/\s+/g, " "));
  idx++;
  count++;
}
