const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
for (const key of ["imageSide", "image_side", "sideImage", "hero_side", "section-hero__side-image-el"]) {
  const idx = h.indexOf(key);
  if (idx >= 0) {
    console.log(`\n${key}:`);
    console.log(h.slice(idx, idx + 400));
  }
}
