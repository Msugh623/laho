import { firebaseRequest } from "../utils/firebaseRequestHandler";

class AdminHandler {
  // === Stats ===
  async getStats(req, res) {
    try {
      const users = await firebaseRequest.getUsers();
      const listings = await firebaseRequest.getAllListings();
      const verifications = await firebaseRequest.getAllVerificationRequests();

      const verifiedUsers = users.filter((u) => u.verified === true);

      return res.json({
        userCount: users.length,
        verifiedUserCount: verifiedUsers.length,
        listingCount: listings.length,
        verificationCount: verifications.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  }

  // === Verification Handlers ===
  async getAllVerifications(_, res) {
    try {
      const verifications = await firebaseRequest.getAllVerificationRequests();
      res.json(verifications);
    } catch (error) {
      console.error("Error fetching verifications:", error);
      res.status(500).json({ message: "Failed to fetch verifications" });
    }
  }

  async getVerificationById(req, res) {
    try {
      const { verificationId } = req.params;
      const verification = await firebaseRequest.getVerificationRequest(
        verificationId
      );
      if (!verification) {
        return res.status(404).json({ message: "Verification not found" });
      }
      res.json(verification);
    } catch (error) {
      console.error("Error fetching verification:", error);
      res.status(500).json({ message: "Failed to fetch verification" });
    }
  }

  async approveVerification(req, res) {
    try {
      const { verificationId } = req.params;
      const verification = await firebaseRequest.updateVerificationRequest({
        id: verificationId,
        status: "approved",
      });
      res.json({ message: "Verification approved", verification });
    } catch (error) {
      console.error("Error approving verification:", error);
      res.status(500).json({ message: "Failed to approve verification" });
    }
  }

  async rejectVerification(req, res) {
    try {
      const { verificationId } = req.params;
      const verification = await firebaseRequest.updateVerificationRequest({
        id: verificationId,
        status: "rejected",
      });
      res.json({ message: "Verification rejected", verification });
    } catch (error) {
      console.error("Error rejecting verification:", error);
      res.status(500).json({ message: "Failed to reject verification" });
    }
  }

  async deleteVerification(req, res) {
    try {
      const { verificationId } = req.params;
      await firebaseRequest.deleteVerificationRequest(verificationId);
      res.json({ message: "Verification deleted" });
    } catch (error) {
      console.error("Error deleting verification:", error);
      res.status(500).json({ message: "Failed to delete verification" });
    }
  }
}

export default AdminHandler;
