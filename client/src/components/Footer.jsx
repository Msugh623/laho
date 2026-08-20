import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="themebg">
      <footer id="footer">
        <div className="footer-top pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="footer-info">
                  <div className="row">
                    <div className="col-md-6">
                      <h3>laho</h3>
                      <p>
                        We make it easy to discover, compare, and buy the things
                        people need every day—from homes and land to vehicles,
                        gadgets, and other everyday essentials.
                      </p>
                      <p>
                        <div className="fs-5 mb-2">
                          <FaLocationDot className="icon " /> Address
                        </div>
                        Uniagric
                      </p>
                    </div>
                    <div className="col-md-6 px-md-5">
                      <h4>Contacts</h4>

                      <div
                        onClick={() => {
                          navigator.clipboard.writeText("8121667177");
                        }}
                      >
                        <div>Phone:</div>
                        8121667177
                      </div>

                      <div className="text-light mt-3">
                        <div>Email:</div>
                        <a href="mailto:team@sprintet.com">team@sprintet.com</a>
                      </div>
                      <br />
                    </div>
                  </div>
                  <div className="social-links mt-3">
                    {/* Social Links */}
                    /... /
                  </div>
                </div>
              </div>

              <div className="col-md-3 text-light">
                <h4>Quick Links</h4>
                <Link
                  to={"/search"}
                  className="d-block"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Search for Anything
                </Link>
                <Link
                  to={"/about-us"}
                  className="d-block"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  About Us
                </Link>
                <Link
                  to={"/contact-us"}
                  className="d-block"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright text-center mt-5">
            &copy; Copyright{" "}
            <strong>
              <span>Landsmart {new Date().getFullYear()} </span>
            </strong>
            in collaboration with{" "}
            <strong>
              <a
                className="text-light"
                href="https://sprintet.onrender.com/about"
              >
                SprintET
              </a>
            </strong>
            . All Rights Reserved
          </div>
        </div>
        {/* <div className="credits container text-center">
          Designed by and developed by{" "}
          <a className="text-light" href="https://github.com/msugh623">
            Ernest Chia
          </a>
        </div> */}
      </footer>
    </div>
  );
};

export default Footer;
