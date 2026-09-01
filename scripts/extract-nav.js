const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "../_legacy/static-export/index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const idx = html.indexOf('class="nav');
console.log(html.slice(idx, idx + 4000));
