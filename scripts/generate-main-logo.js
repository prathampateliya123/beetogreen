const fs = require("fs");
const legacy = fs.readFileSync("_legacy/static-export/js/B9d3ang8.js", "utf8");

const textMatch = legacy.match(/data-logo-text[^]*?d:"([^"]+)"/);
const bPaths = [...legacy.matchAll(/data-logo-b[^]*?d:"([^"]+)"/g)];

if (!textMatch) {
  console.error("Could not extract text path");
  process.exit(1);
}

const component = `"use client";

export default function MainLogo({ color = "#141412", className = "" }) {
  const gradientId = "main-logo-gradient";

  return (
    <svg
      className={\`main-logo \${className}\`.trim()}
      viewBox="0 0 2434 489"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BeeToGreen logo"
      role="img"
    >
      <g data-logo-text>
        <path d="${textMatch[1]}" fill={color} />
      </g>
      <g data-logo-b>
        <path
          d="M230.703 163.905C209.97 151.597 187.934 144.943 173.381 142.748C131.906 136.493 99.8242 153.232 94.1096 164.889C83.282 182.69 118.972 213.021 173.381 205.938C227.789 198.856 249.686 143.826 232.161 93.7442C217.797 52.6951 164.288 17.7484 40.874 24.5547L28.1416 346.354C69.6473 354.437 236.171 388.355 276.775 297.813C302.955 228.791 269.058 186.674 230.703 163.905ZM232.161 93.7442C240.638 117.969 239.891 143.351 230.703 163.905M173.381 205.938C201.471 202.282 220.896 185.844 230.703 163.905"
          stroke={color}
          strokeWidth="44.616"
        />
        <path
          d="M94.1104 164.889C99.8249 153.232 131.907 136.493 173.381 142.748C187.934 144.943 209.97 151.598 230.704 163.906M285.793 258.512C288.799 212.258 261.157 181.984 230.704 163.906M230.704 163.906C239.892 143.352 240.639 117.969 232.162 93.7444"
          stroke={\`url(#\${gradientId})\`}
          strokeOpacity="0.7"
          strokeWidth="44.616"
        />
        <path
          d="M232.092 93.6772C249.617 143.759 227.72 198.789 173.312 205.871C201.402 202.215 219.83 187.367 230.634 163.839C240.082 142.915 240.569 117.902 232.092 93.6772Z"
          stroke={color}
          strokeWidth="44.616"
        />
      </g>
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-134.712 -105.296 -100.217 144.263 313.502 229.621)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.365657" stopOpacity="0" />
          <stop offset="0.642755" stopOpacity="0.8" />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
`;

fs.writeFileSync("components/ui/MainLogo.jsx", component);
console.log("Wrote components/ui/MainLogo.jsx");
