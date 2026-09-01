const fs = require("fs");
const path = require("path");

const js = fs.readFileSync(
  path.join(__dirname, "../_legacy/static-export/js/rxBUV76z.js"),
  "utf8"
);

const marker = "preloader_logo_animation={v,fr,ip,op,w,h,nm,ddd,assets,layers,markers,props}";
const pos = js.indexOf(marker);
const before = js.slice(Math.max(0, pos - 300000), pos);

const needed = new Set(["v", "fr", "ip", "op", "w", "h", "nm", "ddd", "assets", "layers", "markers", "props"]);
const assignments = [...before.matchAll(/([a-zA-Z_$][\w$]*)=(\{|\[|"|[0-9]|JSON)/g)];
const lastPos = {};

for (const m of assignments) {
  const key = m[1];
  if (needed.has(key)) lastPos[key] = m.index;
}

function parseValue(str, startIdx) {
  if (str.slice(startIdx, startIdx + 10) === "JSON.parse") {
    const quote = str[startIdx + 11];
    let i = startIdx + 12;
    let json = "";
    while (i < str.length) {
      const ch = str[i];
      if (ch === "\\") {
        json += ch + str[i + 1];
        i += 2;
        continue;
      }
      if (ch === quote) break;
      json += ch;
      i++;
    }
    return [JSON.parse(json), i + 1];
  }

  const char = str[startIdx];
  if (char === '"') {
    const end = str.indexOf('"', startIdx + 1);
    return [str.slice(startIdx + 1, end), end + 1];
  }
  if (char === "[" || char === "{") {
    const open = char;
    const close = char === "[" ? "]" : "}";
    let depth = 0;
    for (let i = startIdx; i < str.length; i++) {
      if (str[i] === open) depth++;
      else if (str[i] === close) {
        depth--;
        if (depth === 0) return [str.slice(startIdx, i + 1), i + 1];
      }
    }
  }
  const num = str.slice(startIdx).match(/^([0-9.]+)/);
  if (num) return [Number(num[1]), startIdx + num[1].length];
  return [null, startIdx];
}

const result = {};
for (const key of needed) {
  const eq = before.indexOf("=", lastPos[key]);
  const [val, end] = parseValue(before, eq + 1);
  if (typeof val === "string" && (val.startsWith("[") || val.startsWith("{"))) {
    result[key] = Function(`"use strict"; return (${val})`)();
  } else {
    result[key] = val;
  }
}

const outDir = path.join(__dirname, "../public/assets/lottie");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "preloader_logo_animation.json"), JSON.stringify(result));
console.log("Success! frames:", result.op, "size:", result.w + "x" + result.h, "layers:", result.layers.length);
