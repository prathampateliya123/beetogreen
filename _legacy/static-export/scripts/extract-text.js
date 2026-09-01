const fs = require("fs");
const html = fs.readFileSync(
  require("path").join(__dirname, "../index.html"),
  "utf8"
);

const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l.length > 3 && l.length < 300);

const unique = [...new Set(text)];
console.log(unique.slice(0, 80).join("\n"));
