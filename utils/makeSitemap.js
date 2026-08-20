import path from "path";
import rootdirname from "../rootdirname";
import { firebaseRequest } from "./firebaseRequestHandler";
import fs from "fs";

async function listingMapInit() {
  const verified = await firebaseRequest.getVerifiedListings();
  const listmap = makeSiteMap(verified);
  fs.writeFileSync(
    path.join(rootdirname(), "public", "listingsmap.xml"),
    listmap,
    {
      encoding: "utf-8",
    }
  );
}

function makeSiteMap(listings = []) {
  const toXML = listings
    .filter((l) => !l.sold)
    .map(
      (l) =>
        `<url><loc>${process.env.HOST || "http://localhost:3000"}/listed/${
          l.id
        }</loc><changefreq>daily</changefreq><priority>1.0</priority> </url>`
    );
  const map = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${toXML.join(
    ""
  )}</urlset>`;
  return map;
}

export default listingMapInit;
