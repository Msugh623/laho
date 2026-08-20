import path from "path";
import {
  User,
  SafeUser,
  SafeListing,
  VerificationRequest,
} from "../schemas/constructors";
import fs from "fs";
import rootdirname from "../rootdirname";
import { firebaseRequest } from "../utils/firebaseRequestHandler";
import crypto from "crypto";
import { deleteManyFiles } from "../utils/cloudinary.js";
import UseStripe from "../utils/stripe.js";
import UsePaymentGateway from "../utils/paystack.js";

let config = {
  forbidden: [],
  visitors: [],
  authorizations: [],
};

class AuthHandler {
  constructor() {
    if (!fs.existsSync(path.join(rootdirname(), "auth.config.json"))) {
      this.config = config;
      this.saveConfig();
    }
    const authconfigRaw = fs.readFileSync(
      path.join(rootdirname(), "auth.config.json"),
      {
        encoding: "utf-8",
      }
    );
    let toJson = {};
    try {
      toJson = JSON.parse(
        authconfigRaw.length > 10 ? authconfigRaw : JSON.stringify(config)
      );
    } catch {
      console.log(
        `ERROR: failed to load auth config as ${__dirname}/../auth.config.json is curropted, falling back to default config.`
      );
      toJson = config;
    }
    this.config = toJson;
    config = toJson;
    this.roles = {
      1001: "user",
      0: "admin",
      1: "user+",
    };
    (async () => {
      try {
        this.apps = [];
        const res = await firebaseRequest.getAllApps();
        this.apps = res;
      } catch {
        this.apps = [];
      }
    })();
  }

  config = { ...config };

  checkSocketAuth = async (socket, next) => {
    const headers = socket.handshake.headers;
    const uInfo = {
      agent: headers["user-agent"],
      addr: socket.handshake.address || socket.request.connection.remoteAddress,
      type: "socket",
      date: `${new Date()}`,
      lastAccess: `${new Date()}`,
    };
    const auth = socket.handshake.auth.token;

    // Track visitors
    const theVisitor = this.config.visitors.find(
      (v) => v.agent == uInfo.agent && v.addr == uInfo.addr
    );
    if (!theVisitor) {
      this.config.visitors.push(uInfo);
      this.saveConfig();
    } else {
      this.config.visitors = this.config.visitors.map((u) =>
        u.agent == uInfo.agent && u.addr == uInfo.addr && u.type == uInfo.type
          ? { ...u, lastAccess: `${new Date()}` }
          : u
      );
    }

    socket.user = uInfo;

    // Check forbidden
    if (
      this.config.forbidden.find(
        (u) => u.agent == uInfo.agent && u.addr == uInfo.addr
      )
    ) {
      return next(new Error("Forbidden"));
    }
    // Auth check
    if (auth) {
      const token = auth;
      const theToken =
        this.config.authorizations.find((a) => {
          const val = String(a.token) == String(token);
          return Boolean(val);
        }) ||
        this.config.authorizations.find((a) => {
          const auths = a.authorizations || {};
          const apps = Object.keys(auths);
          const theKey = apps.find((app) => auths[app] == token);
          return Boolean(theKey);
        });
      socket.token = { ...uInfo, ...theToken };
      return next();
    }
    socket.token = uInfo;
    next();
  };

  enforceSocketAuth = (socket, next) => {
    const headers = socket.handshake.headers;
    const user = socket.token;
    if (!user.token) {
      return next(new Error("Unauthorized"));
    }
    if (!this.tokenIsYoung(user)) {
      this.ejectCred(user.token);
      return next(new Error("Session Expired"));
    }
    if (user.agent !== headers["user-agent"]) {
      this.ejectCred(user.token);
      return next(new Error("Session Compromised"));
    }
    next();
  };

  checkAuth = async (req, res, next) => {
    const { headers, socket } = req;
    const uInfo = {
      agent: headers["user-agent"],
      addr: socket.remoteAddress,
      type: "rest",
      date: `${new Date()}`,
      lastAccess: `${new Date()}`,
    };
    const theApp = this.apps.find(
      (app) => app.location == "" + headers?.origin
    );
    req.app = theApp || undefined;
    req.user = uInfo;
    const theVisitor = this.config.visitors.find(
      (v) => v.agent == uInfo.agent && v.addr == uInfo.addr
    );
    if (!theVisitor) {
      this.config.visitors.push(uInfo);
      this.saveConfig();
    } else {
      this.config.visitors = this.config.visitors.map((u) =>
        u.agent == uInfo.agent && u.addr == uInfo.addr && u.type == uInfo.type
          ? { ...u, lastAccess: `${new Date()}` }
          : u
      );
    }
    if (
      this.config.forbidden.find(
        (u) => u.agent == uInfo.agent && u.addr == uInfo.addr
      )
    ) {
      return res.status(403).send("Forbidden by Admin");
    }
    const keyIndex = req.rawHeaders.indexOf("X-Auth") + 1;
    const key = String(
      headers["Authorization"] ||
        headers["X-Auth"] ||
        req.cookies?.auth ||
        req.rawHeaders[keyIndex] ||
        ""
    );

    if (key && key.length > 10) {
      const token = key.replace("Bearer ", "");
      const theToken = this.config.authorizations.find((a) => {
        const val = String(a.token) == String(token);
        return Boolean(val);
      });
      (async () => {
        this.saveConfig();
      })();
      req.token = theToken;
      return next();
    }
    req.token = uInfo;
    next();
  };

