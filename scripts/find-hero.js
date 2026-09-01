const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const keys = [
  "section-hero__side",
  "imageSide",
  "hero_shape",
  "velo_shape",
  "comment-section",
  "Salari",
  "side-image",
];
for (const key of keys) {
  let idx = 0;
  let count = 0;
  while ((idx = h.indexOf(key, idx)) !== -1 && count < 3) {
    console.log(`\n=== ${key} @ ${idx} ===`);
    console.log(h.slice(Math.max(0, idx - 100), idx + 200).replace(/\s+/g, " "));
    idx++;
    count++;
  }
}
