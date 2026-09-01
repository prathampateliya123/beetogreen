const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const i = h.lastIndexOf('class="footer__contact-block"');
console.log(h.slice(i, i + 1200));
