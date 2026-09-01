const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "../_legacy/static-export/css");
const outDir = path.join(__dirname, "../styles");
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".css"));

for (const file of files) {
  let css = fs.readFileSync(path.join(srcDir, file), "utf8");
  css = css.replace(/\[data-v-[a-f0-9]+\]/g, "");
  css = css.replace(/\.\.\/fonts\//g, "/fonts/");
  fs.writeFileSync(path.join(outDir, file), css);
}

console.log("Processed", files.length, "CSS files into styles/");
