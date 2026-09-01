const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const idx = h.indexOf('class="avantage__title"');
console.log("title idx", idx);
if (idx >= 0) console.log(h.slice(idx - 50, idx + 300));

const payloadIdx = h.indexOf("__NUXT_DATA__");
if (payloadIdx >= 0) {
  const chunk = h.slice(payloadIdx, payloadIdx + 50000);
  const matches = chunk.match(/Companies|Employees|genuinely|Choosing[^"]{0,80}/g);
  console.log("payload matches", [...new Set(matches || [])].slice(0, 20));
}
