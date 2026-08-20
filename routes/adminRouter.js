import express from "express";
import UseAuthHandler from "../middleware/authMiddleware.js";
import AdminHandler from "../handlers/adminHandler.js";

const adminRouter = express.Router();
const { authHandler } = new UseAuthHandler();
const adminHandler = new AdminHandler();

// Middleware to enforce admin role
const enforceAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// Routes
adminRouter.get(
  "/verifications",
  authHandler.enforceAuth,
  enforceAdmin,
  adminHandler.getAllVerifications.bind(adminHandler)
);

adminRouter.get(
  "/verifications/:verificationId",
  authHandler.enforceAuth,
  enforceAdmin,
  adminHandler.getVerificationById.bind(adminHandler)
);

adminRouter.put(
  "/verifications/:verificationId/approve",
  authHandler.enforceAuth,
  enforceAdmin,
  adminHandler.approveVerification.bind(adminHandler)
);

adminRouter.put(
  "/verifications/:verificationId/reject",
  authHandler.enforceAuth,
  enforceAdmin,
  adminHandler.rejectVerification.bind(adminHandler)
);

adminRouter.delete(
  "/verifications/:verificationId",
  authHandler.enforceAuth,
  enforceAdmin,
  adminHandler.deleteVerification.bind(adminHandler)
);

adminRouter.get(
  "/stats",
  authHandler.enforceAuth,
  adminHandler.getStats.bind(adminHandler)
);

export default adminRouter;
