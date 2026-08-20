import React, { useEffect, useState } from "react";
import { BsEnvelopeAtFill } from "react-icons/bs";
import Nav from "../components/Nav";
import media, { homeProducts } from "../media";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useStateContext } from "../state/StateContext";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import Search from "../components/Search";
import { FaInfoCircle, FaStar } from "react-icons/fa";

const Home = () => {
  const { scrollData, listings } = useStateContext();

  useEffect(() => {
    document.title =
      "Sell, buy anything in a fast-changing digital marketplace - laho";
  }, []);

  return (
    <div className="index-page">
      <div className="fixed-top">
        {scrollData.y < 510 ? (
          <div className="slideIn">
            <Nav trans={true} hasBg={true} />
          </div>
        ) : (
          <Nav />
        )}
      </div>

      <main className="main">
        <section id="hero" className=" section dark-background my-0 py-0">
          {/* {true && (
            <LazyLoadImage
              effect="opacity"
              className="animate__animated fadeIn animate__slow"
              placeholderSrc="/images/default.png"
              src={"/images/hero.png"}
              alt=""
            />
          )} */}
          {/* {hero == media.heroBg2 && <LazyLoadImage effect='opacity' className='animate__animated fadeIn animate__slow' placeholderSrc='/images/default.png' src={media.heroBg2} alt="" />} */}

          <div className="container pt-5 pb-3" data-aos="zoom-out">
            <div className="ps-2 ps-md-3 ps-lg-0 ms-lg-0">
              <div className="row justify-content-center">
                <div className="col-lg-12 d-flex flex-column">
                  <h1 className="slideUp fw-bold mt-5 pt-5 h2 text-center">
                    Sell, buy anything in Nigeria
                  </h1>
                  <p className="fs-6 col-11 col-md-9 mx-auto">
                    <Delay delay={100}>
                      <div className="slideUp small text-center pt-2">
                        Your modern marketplace to sell, buy, and discover
                        homes, cars, gadgets, and more.
                        <br />
                        <br />
                      </div>
                    </Delay>
                    <Delay delay={200}>
                      <div className="slideUp">
                        <Search />
                      </div>
                    </Delay>
                  </p>
                  <div className="social-links mx-auto text-light slideUp">
                    {/* <Delay inline={true} delay={1500}>
                      <a
                        className="slideIn fs-5 ms-5"
                        target="_blank"
                        href="https://web.facebook.com/kareleoodua/"
                      >
                        <FaFacebook />
                      </a>
                    </Delay> */}
                    <Delay inline={true} delay={1900}>
                      <a
                        className="slideRight fs-5 ms-3"
                        target="_blank"
                        href="mailto:sirgbemziho@gmail.com"
                      >
                        <BsEnvelopeAtFill />
                      </a>
                    </Delay>
                  </div>
                  {/* <Delay inline={true} delay={3000}>
                      <div className="slideUp p-0 mt-3">
                          <StarredBar />
                      </div>
                  </Delay> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section id="services" className=" py-5 section services">
        {true && (
          <div
            className="container  py-0"
            style={{
              position: "relative",
              top: "-50px",
            }}
          >
            <div className="mt-5 px-md-5 mb-5">
              <div className=" row">
                {listings.map((listing) => (
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
                                      theUser?.gender == "male" ? "him" : "her"
                                    } as the listing has not been sold out`,
                                );
                              }}
                            >
                              <FaInfoCircle className="icon" /> This Listing has
                              been held up by the owner
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
                              <FaInfoCircle className="icon" /> This listing has
                              been sold out
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
                                listing.images[0]?.url || "/images/default.png"
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

                        <p className="small mb-0 text-muted">
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

            {/* <section className="section pb-0">
                            <InsiderPics />
                        </section> */}
          </div>
        )}
      </section>
      {/* <section className="pb-0 pt-0">
        <div className="custom-navmenu themebg text-light py-5">
          <div className="container">
            <h2 className="mt-5">Plan an Unforgettable Experience with Us</h2>
            We can help you fit your stay and experience within your allotted
            budget.
            <div className="mt-5">Book Your Stay Now</div>
            <div className="h1">+234 906 791 2440</div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default trackWindowScroll(Home);

const Delay = ({ delay, children, inline }) => {
  const [arch, setArch] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setArch(true);
    }, delay || 700);
  }, []);

  return arch ? (
    children
  ) : (
    <div className={inline ? "d-inline" : ""} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};
