const fs = require("fs");
const css = fs.readFileSync(
  "C:/Users/prath/Documents/GitHub/beetogreen/_legacy/static-export/css/index.DMiNGori.css",
  "utf8"
);
const keys = [
  "testimonials__arrow",
  "testimonials__arrow-progress",
  "testimonials__container",
  "testimonials--entered",
  "stroke-dasharray",
  "conic-gradient",
  "--progress-duration",
];
keys.forEach((k) => {
  const i = css.indexOf(k);
  if (i >= 0) console.log("\n" + k + ":", css.slice(i, i + 350));
});
