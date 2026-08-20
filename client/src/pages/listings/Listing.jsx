import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../axios/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useStateContext } from "../../state/StateContext";
import { FaInfoCircle, FaStar } from "react-icons/fa";

const Listing = () => {
  const { listingId } = useParams();
  const [theListing, setTheListing] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [theUser, setTheUser] = useState({});
  const { setModal, setTitle } = useStateContext();
  const phone = (theUser.phone || "").startsWith("0")
    ? (theUser.phone || "").replace("0", "")
    : theUser.phone || "";
  useEffect(() => {
    scroll({ top: 0 });
    (async () => {
      try {
        const res = await api.get("/listings/" + listingId);
        setTheListing(res.data);
        document.title = res?.data?.name + " - Landhome";
        if (res.data?.images?.length > 0) {
          setActiveMedia(res.data.images[0]); // default: first media
        }
        const { uid } = res.data;
        const lRes = await api.get("/users/" + uid);
        setTheUser(lRes.data);
      } catch (err) {
        toast.error("Something went wrong");
        console.error(err);
        document.title = theListing?.name || "Listing";
      }
    })();
  }, [listingId]);

  if (!theListing) {
    return (
      <div
        className="d-flex justify-content-center align-items-center py-5 bg-light"
        style={{
          minHeight: "45vw",
        }}
      >
        <div className="spinner-border themetxt" role="status" />
      </div>
    );
  }

  return (
    <div className="bg-white py-4 text-dark ">
      <div className="container">
        <div className="row g-4">
          {/* LEFT COLUMN - Media */}
          <div className="col-12 col-md-6">
            {theListing.images?.length > 0 && (
              <>
                {theListing.heldUp && !theListing.sold && (
                  <button
                    className="mb-1 btn text-light themebg"
                    onClick={() => {
                      toast.info(
                        "This is probably because " +
                          `${
                            theUser.name
                          } has been contacted over the listing, you can still contact ${
                            theUser?.gender == "male" ? "him" : "her"
                          } as the listing has not been sold out`
                      );
                    }}
                  >
                    <FaInfoCircle className="icon" /> This Listing has been held
                    up by the owner
                  </button>
                )}
                {theListing.sold && (
                  <button
                    className="mb-1 btn text-light btn-primary"
                    onClick={() => {
                      toast.info(
                        "This listing has been sold out. you are seen this because" +
                          ` ${theUser?.name} marked this listing as sold`
                      );
                    }}
                  >
                    <FaInfoCircle className="icon" /> This listing has been sold
                    out
                  </button>
                )}

                <div className="text-center mb-3">
                  {activeMedia?.type?.startsWith("video") ? (
                    <video
                      src={activeMedia.url}
                      controls
                      className="img-fluid rounded shadow-sm"
                      style={{
                        maxHeight: "300px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      onClick={() => {
                        setModal(
                          <video
                            src={activeMedia.url}
                            controls
                            className="img-fluid rounded shadow-sm mx-auto"
                            style={{
                              maxHeight: "70vh",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        );
                      }}
                    />
                  ) : (
                    <LazyLoadImage
                      effect="opacity"
                      src={activeMedia.url}
                      alt={theListing.name}
                      className="img-fluid rounded shadow-sm"
                      style={{
                        maxHeight: "300px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      onClick={() => {
                        setModal(
                          <LazyLoadImage
                            effect="opacity"
                            src={activeMedia.url}
                            alt={theListing.name}
                            className="img-fluid rounded shadow-sm mx-auto"
                            style={{
                              maxHeight: "70vh",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        );
                      }}
                    />
                  )}
                </div>

                {/* Thumbnails */}
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {theListing.images.map((media, idx) => (
                    <div
                      key={idx}
                      className={`border rounded p-1 ${
                        activeMedia?.url === media.url
                          ? "border-success"
                          : "border-light"
                      }`}
                      style={{
                        cursor: "pointer",
                        width: "70px",
                        height: "70px",
                        overflow: "hidden",
                      }}
                      onClick={() => setActiveMedia(media)}
                    >
                      {media.type?.startsWith("video") ? (
                        <video
                          src={media.url}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <LazyLoadImage
                          effect="opacity"
                          src={media.url}
                          alt="thumb"
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN - Details */}
          <div className="col-12 col-md-6">
            {/* Title + Verification */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0 ">{theListing.name}</h2>
            </div>

            {/* Price + Address */}
            <p className="lead fw-bold themetxt">
              {theListing.currency} {theListing.price.toLocaleString()}
            </p>
            <p className="text-muted mb-2">
              {theListing.address}, {theListing.state}, {theListing.reigion},{" "}
              {theListing.country}
            </p>
            <div className="d-flex">
              {theListing.verified && (
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
                    theListing.type == "rental" ? "#0056a7a4" : "#3d8f1c",
                  maxWidth: "fit-content",
                }}
              >
                {theListing.type}
              </div>
            </div>
            {/* Description */}
            <div className="mb-3 mt-3">
              <h5>Description</h5>
              <p>{theListing.description || "No description available."}</p>
            </div>

            {/* Tags */}
            {theListing.tags && (
              <div className="mb-3">
                <h6>Tags</h6>
                {theListing.tags.split(",").map((tag, i) => (
                  <span key={i} className="badge bg-secondary me-2">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="small">
              {/* External link */}
              {theUser.phone && (
                <a
                  href={
                    "https://wa.me/" +
                    phone +
                    `?text=I am interested in your listing ${theListing.name} on landsmart ${location.href} %0A`
                  }
                  className="btn themebg text-light btn-small me-1 small p-1 px-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on whatsapp
                </a>
              )}
              {theListing.externalUrl && (
                <a
                  href={theListing.externalUrl}
                  className="btn btn-outline-success btn-small small p-1 me-1 px-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit website
                </a>
              )}
              {theUser.email && (
                <a
                  href={`mailto:${theUser.email}?subject=Inquiry for your ${theListing.name} listing on Landhome&&body=I am interested in your listing ${location.href} %0A`}
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
        <div className="row mt-4">
          <div className="col-12">
            <div className="card p-3">
              <div className="d-flex align-items-center">
                <Link
                  to={`/user/${theUser.id}`}
                  className="d-flex align-items-center"
                >
                  <LazyLoadImage
                    effect="opacity"
                    src={theUser.profileicon}
                    alt={theUser.fullname}
                    className="rounded-circle me-3"
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="mb-0 d-flex">
                      {theUser.fullname}{" "}
                      {theUser.verified && (
                        <div
                          className="rounded icon mt-1 small ms-2 px-2"
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
                        </div>
                      )}
                    </h6>
                    <p className="small text-muted mb-0">
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={`mailto:${theUser.email}`}
                      >
                        {theUser.email}
                      </a>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
