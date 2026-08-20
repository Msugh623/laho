import { serverTimestamp } from "firebase/firestore";
import crypto from "crypto";

export class User {
  constructor(data) {
    this.firstname = String(data.firstname || "");
    this.lastname = String(data.lastname || "");
    this.fullname = `${data.firstname || ""} ${data.lastname || ""}`;
    this.email = String(data.email || "");
    this.id = String(
      data.id ||
        "user-" +
          `${this.firstname[0]}${this.lastname[0]}-${Math.floor(
            Date.now() / this.fullname.length
          )}-` +
          crypto.randomUUID()
    );
    this.gender = String(data.gender || "guest");
    this.profileicon = String(
      data.profileicon || "/media/" + (data.gender || "male") + ".svg"
    );
    this.type = String(data.type || "");
    this.dateCreated = String(data.createdAt || new Date(Date.now()));
    this.dateModified = String(new Date(Date.now()));
    this.bio = String(data?.bio || "");
    this.phone = String(data?.phone || "");
    this.password = String(data?.password || "");
    this.role = "1001";
    this.iconData = data.iconData || {
      url: "",
      id: "",
      type: "",
    };
    this.verified = String(data?.verified || "");
    this.verifiedId = String(data.verifiedId || "");
  }
}

export class SafeUser {
  constructor(user) {
    this.email = String(user?.email || "");
    this.id = String(user?.id || "");
    this.profileicon = String(user?.profileicon || "");
    this.fullname = String(user?.fullname || "");
    this.gender = String(user?.gender || "");
    this.dateCreated = String(user?.dateCreated || "");
    this.dateModified = String(user?.dateModified || "");
    this.bio = String(user?.bio || "");
    this.firstname = String(user?.firstname || "");
    this.lastname = String(user?.lastname || "");
    this.role = String(user?.role || "1001" || "");
    this.phone = String(user?.phone || "");
    this.verified = String(user?.verified || "");
    this.verifiedId = String(user?.verifiedId || "");
  }
}

export class Listing {
  constructor(data) {
    this.id = String(data.id || "listing-" + crypto.randomUUID());
    this.uid = data.uid;
    this.name = String(data.name || "");
    this.description = String(data.description || "");
    this.tags = String(data.tags || "");
    this.reigion = String(data.reigion || "");
    this.state = String(data.state || "");
    this.country = String(data.country || "Nigeria");
    this.images = data.images || [];
    this.address = String(data.address || "");
    this.price = Number(data.price || "");
    this.currency = "NGN";
    this.upVotes = String(data.upVotes || "");
    this.relevance = String(data.relevance || 0);
    this.verified = Boolean(data.verified || false);
    this.reach = Number(data.reach || data.relevance || 0);
    this.externalUrl = String(data.externalUrl || "");
    this.meta = {
      ...(data.meta || {}),
      size: String(this?.meta?.size || "0ft by 0ft"),
    };
    this.phone = String(data?.phone || "");
    this.heldUp = Boolean(data.heldUp || false);
    this.sold = Boolean(data.sold || false);
    this.type = String(data?.type||"sale")
  }
}

export class SafeListing {
  constructor(data) {
    this.id = String(data.id || "");
    this.uid = String(data.uid || "");
    this.name = String(data.name || "");
    this.description = String(data.description || "");
    this.tags = String(data.tags || "");
    this.reigion = String(data.reigion || "");
    this.state = String(data.state || "");
    this.country = String(data.country || "Nigeria");
    this.images = Array(...(data.images || []));
    this.address = String(data.address || "");
    this.price = Number(data.price || "");
    this.currency = "NGN";
    this.upVotes = String(data.upVotes || "");
    this.relevance = String(data.relevance || 0);
    this.verified = Boolean(data.verified || false);
    this.reach = Number(data.reach || data.relevance || 0);
    this.externalUrl = String(data.externalUrl || "");
    this.meta = data.meta || {};
    this.heldUp = Boolean(data.heldUp || false);
    this.sold = Boolean(data.sold || false);
    this.type = String(data?.type||"sale")
  }
}

export class VerificationRequest {
  constructor(data) {
    this.firstname = String(data?.firstname || "");
    this.lastname = String(data?.lastname || "");
    this.profileicon = String(data?.profileicon || "");
    this.id = String(data?.id || "verify-" + crypto.randomUUID());
    this.uid = String(data?.uid || ""); // link request to a user
    this.nin = String(data?.nin || ""); // national ID number
    this.address = String(data?.address || "");
    this.images = Array.isArray(data?.images) ? data.images : [];
    this.status = String(data?.status || "pending"); // pending | approved | rejected
    this.dateCreated = String(data?.dateCreated || new Date(Date.now()));
    this.dateModified = String(new Date(Date.now()));
    this.checkoutId = String(data?.checkoutId || "");
  }
}