  enforceAuth = (req, res, next) => {
    const { headers, token } = req;
    if (!token?.token) {
      return res.status(401).send(`Unauthorized`);
    }
    if (!this.tokenIsYoung(token)) {
      res
        .status(401)
        .send("Session Expired - Login again to renew Authorization");
      return this.ejectCred(token.token);
    }
    if (token.agent !== headers["user-agent"]) {
      res
        .status(403)
        .send("Authorization compromised: Login again to renew Authorization");
      return this.ejectCred(token.token);
    }
    next();
  };

  parseSocketUser = async (req, next) => {
    const email = req.token?.name || "";
    if (!email) {
      return next(new Error("Unauthorized"));
    }
    try {
      const user = await firebaseRequest.validateUser(email);
      req.user = user
        ? {
            ...req.user,
            id: user.id,
            email,
            role: user?.role || "1001",
          }
        : req.user;
    } catch (err) {
      console.log(err);
    } finally {
      next();
    }
  };

  parseUser = async (req, _, next) => {
    const email = req.token?.name || "";
    if (!email) {
      return next();
    }
    try {
      const user = await firebaseRequest.validateUser(email);
      if (!user?.id) {
        return next();
      }
      req.user = {
        ...req.user,
        id: user?.id,
        email,
        role: this.roles[user?.role || "1001"],
        verified: this.roles[user?.role] == "user+",
      };
    } catch (err) {
      console.log(err);
    } finally {
      next();
    }
  };

  login = async (req, res) => {
    const { body, headers, socket } = req;
    const user = await firebaseRequest.validateUser(body.email);
    if (!user) {
      return res
        .status(404)
        .send(
          "This your email is not associated to an account on our platform"
        );
    }
    if (body.password !== user.password) {
      return res.status(401).send("Wrong password");
    }
    const agent = headers["user-agent"];
    const token = crypto.randomUUID();
    const addr = socket.remoteAddress;
    const cred = {
      name: body.email,
      agent,
      token,
      addr,
      oldAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
      id: user.id || "",
    };
    await this.injectCred(cred);
    res.status(200).send({ token: cred.token });
  };

  signup = async (req, res) => {
    const { body } = req;
    const deleteIconIfPresent = async () => {
      if (body.iconData && body.iconData.id) {
        try {
          const { deleteFile } = await import("../utils/cloudinary.js");
          await deleteFile(body.iconData.id);
        } catch (e) {
          console.error("Failed to delete icon from Cloudinary:", e);
        }
      }
    };
    try {
      const user = await firebaseRequest.validateUser(body.email);
      if (user) {
        res.status(400).send("An account already exists with this email");
        return await deleteIconIfPresent();
      }
      if (!body.password || body.password.length < 6) {
        res.status(400).send("Password must be at least 6 characters long");
        return await deleteIconIfPresent();
      }
      if (!body.email || !body.email.includes("@")) {
        res.status(400).send("Invalid email address");
        return await deleteIconIfPresent();
      }
      if (!body.firstname || !body.lastname) {
        res.status(400).send("First name and last name are required");
        return await deleteIconIfPresent();
      }
      if (!body.gender || !"malefemale".includes(body.gender)) {
        res.status(400).send("Gender must be specified as male or female");
        return await deleteIconIfPresent();
      }
      const prsUser = { ...new User(body) };
      const ures = await firebaseRequest.addUser(prsUser);
      req.body = ures;
      return this.login(req, res);
    } catch (err) {
      await deleteIconIfPresent();
      return res.status(500).send(err?.message || err);
    }
  };

