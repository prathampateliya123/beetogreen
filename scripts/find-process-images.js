const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const payload = h.match(/window\.__NUXT__=.*<\/script>/)?.[0] || "";
const imgs = [...h.matchAll(/beetogreen\.b-cdn\.net\/Home\/[^"\\]+/g)].map((m) => decodeURIComponent(m[0]));
const unique = [...new Set(imgs)];
unique.forEach((u) => console.log(u));

console.log("\n--- process images in HTML ---");
let idx = h.indexOf("process__visual");
while (idx !== -1) {
  const chunk = h.slice(idx, idx + 500);
  const img = chunk.match(/beetogreen\.b-cdn\.net[^"']+/);
  if (img) console.log(img[0]);
  idx = h.indexOf("process__visual", idx + 1);
}
