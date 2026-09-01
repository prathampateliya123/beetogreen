const CDN_HOME = "https://beetogreen.b-cdn.net/Home";
const CDN_PARTNER = "https://beetogreen.b-cdn.net/Partenaire";

export function cdnHome(filename) {
  return `${CDN_HOME}/${encodeURIComponent(filename).replace(/%20/g, "%20")}`;
}

export function cdnPartner(filename) {
  return `${CDN_PARTNER}/${encodeURIComponent(filename)}`;
}

export const assets = {
  heroVideo: `${CDN_HOME}/Hero_mini_comp.mp4`,
  heroSide: `${CDN_HOME}/comment-section-3.png`,
  homeBg: `${CDN_HOME}/home_bg.png`,
  cardSection2: `${CDN_HOME}/Card-section2.png`,
  cardSection2_1: `${CDN_HOME}/comment-section-3.png`,
  cardSection2_2: `${CDN_HOME}/Card-section2.png`,
  marketplace: `${CDN_HOME}/marketplaceNew.png`,
  mapShape: `${CDN_HOME}/Map_shape_all.png`,
  bikeGreen: `${CDN_PARTNER}/bike_green_smaller.png`,
  portrait: `${CDN_HOME}/portrait.png`,
};