  updateProfile = async (req, res) => {
    const { body } = req;
    const deleteIconIfPresent = async (usr) => {
      if (usr.iconData && usr.iconData.id) {
        try {
          const { deleteFile } = await import("../utils/cloudinary.js");
          await deleteFile(usr.iconData.id);
        } catch (e) {
          console.error("Failed to delete icon from Cloudinary:", e);
        }
      }
    };
    let u;
    try {
      const user = await firebaseRequest.validateUser(req?.token?.name || "");
      u = user;
      const hasNewImg =
        body?.iconData?.id !== user?.iconData?.id &&
        user?.iconData?.id &&
        body?.iconData?.id;
      if (!user) {
        res.status(401).send("No such user");
        if (hasNewImg) await deleteIconIfPresent(body);
        return;
      }
      if (body.password && body.prevPass !== user.password) {
        res.status(401).send("Old password is not correct");
        if (hasNewImg) await deleteIconIfPresent(body);
        return;
      }
      if (hasNewImg) await deleteIconIfPresent(user);
      const prsUser = { ...new User({ ...user, ...body, email: user.email }) };
      await firebaseRequest.updateUser(prsUser);
      res.status(200).send("OK");
    } catch (err) {
      const hasNewImg =
        body?.iconData?.id !== u?.iconData?.id &&
        u?.iconData?.id &&
        body?.iconData?.id;
      if (hasNewImg) await deleteIconIfPresent(body);
      return res.status(500).send(err?.message || err);
    }
  };

  getAuth = async (req, res) => {
    const { token } = req;
    if (!token?.name) {
      res.status(401).send("User session not found");
      return token?.token && this.ejectCred(token.token);
    }
    const authSate = await firebaseRequest.validateUser(
      token?.name || "i0}{nomail@--@.netframeUsr&&.<<"
    );
    if (!authSate) {
      res.status(401).send("User session not found");
      return token?.token && this.ejectCred(token.token);
    }
    res.status(200).json({ ...new SafeUser(authSate) });
  };

  getMyListings = async (req, res) => {
    const { token } = req;
    const authSate = await firebaseRequest.validateUser(
      token?.name || "i0}{nomail@--@.netframeUsr&&.<<"
    );
    if (!authSate) {
      res.status(401).send("User session not found");
      return token.token && this.ejectCred(token.token);
    }
    const listings = await firebaseRequest.getListingsByUID(authSate.id || "");
    res.status(200).json(
      listings.map((l) => ({
        ...new SafeListing({ ...l, images: JSON.parse(l.images || "") }),
      })) || []
    );
  };
  getListingsByUID = async (req, res) => {
    const { uid } = req.params;
    const authSate = await firebaseRequest.getUser(
      uid || "i0}{nomail@--@.netframeUsr&&.<<"
    );
    if (!authSate) {
      res.status(401).send("No Such User");
      return token.token && this.ejectCred(token.token);
    }
    const listings = await firebaseRequest.getListingsByUID(uid || "");
    res.status(200).json(
      listings.map((l) => ({
        ...new SafeListing({ ...l, images: JSON.parse(l.images || "") }),
      })) || []
    );
  };

  // Delete verification request
  deleteVerification = async (req, res) => {
    try {
      const uid = req?.token?.name;
      if (!uid) return res.status(401).send("Unauthorized");

      const user = await firebaseRequest.validateUser(uid);
      if (!user?.verifiedId) {
        return res.status(404).send("No verification record found");
      }

      const verification = await firebaseRequest.getVerificationRequest(
        user.verifiedId
      );
      if (!verification) return res.status(404).send("Verification not found");

      if (user?.verifiedId === verification.id) {
        // Clear link on user if they delete their request
        await firebaseRequest.updateUser({
          ...user,
          verifiedId: "",
        });
      }
      await firebaseRequest.deleteVerificationRequest(user.verifiedId);
      res.status(200).send("Deleted successfully");
      deleteManyFiles(verification.images);
    } catch (err) {
      console.error("deleteVerification error:", err);
      res.status(500).send(err?.message || "Server error");
    }
  };

  createVerification = async (req, res) => {
    // Helper to delete images if verification fails
    const cleanupImages = async () => {
      if (!req.body?.images || !Array.isArray(req.body.images)) return;
      try {
        deleteManyFiles(req.body.images);
      } catch (e) {
        console.error("CleanupImages util load failed:", e.message);
      }
    };

    try {
      const uid = req?.token?.name;
      if (!uid) return res.status(401).send("Unauthorized");

      const user = await firebaseRequest.validateUser(uid);
      if (!user) return res.status(404).send("User not found");

      if (user?.verifiedId) {
        const existing = await firebaseRequest.getVerificationRequest(
          user.verifiedId
        );
        if (existing) {
          await cleanupImages();
          return res
            .status(400)
            .send(`Request is ${existing.status || "pending"}`);
        }
      }

      const payload = new VerificationRequest({
        ...user,
        ...req.body,
        uid: user.id,
        status: "pending",
        id: `verf-${uid}-${Date.now()}`,
      });

      await firebaseRequest.addVerificationRequest(payload);

      await firebaseRequest.updateUser({
        ...user,
        verifiedId: payload.id,
      });

      res.status(201).json(payload);
    } catch (err) {
      console.error("createVerification error:", err);
      await cleanupImages(); // ensure cleanup on error
      res.status(500).send(err?.message || "Server error");
    }
  };

