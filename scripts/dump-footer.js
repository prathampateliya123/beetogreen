const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const i = h.indexOf('class="footer');
console.log(h.slice(i, i + 8000));
