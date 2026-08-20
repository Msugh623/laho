import express from "express";
import requestHandlers from "../handlers/requestHandlers";
const listingsRouter = express.Router();

listingsRouter
  .route("/")
  .get(requestHandlers.getListings)
    .post(requestHandlers.createListing);
  
listingsRouter
    .route("/query")
    .get(requestHandlers.queryListings);

listingsRouter.route("/users/:uid").get(requestHandlers.getUser);

listingsRouter
  .route("/:listingId")
  .get(requestHandlers.getListing)
  .put(requestHandlers.updateListing)
.delete(requestHandlers.deleteListing);

export default listingsRouter;
