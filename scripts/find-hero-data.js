const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const start = h.indexOf('"image_side"');
console.log(h.slice(start - 200, start + 800));

const heroIdx = h.indexOf("Mobility that");
console.log("\nhero text:", h.slice(heroIdx, heroIdx + 200));

const sideIdx = h.indexOf("side-image-el");
let count = 0;
let idx = 0;
while ((idx = h.indexOf("side-image", idx)) !== -1 && count < 10) {
  const chunk = h.slice(idx, idx + 300);
  if (chunk.includes("src=") || chunk.includes("b-cdn")) {
    console.log("\nHTML side:", chunk.replace(/\s+/g, " "));
    count++;
  }
  idx++;
}
