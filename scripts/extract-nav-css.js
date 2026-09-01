const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "../_legacy/static-export/index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) process.exit(1);

const css = styleMatch[1]
  .replace(/\[data-v-[a-f0-9]+\]/g, "")
  .replace(/url\(fonts\//g, "url(/fonts/");

const navCss = css
  .split("}")
  .filter((block) => /\.nav/.test(block))
  .map((block) => block + "}")
  .join("\n");

fs.writeFileSync(path.join(__dirname, "../styles/nav.css"), navCss);
console.log("Wrote nav.css", navCss.length, "chars");
