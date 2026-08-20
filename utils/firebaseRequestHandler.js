import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

const listingsRef = collection(db, "listings");
const usersRef = collection(db, "users");
const verificationsRef = collection(db, "verificationRequest");

class Fb {
  // === Queries ===
  usremailq = (email) =>
    query(
      usersRef,
      orderBy("dateModified", "desc"),
      where("email", "==", email)
    );

  lstuidq = (uid) =>
    query(
      listingsRef,
      orderBy("relevance", "desc"),
      orderBy("reach", "desc"),
      where("uid", "==", uid)
    );

  lstfeeddq = () =>
    query(
      listingsRef,
      orderBy("relevance", "desc"),
      orderBy("reach", "desc"),
      limit(10)
    );

  // === Users ===
  validateUser = async (email) => {
    const res = await getDocs(this.usremailq(email));
    return res.docs.map((doc) => doc.data())[0];
  };

  getListingsByUID = async (uid) => {
    const res = await getDocs(this.lstuidq(uid));
    return res.docs.map((doc) => doc.data());
  };

  addUser = async (state) => {
    await setDoc(doc(usersRef, state.id), {
      ...state,
      dateModified: serverTimestamp(),
      dateCreated: serverTimestamp(),
    });
    return await this.getUser(state.id);
  };

  updateUser = async (state) => {
    await updateDoc(doc(db, "users", state.id), {
      ...state,
      dateModified: serverTimestamp(),
    });
    return true;
  };

  getUser = async (id) => {
    const res = await getDoc(doc(db, "users", `${id}`));
    return res.data();
  };

  getUsers = async () => {
    const res = await getDocs(usersRef);
    return res.docs?.map((doc) => ({ ...doc.data() }));
  };

  getVerifiedUsers = async () => {
    const q = query(usersRef, where("verified", "==", true));
    const res = await getDocs(q);
    return res.docs?.map((doc) => ({ ...doc.data() }));
  };

  getVerifiedListings = async () => {
    const q = query(listingsRef, where("verified", "==", true));
    const res = await getDocs(q);
    return res.docs?.map((doc) => ({ ...doc.data() }));
  };

  // === Listings ===
  getListing = async (id) => {
    const res = await getDoc(doc(db, "listings", `${id}`));
    return res.data();
  };

  getAllListings = async () => {
    const res = await getDocs(listingsRef);
    return res.docs?.map((doc) => ({ ...doc.data() }));
  };

  getFeedListings = async () => {
    const res = await getDocs(this.lstfeeddq());
    return res.docs?.map((doc) => ({ ...doc.data() }));
  };

  addListing = async (state) => {
    await setDoc(doc(listingsRef, state.id), state);
    return await this.getListing(state.id);
  };

  updateListing = async (state) => {
    await updateDoc(doc(db, "listings", state.id), state);
    return await this.getListing(state.id);
  };

  deleteListing = async (id) => {
    await deleteDoc(doc(db, "listings", id));
    return "OK";
  };

  // === Verification Requests ===
  addVerificationRequest = async (state) => {
    await setDoc(doc(verificationsRef, state.id), {
      ...state,
      status: state.status || "pending", // default status
      dateCreated: serverTimestamp(),
      dateModified: serverTimestamp(),
    });
    return state.id;
  };

  updateVerificationRequest = async (state) => {
    await updateDoc(doc(db, "verificationRequest", state.id), {
      ...state,
      dateModified: serverTimestamp(),
    });
    return await this.getVerificationRequest(state.id);
  };

  getVerificationRequest = async (id) => {
    const res = await getDoc(doc(db, "verificationRequest", `${id}`));
    return res.data();
  };

  getAllVerificationRequests = async () => {
    const res = await getDocs(verificationsRef);
    return res.docs?.map((doc) => ({ ...doc.data() }));
  };

  getVerificationRequestsByUID = async (uid) => {
    const q = query(
      verificationsRef,
      where("uid", "==", uid),
      orderBy("dateCreated", "desc")
    );
    const res = await getDocs(q);
    return res.docs?.map((doc) => ({ ...doc.data() }))[0];
  };

  deleteVerificationRequest = async (id) => {
    await deleteDoc(doc(db, "verificationRequest", id));
    return "OK";
  };
}

export const firebaseRequest = new Fb();
