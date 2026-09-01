const fs = require("fs");
const path = require("path");
const https = require("https");

const downloads = [
  ["public/media/Hero_mini_comp.mp4", "https://beetogreen.b-cdn.net/Home/Hero_mini_comp.mp4"],
  ["public/images/home_bg.png", "https://beetogreen.b-cdn.net/Home/home_bg.png"],
  ["public/images/Card-section2.png", "https://beetogreen.b-cdn.net/Home/Card-section2.png"],
  ["public/images/Card-section2_1.png", "https://beetogreen.b-cdn.net/Home/comment-section-3.png"],
  ["public/images/Card-section2_2.png", "https://beetogreen.b-cdn.net/Home/Card-section2.png"],
  ["public/images/marketplaceNew.png", "https://beetogreen.b-cdn.net/Home/marketplaceNew.png"],
  ["public/images/Map_shape_all.png", "https://beetogreen.b-cdn.net/Home/Map_shape_all.png"],
  ["public/images/bike_green_smaller.png", "https://beetogreen.b-cdn.net/Partenaire/bike_green_smaller.png"],
  ["public/images/portrait.png", "https://beetogreen.b-cdn.net/Home/portrait.png"],
  ["public/images/AMZN_BIG.png", "https://beetogreen.b-cdn.net/Home/AMZN_BIG.png"],
  ["public/images/TTE_BIG.png", "https://beetogreen.b-cdn.net/Home/TTE_BIG.png"],
  ["public/images/edf.png", "https://beetogreen.b-cdn.net/Home/edf.png"],
  ["public/images/capgemini.png", "https://beetogreen.b-cdn.net/Home/capgemini.png"],
  ["public/images/Back_Market_Vertical_Logo_Tangaroa.png", "https://beetogreen.b-cdn.net/Home/Back_Market_Vertical_Logo_Tangaroa.png"],
  ["public/images/Logo-Worklife-noir-1-1-2048x370 3.png", "https://beetogreen.b-cdn.net/Home/Logo-Worklife-noir-1-1-2048x370%203.png"],
  ["public/images/betterway_logo_orange_medium 3.png", "https://beetogreen.b-cdn.net/Home/betterway_logo_orange_medium%203.png"],
  ["public/images/pluxee-logo-darkblue-rgb-2048x580 4.png", "https://beetogreen.b-cdn.net/Home/pluxee-logo-darkblue-rgb-2048x580%204.png"],
  ["public/images/skipr-20211115164750.png", "https://beetogreen.b-cdn.net/Home/skipr-20211115164750.png"],
  ["public/images/jeanfourche.png", "https://beetogreen.b-cdn.net/Home/jeanfourche.png"],
  ["public/images/voltaire.png", "https://beetogreen.b-cdn.net/Home/voltaire.png"],
  ["public/images/bastille.png", "https://beetogreen.b-cdn.net/Home/bastille.png"],
  ["public/images/ellipse.png", "https://beetogreen.b-cdn.net/Home/ellipse.png"],
  ["public/images/gaya.png", "https://beetogreen.b-cdn.net/Home/gaya.png"],
  ["public/images/elwing.png", "https://beetogreen.b-cdn.net/Home/elwing.png"],
  ["public/fonts/Parkinsans-Regular.AxsTl-Gt.woff2", "https://beetogreen.com/_nuxt/Parkinsans-Regular.AxsTl-Gt.woff2"],
  ["public/fonts/Parkinsans-Bold.CkGmFHK4.woff2", "https://beetogreen.com/_nuxt/Parkinsans-Bold.CkGmFHK4.woff2"],
  ["public/fonts/Parkinsans-ExtraBold.Bk-545Rw.woff2", "https://beetogreen.com/_nuxt/Parkinsans-ExtraBold.Bk-545Rw.woff2"],
  ["public/fonts/Parkinsans-Medium.Cpf086sn.woff2", "https://beetogreen.com/_nuxt/Parkinsans-Medium.Cpf086sn.woff2"],
  ["public/fonts/Parkinsans-SemiBold.Cwhnv_K0.woff2", "https://beetogreen.com/_nuxt/Parkinsans-SemiBold.Cwhnv_K0.woff2"],
  ["public/fonts/InstrumentSans-Regular.Pi0Mj7mL.woff2", "https://beetogreen.com/_nuxt/InstrumentSans-Regular.Pi0Mj7mL.woff2"],
  ["public/fonts/InstrumentSans-Medium.CkVWgT5B.woff2", "https://beetogreen.com/_nuxt/InstrumentSans-Medium.CkVWgT5B.woff2"],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`${url} -> ${res.statusCode}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      })
      .on("error", reject);
  });
}

(async () => {
  for (const [dest, url] of downloads) {
    try {
      await download(url, path.join(__dirname, "..", dest));
      console.log("OK", dest);
    } catch (error) {
      console.error("FAIL", dest, error.message);
    }
  }
})();
