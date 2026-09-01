const fs = require("fs");
const h = fs.readFileSync("_tmp_live.html", "utf8");
const phrases = [
  "Choose sustainable mobility",
  "Navigation",
  "Legal",
  "Get in touch",
  "Employers",
  "Employees",
  "Become a partner",
  "Back to top",
  "Privacy",
  "47 Rue Voltaire",
  "footer__row--info",
  "footer__nav-group-label",
  "I'm an employee",
];
for (const p of phrases) {
  const i = h.indexOf(p);
  if (i >= 0) console.log(p, "=>", h.slice(Math.max(0, i - 40), i + 120).replace(/\s+/g, " "));
}
