const fs = require("fs");
const s = fs.readFileSync("_legacy/static-export/js/rxBUV76z.js", "utf8");
for (const key of ["BottomRound", "TopRound", "ReverseB"]) {
  const i = s.indexOf(key);
  console.log("\n===", key, "===", i);
  if (i >= 0) console.log(s.slice(i, i + 600));
}