  // Read verification by current user
  getMyVerification = async (req, res) => {
    try {
      const uid = req?.token?.name;
      if (!uid) return res.status(401).send("Unauthorized");

      const user = await firebaseRequest.validateUser(uid);
      if (!user?.verifiedId) {
        return res.status(404).send("No verification record found");
      }

      const verification = await firebaseRequest.getVerificationRequest(
        user.verifiedId
      );
      if (!verification) return res.status(404).send("Verification not found");

      res.status(200).json(verification);
    } catch (err) {
      console.error("getMyVerification error:", err);
      res.status(500).send(err?.message || "Server error");
    }
  };

  completeVerification = async (req, res) => {
    try {
      const uid = req?.token?.name;
      if (!uid) return res.status(401).send("Unauthorized");

      const user = await firebaseRequest.validateUser(uid);
      if (!user?.verifiedId) {
        return res.status(404).send("No verification record found");
      }

      const verification = await firebaseRequest.getVerificationRequest(
        user.verifiedId
      );
      if (!verification) return res.status(404).send("Verification not found");
      const paystack = new UsePaymentGateway();
      const checkout = await paystack.initVerificationCheckout(user,5000);
      verification.checkoutId = checkout.id;
      await firebaseRequest.updateVerificationRequest(verification);
      res.status(200).json({ url: checkout.url });
    } catch (err) {
      console.error("getMyVerification error:", err);
      res.status(500).send(err?.message || "Server error");
    }
  };

  finalizeVerification = async (req, res) => {
    try {
      const uid = req?.token?.name;
      if (!uid) return res.status(401).send("Unauthorized");

      const user = await firebaseRequest.validateUser(uid);
      if (!user?.verifiedId) {
        return res.status(404).send("No verification record found");
      }

      const verification = await firebaseRequest.getVerificationRequest(
        user.verifiedId
      );
      if (!verification) return res.status(404).send("Verification not found");

      // Verify Paystack transaction
      const paystack = new UsePaymentGateway();
      const response = await paystack.paystack.verifyTransaction({
        reference: verification.checkoutId,
      });

      const { status, data } = response.body;

      if (!status || data.status !== "success") {
        return res.status(403).send("Payment not completed");
      }

      // Mark user as verified
      user.verified = true;
      await firebaseRequest.updateUser(user);

      // Update all listings by this user to verified
      const listings = await firebaseRequest.getListingsByUID(user.id);
      const verifiedListings = listings.map((l) => ({ ...l, verified: true }));
      for (const listing of verifiedListings) {
        await firebaseRequest.updateListing(listing);
      }

      res.status(200).send("OK");
    } catch (err) {
      console.error("finalizeVerification error:", err);
      res.status(500).send(err?.message || "Server error");
    }
  };

  // Update verification request
  updateVerification = async (_, res) => {
    try {
      throw "No such route";
    } catch (err) {
      res.status(500).send(err?.message || "Server error");
    }
  };

  logout = async (req, res) => {
    this.ejectCred(req.token.token);
    res.status(200).send("Logged out");
  };

  updateForbidden = (req, res) => {
    const { body } = req;
    const newForbidden = body || {};
    if (
      this.config.forbidden.find(
        (f) => f.agent == body.agent && f.addr == body.addr
      )
    ) {
      return res.status(200).json(this.config.forbidden);
    }
    this.config.forbidden = [...this.config.forbidden, newForbidden];
    this.saveConfig();
    res.status(200).json(this.config.forbidden);
  };

  remForbidden = (req, res) => {
    const { body } = req;
    const { agent, addr } = body;
    this.config.forbidden = this.config.forbidden.filter(
      (f) => f.agent !== agent || f.addr !== addr
    );
    this.saveConfig();
    res.status(200).json(this.config.forbidden);
  };

  tokenIsYoung = (token) => {
    const date = Date.now();
    return date < (token?.oldAge || 0);
  };

  injectCred = async (data) => {
    this.config.authorizations.push(data);
    this.saveConfig();
  };

  ejectCred = async (token) => {
    const newAuths = this.config.authorizations.filter(
      (a) => a.token !== token
    );
    this.config.authorizations = newAuths;
    this.saveConfig();
  };

  returnProtected = () => {
    return this.config.protectedroutes;
  };

  saveConfig = (cb = () => {}) => {
    fs.writeFileSync(
      path.join(rootdirname(), "auth.config.json"),
      JSON.stringify(this.config)
    );
    config = this.config;
    cb();
  };
  getConfig = () => {
    return this.config;
  };
}

const authHandler = new AuthHandler();

class UseAuthHandler {
  constructor() {
    this.authHandler = authHandler;
  }
}

export default UseAuthHandler;
