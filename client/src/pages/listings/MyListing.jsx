import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../axios/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useStateContext } from "../../state/StateContext";
import { FaInfoCircle, FaStar } from "react-icons/fa";

const MyListing = () => {
  const { listingId } = useParams();
  const [theListing, setTheListing] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [theUser, setTheUser] = useState({});
  const { setModal } = useStateContext();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    scroll({ top: 0 });
    (async () => {
      try {
        const res = await api.get("/listings/" + listingId);
        setTheListing(res.data);
        if (res.data?.images?.length > 0) {
          setActiveMedia(res.data.images[0]); // default: first media
        }
        document.title = "My " + res.data.name + " listing - laho";
        const { uid } = res.data;
        const lRes = await api.get("/listings/users/" + uid);
        setTheUser(lRes.data);
      } catch (err) {
        toast.error("Something went wrong");
        console.error(err);
      }
    })();
  }, [listingId, refresh]);

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
            {theListing.heldUp && !theListing.sold && (
              <button
                className="mb-1 btn text-light themebg"
                onClick={() => {
                  toast.info(
                    "This is probably because " +
                      `You have been contacted over the listing and marked it as sold`,
                  );
                }}
              >
                <FaInfoCircle className="icon" /> This Listing has been held up
                by the You
              </button>
            )}
            {theListing.sold && (
              <button
                className="mb-1 btn text-light btn-primary"
                onClick={() => {
                  toast.info(
                    "This listing has been sold out. you are seen this because" +
                      ` You marked this listing as sold`,
                  );
                }}
              >
                <FaInfoCircle className="icon" /> This listing has been sold out
              </button>
            )}
            {theListing.images?.length > 0 && (
              <>
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
                          />,
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
                          />,
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
            <div className="d-flex gap-2 mt-3 small">
              <button
                className="btn btn-small btn-primary text-light"
                onClick={async () => {
                  const tst = toast.loading("Holding up your listing");
                  try {
                    const lo = { ...theListing };
                    lo.sold = !lo.sold;
                    await api.put(`/listings/${listingId}`, {
                      ...lo,
                    });
                    setRefresh((prev) => !prev);
                    toast.success("Your listing has been marked as sold");
                  } catch (err) {
                    toast.error(
                      err?.response?.data?.message ||
                        err?.response?.data ||
                        err?.message ||
                        "Something went wrong",
                    );
                  } finally {
                    toast.dismiss(tst);
                  }
                }}
              >
                {theListing?.sold ? "Mark as available" : "Mark as Sold"}
              </button>
              <button
                className="btn btn-small themebg text-light"
                onClick={async () => {
                  const tst = toast.loading("Holding up your listing");
                  try {
                    const lo = { ...theListing };
                    lo.heldUp = !lo.heldUp;
                    await api.put(`/listings/${listingId}`, {
                      ...lo,
                    });
                    setRefresh((prev) => !prev);
                    toast.success("Your listing has been held up");
                  } catch (err) {
                    toast.error(
                      err?.response?.data?.message ||
                        err?.response?.data ||
                        err?.message ||
                        "Something went wrong",
                    );
                  } finally {
                    toast.dismiss(tst);
                  }
                }}
              >
                {theListing?.heldUp ? "Release" : "Hold Up"}
              </button>
              <Link
                to={"edit"}
                className="btn btn-small border-success themetxt"
              >
                Edit Listing
              </Link>
              <Link
                onClick={async () => {
                  if (
                    !(
                      confirm("Do You want to delete this listing?") &&
                      confirm("This action cannot be undone")
                    )
                  ) {
                    return;
                  }
                  const tst = toast.loading("Deleting your listing");
                  try {
                    await api.delete("/listings/" + listingId);
                    toast.success("Your listing has been deleted");
                    navigate("/auth/user-profile");
                  } catch (err) {
                    toast.error(
                      err?.response?.data?.message ||
                        err?.response?.data ||
                        err?.message ||
                        "Failed to delete listing",
                    );
                  } finally {
                    toast.dismiss(tst);
                  }
                }}
                className="btn text-danger border border-danger"
              >
                Delete Lising
              </Link>
            </div>
            {/* External link */}
            {theListing.externalUrl && (
              <a
                href={theListing.externalUrl}
                className="btn btn-outline-success mt-3 btn-small small p-1 px-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {theListing.externalUrl.replace("https://", "")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListing;
