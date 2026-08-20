import React, { useEffect, useState } from "react";
import { useStateContext } from "../../state/StateContext";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import api from "../../../axios/api";
import { FaInfoCircle, FaStar } from "react-icons/fa";

const UserProfile = () => {
  const [theUser, setTheUser] = useState({});
  const [hisListings, setHisListings] = useState([]);
  const { uid } = useParams();

  async function getMyListings() {
    const uRes = await api.get("/users/" + uid);
    setTheUser(uRes.data);
    document.title =
      uRes.data.firstname +
      " " +
      uRes.data.lastname +
      "'s" +
      ` ${uRes.data.verified ? " verified business " : ""}` +
      " Profile - laho";
    const lRes = await api.get("/auth/profile/listings/user/" + uid);
    setHisListings(lRes.data);
  }

  useEffect(() => {
    scroll({ top: 0 });
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
            src={theUser.profileicon}
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
              <h3 className="mb-1">{theUser.fullname}</h3>
              {theUser.verified && (
                <div
                  className="rounded mt-1 small px-2"
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
              <div className="text-muted mt-2 mb-2">
                {theUser.bio || "No bio provided."}
              </div>

              <div className="mb-2">
                <span className="me-3">{theUser.email}</span>
                <span className="me-3">
                  {theUser.gender &&
                    theUser.gender.charAt(0).toUpperCase() +
                      theUser.gender.slice(1)}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-muted">
                  Joined on{" "}
                  {theUser.dateCreated?.seconds
                    ? new Date(theUser.dateCreated.seconds * 1000)
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")
                    : ""}
                </span>
              </div>
              <div className="d-flex gap-2 mt-3">
                <div className="small">
                  {/* External link */}
                  {theUser.phone && (
                    <a
                      href={"https://wa.me/" + theUser.phone}
                      className="btn themebg text-light btn-small me-1 small p-1 px-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Message on whatsapp
                    </a>
                  )}
                  {theUser.email && (
                    <a
                      href={`mailto:${theUser.email}`}
                      className="btn btn-outline-success btn-small small p-1 me-1 px-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Send Email
                    </a>
                  )}
                  {theUser.phone && (
                    <a
                      href={"tel:" + theUser.phone}
                      className="btn btn-outline-success btn-small me-1 small p-1 px-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="" style={{ paddingTop: 10 }}>
          <div className="container text-dark px-0 px-2 pt-5 p-4">
            <div className="px-4">
              <h3 className="mb-2">
                {(theUser.firstname || "").replace(" ", "") || "User"}'s
                Listings
              </h3>
              <div className="mb-5">
                <div className="row">
                  <div className=" row">
                    {hisListings.map((listing) => (
                      <Link
                        to={`/listed/${listing.id}`}
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
                                          theUser.name
                                        } has been contacted over the listing, you can still contact ${
                                          theUser?.gender == "male"
                                            ? "him"
                                            : "her"
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
                                        ` ${theUser?.name} marked this listing as sold`,
                                    );
                                  }}
                                >
                                  <FaInfoCircle className="icon" /> This listing
                                  has been sold out
                                </button>
                              )}
                            </div>
                            {(() => {
                              const isImage =
                                (listing.images[0]?.type || "").startsWith(
                                  "image",
                                ) && listing.images[0]?.type;
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

export default UserProfile;
