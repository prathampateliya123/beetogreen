const fs = require("fs");
const s = fs.readFileSync("_legacy/static-export/js/rxBUV76z.js", "utf8");
const i = s.indexOf("useDrawPath");
console.log(s.slice(i, i + 2500));
