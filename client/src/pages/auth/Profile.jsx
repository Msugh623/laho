import React, { useEffect, useState } from "react";
import { useStateContext } from "../../state/StateContext";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import api from "../../../axios/api";
import { FaInfoCircle, FaStar } from "react-icons/fa";

const Profile = () => {
  const { user, verification, fetchSrc } = useStateContext();
  const [myListings, setMyListings] = useState([]);
  const navigate = useNavigate();

  async function getMyListings() {
    document.title = "My Profile - laho";
    const res = await api.get("/auth/profile/listings");
    setMyListings(res.data);
    fetchSrc();
  }
  useEffect(() => {
    scroll({ top: 0, behavior: "smooth" });
    getMyListings();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Profile Header */}
      <div
        className="position-relative"
        style={{
          background: "linear-gradient(90deg, #badfafff 60%, #bfd1afff 100%)",
          height: 160,
        }}
      >
        <div className="container position-relative">
          <img
            src={user.profileicon}
            alt="Profile"
            className="rounded-circle border border-3 border-white position-absolute"
            style={{
              width: 180,
              height: 180,
              objectFit: "cover",
              left: 30,
              top: 30,
              background: "#fff",
            }}
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="" style={{ paddingTop: 10 }}>
        <div className=" text-dark shadow-sm px-5 px-md-0 pt-5 p-4">
          <div className="d-flex flex-column flex-md-row align-items-md-center">
            <div style={{ width: 140 }}></div>
            <div className="flex-grow-1">
              <h3 className="mb-1">{user.fullname}</h3>
              {user.verified && (
                <div
                  className="rounded mt-1 small px-2"
                  style={{
                    backgroundColor: "#D4AF37",
                    maxWidth: "fit-content",
                  }}
                  onClick={() =>
                    navigate("/auth/user-profile/verification/view")
                  }
                >
                  <FaStar
                    className="icon"
                    style={{
                      color: "#ffe479ff",
                    }}
                  />{" "}
                  Verified
                </div>
              )}
              <div className="text-muted mt-2 mb-2">
                {user.bio || "No bio provided."}
              </div>
              <div className="mb-2">
                <span className="me-3">{user.email}</span>
                <span className="me-3">
                  {user.gender &&
                    user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-muted">
                  Joined on{" "}
                  {user.dateCreated?.seconds
                    ? new Date(user.dateCreated.seconds * 1000)
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")
                    : ""}
                </span>
              </div>

              <div className="d-flex gap-2 mt-3 small">
                {!user?.verified &&
                  (user.verifiedId ? (
                    <Link
                      to={
                        verification?.checkoutId
                          ? "/auth/verification/finish"
                          : "/auth/user-profile/verification/view"
                      }
                      className="rounded btn"
                      style={{
                        backgroundColor: "#D4AF37",
                        maxWidth: "fit-content",
                      }}
                    >
                      <FaStar
                        className="icon fs-5"
                        style={{
                          color: "#ffe479ff",
                        }}
                      />{" "}
                      {verification?.checkoutId ? (
                        <>{"Complete verification"}</>
                      ) : (
                        <>
                          {"Verification " + (verification.status || "Pending")}
                        </>
                      )}
                    </Link>
                  ) : (
                    <Link
                      to={"/auth/user-profile/verification"}
                      className="rounded btn"
                      style={{
                        backgroundColor: "#D4AF37",
                        maxWidth: "fit-content",
                      }}
                    >
                      <FaStar
                        className="icon fs-5"
                        style={{
                          color: "#ffe479ff",
                        }}
                      />{" "}
                      Get Verified
                    </Link>
                  ))}
                <Link
                  to={"/auth/user-profile/edit"}
                  className="btn themebg small text-light"
                >
                  Edit Profile
                </Link>
                <Link
                  to={"/listed/new"}
                  className="btn themetxt small border border-success"
                >
                  + Add Listing
                </Link>
                {user.role == "0" ? (
                  <Link
                    to={"/sys/admin"}
                    className="btn themetxt small border border-success"
                  >
                    Admin
                  </Link>
                ) : (
                  <></>
                )}
                <button
                  className="btn border border-dark small text-dark"
                  onClick={async () => {
                    if (!confirm("Logout?")) {
                      return null;
                    }
                    await api.get("/logout");
                    localStorage.access = "";
                    location.href = location.origin;
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="" style={{ paddingTop: 10 }}>
          <div className="container text-dark px-0 px-2 pt-5 p-4">
            <div className="px-4">
              <h3 className="mb-2">My Listings</h3>
              <div className="mb-5">
                <div className="row">
                  <div className=" row">
                    {myListings.map((listing) => (
                      <Link
                        to={`/auth/user-profile/listed/${listing.id}`}
                        key={listing.id}
                        className="no-dec text-dark col-12 col-sm-6 col-md-4 mt-4"
                      >
                        <div className="hovShade shadow rounded d-flex  flex-column w-100">
                          <div className="w-100 row mx-auto g-0">
                            <div
                              className="small"
                              style={{
                                position: "absolute",
                              }}
                            >
                              {listing.heldUp && !listing.sold && (
                                <button
                                  className="mb-1 btn text-light themebg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.info(
                                      "This is probably because " +
                                        `${
                                          user.name
                                        } has been contacted over the listing, you can still contact ${
                                          user?.gender == "male" ? "him" : "her"
                                        } as the listing has not been sold out`,
                                    );
                                  }}
                                >
                                  <FaInfoCircle className="icon" /> This Listing
                                  has been held up by the owner
                                </button>
                              )}
                              {listing.sold && (
                                <button
                                  className="mb-1 btn text-light btn-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.info(
                                      "This listing has been sold out. you are seen this because" +
                                        ` ${user?.name} marked this listing as sold`,
                                    );
                                  }}
                                >
                                  <FaInfoCircle className="icon" /> This listing
                                  has been sold out
                                </button>
                              )}
                            </div>
                            {(() => {
                              const isImage = (
                                listing.images[0]?.type || ""
                              ).includes("image");
                              return isImage ? (
                                <LazyLoadImage
                                  effect="opacity"
                                  className="img-fluid  w-100  rounded col-12"
                                  placeholderSrc="/images/default.png"
                                  src={
                                    listing.images[0]?.url ||
                                    "/images/default.png"
                                  }
                                  style={{
                                    height: "200px",
                                    minHeight: "200px",
                                    maxHeight: "200px",
                                    objectFit: "cover",
                                    minWidth: "100%",
                                  }}
                                  alt={listing.name}
                                />
                              ) : (
                                <>
                                  <video
                                    effect="opacity"
                                    className="img-fluid  w-100  rounded col-12"
                                    placeholderSrc="/images/default.png"
                                    src={
                                      listing.images[0]?.url ||
                                      "/images/default.png"
                                    }
                                    style={{
                                      height: "200px",
                                      minHeight: "200px",
                                      maxHeight: "200px",
                                      objectFit: "cover",
                                      minWidth: "100%",
                                    }}
                                    alt={listing.name}
                                  />
                                </>
                              );
                            })()}
                          </div>
                          <div className="p-3">
                            <h4 className="h5 mb-2">{listing.name}</h4>
                            <p className="small text-muted">
                              {listing.reigion}, {listing.state}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="fw-bold">
                                NGN {listing.price.toLocaleString()}
                              </div>
                              {/* <div className="small text-muted">{listing.reach} views</div> */}
                            </div>
                            <div className="d-flex">
                              {listing.verified && (
                                <div
                                  className="rounded small me-1 px-2 my-auto"
                                  style={{
                                    backgroundColor: "#D4AF37",
                                    maxWidth: "fit-content",
                                  }}
                                >
                                  <FaStar
                                    className="icon"
                                    style={{
                                      color: "#ffe479ff",
                                    }}
                                  />{" "}
                                  Verified
                                </div>
                              )}
                              <div
                                className="rounded text-light small px-2 my-auto"
                                style={{
                                  backgroundColor:
                                    listing.type == "rental"
                                      ? "#0056a7a4"
                                      : "#3d8f1c",
                                  maxWidth: "fit-content",
                                }}
                              >
                                {listing.type}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
