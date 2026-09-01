const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "../_live-home.html");
if (!fs.existsSync(htmlPath)) {
  console.log("Run curl first");
  process.exit(1);
}

const d = fs.readFileSync(htmlPath, "utf8");
console.log("nav--blur", d.includes("nav--blur"));
const matches = [...d.matchAll(/--nav-[a-z-]+:[^;"']+/g)];
[...new Set(matches.map((x) => x[0]))].forEach((x) => console.log(x));

const blurRules = [...d.matchAll(/\.nav--blur[^{]*\{[^}]+\}/g)];
blurRules.slice(0, 10).forEach((m) => console.log(m[0].slice(0, 200)));
