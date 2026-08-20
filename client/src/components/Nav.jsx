import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import media from "../media";
import { useStateContext } from "../state/StateContext";

const Nav = (props) => {
  const [hasPop, setHasPop] = useState(props.hasPop);
  const { user } = useStateContext();
  return (
    <div className={!props?.hov && "sticky-top"}>
      {hasPop && (
        <nav
          className="navbar text-light custom-navmenu themebg pt-0 growIn"
          onClick={() => setHasPop((prev) => !prev)}
        >
          <div className="container py-4 ">
            <div className="col-lg-4 mb-3 mb-md-0 small">
              We are committed to leveraging technology to remove unnecessary
              middlemen, reduce costs, and create a level playing field for both
              seasoned investors and first-time buyers.
            </div>
            <div className="ms-auto me-auto me-md-2">
              <Link
                to={"/search"}
                className="me-1 mb-1 mb-md-0 subnav-btn rounded btn"
                onClick={() => window.scroll({ top: 0 })}
              >
                Search for Housing & Land
              </Link>
              {/* <Link
                to={"/"}
                className="me-1 mb-1 mb-md-0 subnav-btn rounded btn"
              >
                Housing and Land near me
              </Link> */}
              <Link
                to={"/about-us"}
                className="me-1 mb-1 mb-md-0 subnav-btn rounded btn"
              >
                About Us
              </Link>
              <Link
                to={"/contact-us"}
                className="me-1 mb-1 mb-md-0 subnav-btn rounded btn"
              >
                Contact
              </Link>
              <Link
                to={user?.email ? "/auth/user-profile" : "/auth/login"}
                className={`me-1 mb-1 mb-md-0 subnav-btn rounded btn`}
              >
                {user?.email ? "Profile" : "Login"}
              </Link>
            </div>
          </div>
        </nav>
      )}
      <nav
        className={`navbar slideIn custom-navbar pt-0 ${
          !props.hasBg ? "bg-light" : "text-light dd"
        } shadow-sm`}
        style={{
          background: props?.trans && "#efefef20",
          color: props?.trans && "#efefef !important",
        }}
      >
        <div className="container py-2 pb-2 px-2">
          <h2 className="m-0">
            <Link
              to={"/"}
              className="d-flex no-dec "
              onClick={() => window.scroll({ top: 0 })}
            >
              <LazyLoadImage
                src={media.logoSm}
                effect="opacity"
                alt="Landhome Logo"
                about="Landhome Logo"
                height={props?.hasBg ? "50px" : "50px"}
                className="rounded my-auto"
              />
              <div className="ps-3">
                <div
                  className={`fs-5 ${props.hasBg ? "text-light" : "themetxt"}`}
                  style={{ position: "relative", top: "5px" }}
                >
                  Landhome
                </div>
                <div
                  className={`pt-2 ${
                    !props?.hasBg ? "text-dark" : "text-light"
                  }`}
                >
                  <div
                    style={{
                      fontSize: ".7rem",
                      maxWidth: window.innerWidth > 900 ? "30vw" : "50vw",
                    }}
                  >
                    Your sustainable solution for finding Housing & Land assets
                    in Nigeria
                  </div>
                </div>
              </div>
            </Link>
          </h2>
          {!hasPop && (
            <div className="ms-auto me-2 pt-1 d-none d-lg-block nav-links small">
              <Link
                to={"/search"}
                className={`me-1 rounded btn ${
                  props?.hasBg ? "text-light shadow-sm acbg" : "text-dark"
                }`}
                onClick={() => window.scroll({ top: 0 })}
              >
                Search for Housing & Land
              </Link>
              {/* <Link
                to={"/some-other-page"}
                className={`me-1 rounded btn ${
                  props?.hasBg ? "text-light shadow-sm acbg" : "text-dark"
                }`}
              >
                Housing and Land near me
              </Link> */}
              <Link
                to={"/about-us"}
                className={`me-1 rounded btn ${
                  props?.hasBg ? "text-light shadow-sm acbg" : "text-dark"
                }`}
              >
                About Us
              </Link>
              <Link
                to={"/contact-us"}
                className={`me-1 rounded btn ${
                  props?.hasBg ? "text-light shadow-sm acbg" : "text-dark"
                }`}
              >
                Contact
              </Link>
              <Link
                to={user?.email ? "/auth/user-profile" : "/auth/login"}
                className={`me-1 rounded btn ${
                  props?.hasBg ? "text-light shadow-sm acbg" : "text-dark"
                }`}
              >
                <div className="d-flex fs-6">
                  <span className="my-auto small">
                    {user?.email ? "Profile" : "Login"}
                  </span>
                  {user?.email && (
                    <img
                      src={"" + user.profileicon}
                      alt=""
                      className="rounded-circle ms-2 my-auto"
                      style={{
                        width: "20px",
                        height: "20px",
                        position: "relative",
                        bottom: "",
                      }}
                    />
                  )}
                </div>
              </Link>
            </div>
          )}
          <a
            className={`burger ${hasPop && "active"} ${
              props?.hasBg && "text-light"
            } d-lg-none`}
            data-bs-toggle="collapse"
            data-bs-target="#main-navbar"
            onClick={() => {
              setHasPop((prev) => !prev);
            }}
          >
            <span></span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
