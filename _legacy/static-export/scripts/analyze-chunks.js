const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../js");
const files = [
  "Dcq4zhIQ.js",
  "Cpzt9js2.js",
  "DYLeD2vi.js",
  "DpUsp4bZ.js",
  "BmvFcdNA.js",
  "DXGhCg5W.js",
  "DgpY4N7j.js",
  "DICUR1py.js",
];

const patterns = [
  "preloader",
  "lottie",
  ".json",
  "hero__side",
  "section-hero__side",
  "Choose sustainable",
  "See our",
  "Try for free",
  "footerHeadline",
  "footer.headline",
  "nav__lang",
  "language",
  "progress",
  "clip-path",
  "isPreloader",
  "animation__block",
  "word-inner",
  "hero-next",
  "Hero_mini",
  "cloudinary",
  "res.cloudinary",
  "onComplete",
  "complete",
];

for (const f of files) {
  const s = fs.readFileSync(path.join(dir, f), "utf8");
  console.log(`\n=== ${f} ===`);
  for (const p of patterns) {
    if (s.includes(p)) console.log("FOUND:", p);
  }
  const jsonRefs = [...new Set(s.match(/["'][^"']*\.json["']/g) || [])];
  if (jsonRefs.length) console.log("JSON refs:", jsonRefs.join(", "));
  const urls = [
    ...new Set(
      (s.match(/https?:[^"'\s)]+/g) || []).filter(
        (u) =>
          u.includes("lottie") ||
          u.includes("json") ||
          u.includes("cloudinary") ||
          u.includes("media") ||
          u.includes("animation")
      )
    ),
  ];
  if (urls.length) console.log("URLs:\n", urls.join("\n "));
  const names = [...new Set(s.match(/__name:"[^"]+"/g) || [])];
  if (names.length) console.log("Components:", names.join(", "));
}
