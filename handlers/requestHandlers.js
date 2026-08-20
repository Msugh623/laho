import { Listing, SafeListing, SafeUser } from "../schemas/constructors";
import { deleteManyFiles } from "../utils/cloudinary";
import { firebaseRequest } from "../utils/firebaseRequestHandler";

class RequestHandlers {
  // Listings
  async getListings(_, res) {
    const listings = await firebaseRequest.getFeedListings();
    let results = listings.map((l) => {
      const parsedImages = JSON.parse(l.images || "[]");
      const transformedImages = parsedImages.map((img) => {
        // Check if the URL is from Cloudinary and transform it
        if (img.url && img.url.includes("cloudinary.com")) {
          // Apply a transformation to reduce the quality and resize
          const parts = img.url.split("/upload/");
          if (parts.length === 2) {
            const transformedUrl = `${parts[0]}/upload/w_256,h_256,c_fill,q_auto,f_auto/${parts[1]}`;
            return { ...img, url: transformedUrl };
          }
        }
        return img; // Return original image if not from Cloudinary
      });

      return new SafeListing({
        ...l,
        images: transformedImages,
      });
    });
    res.status(200).json(results);
  }

  async queryListings(req, res) {
    try {
      let listings = await firebaseRequest.getAllListings();

      // 1. Normalize images and create Listing objects
      let results = listings.map((l) => {
        const parsedImages = JSON.parse(l.images || "[]");
        const transformedImages = parsedImages.map((img) => {
          // Check if the URL is from Cloudinary and transform it
          if (img.url && img.url.includes("cloudinary.com")) {
            // Apply a transformation to reduce the quality and resize
            const parts = img.url.split("/upload/");
            if (parts.length === 2) {
              const transformedUrl = `${parts[0]}/upload/w_256,h_256,c_fill,q_auto,f_auto/${parts[1]}`;
              return { ...img, url: transformedUrl };
            }
          }
          return img; // Return original image if not from Cloudinary
        });

        return new Listing({
          ...l,
          images: transformedImages,
        });
      });

      const {
        state,
        reigion,
        country,
        verified,
        minPrice,
        maxPrice,
        tags,
        q,
        sort = "relevance:desc",
        limit = 20,
        page = 1,
      } = req.query;

      // 2. Filtering
      results = results.filter((l) => !l.sold);
      if (state) {
        results = results.filter(
          (l) => l.state?.toLowerCase() === state.toLowerCase()
        );
      }
      if (reigion) {
        results = results.filter(
          (l) => l.reigion?.toLowerCase() === reigion.toLowerCase()
        );
      }
      if (country) {
        results = results.filter(
          (l) => l.country?.toLowerCase() === country.toLowerCase()
        );
      }
      if (verified==true) {
        results = results.filter(
          (l) => l.verified
        );
      } else {
        results = results.filter((l) => l.id);
      }

      if (minPrice) {
        results = results.filter((l) => Number(l.price) >= Number(minPrice));
      }
      if (maxPrice) {
        results = results.filter((l) => Number(l.price) <= Number(maxPrice));
      }

      if (tags) {
        const tagArr = tags.split(",").map((t) => t.trim().toLowerCase());
        results = results.filter((l) =>
          l.tags
            .toLowerCase()
            .split(",")
            .map((t) => t.trim())
            .some((tag) => tagArr.includes(tag))
        );
      }

      // 3. Full-text search
      if (q) {
        const qLower = q.toLowerCase();
        results = results.filter((l) => {
          return (
            l.name.toLowerCase().includes(qLower) ||
            l.description.toLowerCase().includes(qLower) ||
            l.tags.toLowerCase().includes(qLower) ||
            l.state?.toLowerCase().includes(qLower) ||
            l.reigion?.toLowerCase().includes(qLower) ||
            l.country?.toLowerCase().includes(qLower) ||
            String(l.price).includes(qLower) ||
            l.address?.toLowerCase().includes(qLower)
          );
        });
      }

      // 4. Sorting
      const [sortField, sortOrder] = sort.split(":");
      results.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle undefined values during sorting
        if (aValue === undefined) aValue = -Infinity;
        if (bValue === undefined) bValue = -Infinity;

        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();

        if (sortOrder === "asc") {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
          return 0;
        } else {
          if (aValue < bValue) return 1;
          if (aValue > bValue) return -1;
          return 0;
        }
      });

      // 5. Pagination
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      const start = (pageNumber - 1) * limitNumber;
      const paginated = results.slice(start, start + limitNumber);

      // Create SafeListing objects for the paginated results
      const safeResults = paginated.map((listing) => new SafeListing(listing));

      res.status(200).json({
        total: results.length,
        page: pageNumber,
        limit: limitNumber,
        results: safeResults,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        total: 0,
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        results: [],
        error: "Something went wrong",
      });
    }
  }

  async updateListing(req, res) {
    try {
      const theListing = await firebaseRequest.getListing(req.params.listingId);
      if (!theListing) {
        return res.status(404).send("No such listing");
      }
      if (theListing.uid !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }
      const prevImgs = JSON.parse(theListing.images || "[]");
      const newListing = {
        ...theListing,
        ...new Listing(req.body),
        id: theListing.id,
        uid: theListing.uid,
      };
      newListing.images = JSON.stringify(newListing.images || []);
      const fRes = await firebaseRequest.updateListing(newListing);
      res.status(200).json({ ...new SafeListing(fRes) });
      const scapeGoats = prevImgs.filter(
        (img) =>
          !(req?.body?.images || []).find((record) => img.id == record.id)
      );
      deleteManyFiles(scapeGoats);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  }

  async createListing(req, res) {
    try {
      const listing = {
        ...new Listing({
          ...req.body,
          uid: req.user.id,
          verified: req.user.verified,
          images: JSON.stringify(req.body?.images || []),
        }),
      };
      const fRes = await firebaseRequest.addListing(listing);
      res.status(200).json({ ...new SafeListing(fRes) });
    } catch (error) {
      res.status(500).send("Something went Wrong");
      console.log(error);
      return await deleteManyFiles(req.body.images);
    }
  }

  async getListing(req, res) {
    const theListing = await firebaseRequest.getListing(req.params.listingId);
    if (!theListing) {
      return res.status(404).send("No such listing");
    }
    const data = {
      ...new SafeListing({
        ...theListing,
        images: JSON.parse(theListing.images || "[]"),
      }),
    };
    res.status(200).json(data);
  }

  async deleteListing(req, res) {
    try {
      const theListing = await firebaseRequest.getListing(req.params.listingId);
      theListing.images = JSON.parse(theListing.images);
      if (!theListing) {
        return res.status(404).send("No such listing");
      }
      if (theListing.uid !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }
      await deleteManyFiles(theListing.images);
      await firebaseRequest.deleteListing(theListing.id);
      res.status(200).send("Listed deleted");
    } catch {
      res.status(500).send("Something went wrong");
    }
  }

  // Users
  async getUser(req, res) {
    const theUser = await firebaseRequest.getUser(req.params.uid);
    if (!theUser?.id) {
      return res.status(404).send("No such account");
    }
    const psr = { ...new SafeUser(theUser), verified: theUser.role !== "1001" };
    res.status(200).json(psr);
  }
}

export default new RequestHandlers();
