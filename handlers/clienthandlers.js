import { readFileSync } from "fs";
import rootdirname from "../rootdirname";
import path from "path";
import { firebaseRequest } from "../utils/firebaseRequestHandler";

export async function parsFe(req, res) {
  const metadata = await getMeta(req.url);
  (async () => {
    try {
      const fe = await readFileSync(
        path.join(rootdirname(), "public", "indexer.html"),
        {
          encoding: "utf-8",
        },
      );
      const prsFe = fe
        .replace(
          "$title",
          metadata.title ||
            "Find, buy, and rent land and housing in a fast-changing digital era - Landhome",
        )
        .replace(
          "$description",
          metadata.description ||
            "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
        )
        .replace("$favico", metadata.icon || "/logo.png")
        .replace(
          "$keywords",
          metadata.tags ||
            "buy land, rent land, sell land, land for sale, rent house, rentals, rent property",
        );
      res.status(200).send(prsFe);
    } catch (err) {
      res.status(500).json({ message: "ERROR: " + err.message });
    }
  })();
}

const meta = [
  {
    name: "/",
    icon: "/logo.png",
    title:
      "Find, buy, and rent land and housing in a fast-changing digital era - Landhome",
    description:
      "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
    tags: "buy land, rent land, sell land, land for sale, rent house, rentals, rent property",
  },
  {
    name: "/contact-us",
    icon: "/logo.png",
    title:
      "Contact us for support and assistance on finding, buying, and renting land and housing in a fast-changing digital era - Landhome",
    description:
      "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
    tags: "buy land, rent land, sell land, land for sale, rent house, rentals, rent property",
  },
  {
    name: "/about-us",
    icon: "/logo.png",
    title:
      "Learn more about how landsmart make it easier for you to find, buy, and rent land and housing in a fast-changing digital era - Landhome",
    description:
      "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
    tags: "buy land, rent land, sell land, land for sale, rent house, rentals, rent property",
  },
  {
    name: "/auth/login",
    icon: "/logo.png",
    title:
      "Login to your landhome account to post and mannage your listings - Landhome",
    description:
      "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
    tags: "buy land, rent land, sell land, land for sale, rent house, rentals, rent property, landhome login",
  },
  {
    name: "/auth/create-account",
    icon: "/logo.png",
    title:
      "Create a landhome account to post and mannage your listings - Landhome",
    description:
      "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
    tags: "buy land, rent land, sell land, land for sale, rent house, rentals, rent property, landhome login",
  },
  {
    name: "/auth/user-profile/verification",
    icon: "/logo.png",
    title: "Get Verified, build customer trust - Landhome",
    description:
      "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
    tags: "buy land, rent land, sell land, land for sale, rent house, rentals, rent property, landhome login",
  },
  {
    name: "/auth/user-profile/verification/view",
    icon: "/logo.png",
    title: "Manage your verification - Landhome",
    description:
      "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
    tags: "buy land, rent land, sell land, land for sale, rent house, rentals, rent property, landhome login",
  },
];

async function getMeta(pathname = "/") {
  const parts = pathname.split("/");
  const end = parts[parts.length - 1] || "";
  try {
    if (end.startsWith("listing-")) {
      const l = await firebaseRequest.getListing(end);
      l.images = JSON.parse(l.images || []);
      const dat = {
        title: `${l.name} for ${l.type} on landsmart - Landsmart`,
        icon: l.images[0].url || meta[0].icon,
        tags: `${l.tags} ${meta[0].tags}`,
        description: `${l.description} - provided by landsmart`,
      };
      return dat;
    }
    if (end.startsWith("user-")) {
      const u = await firebaseRequest.getUser(end);
      const dat = {
        title: `${u.firstname} ${u.lastname}'s ${
          u.verified ? "verified bussiness " : ""
        }profile - Landsmart`,
        icon: u.profileicon || meta[0].icon,
        tags: `${u.firstname} ${u.lastname}`,
        description: "" + `${u.bio} - provided by landsmart`,
      };
      return dat;
    }
  } catch (error) {
    console.log("SSR_ERR: ", error);
  }
  const theMeta =
    meta.find((m) => pathname == m.name) ||
    meta.find(
      (m) =>
        pathname.includes(m.name) &&
        pathname.length - m.name.length < (50 / 100) * pathname.length,
    ) ||
    meta.find(
      (m) =>
        pathname.includes(m.name) &&
        m.name.length - pathname.length < (50 / 100) * m.name.length,
    ) ||
    meta.find((m) => pathname.includes(m.name)) ||
    meta[0];
  return theMeta;
}
