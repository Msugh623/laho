import express from "express";
import UseAuthHandler from "../middleware/authMiddleware";

const authRouter = express.Router();
const { authHandler } = new UseAuthHandler();

// === Auth routes ===
authRouter.post("/login", authHandler.login);
authRouter.post("/logout", authHandler.logout);
authRouter.post("/signup", authHandler.signup);

authRouter
  .route("/profile")
  .get(authHandler.enforceAuth, authHandler.getAuth)
  .put(authHandler.enforceAuth, authHandler.updateProfile);

authRouter.get("/profile/listings", authHandler.getMyListings);
authRouter.get("/profile/listings/user/:uid", authHandler.getListingsByUID);

// === Verification routes ===
authRouter.post(
  "/profile/verification",
  authHandler.enforceAuth,
  authHandler.createVerification
);

authRouter.get(
  "/profile/verification",
  authHandler.enforceAuth,
  authHandler.getMyVerification
);

authRouter.put(
  "/profile/verification/:verificationId",
  authHandler.enforceAuth,
  authHandler.updateVerification
);

authRouter.delete(
  "/profile/verification",
  authHandler.enforceAuth,
  authHandler.deleteVerification
);

authRouter.post(
  "/profile/verification/complete",
  authHandler.enforceAuth,
  authHandler.completeVerification
);

authRouter.post(
  "/profile/verification/finish",
  authHandler.enforceAuth,
  authHandler.finalizeVerification
);

export default authRouter;
