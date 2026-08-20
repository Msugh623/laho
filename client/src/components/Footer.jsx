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
                      <h3>Landhome</h3>
                      <p>
                        We are committed to leveraging technology to remove
                        unnecessary middlemen, reduce costs, and create a level
                        playing field for both seasoned investors and first-time
                        buyers.
                      </p>
                      <p>
                        <div className="fs-5 mb-2">
                          <FaLocationDot className="icon " /> Address
                        </div>
                        Plot 40, Beside Devine Progressive College Gboko West
                        along Gboko college of Education way, Gboko West Benue
                        state, Nigeria.
                      </p>
                    </div>
                    <div className="col-md-6 px-md-5">
                      <h4>Contacts</h4>

                      <div
                        onClick={() => {
                          navigator.clipboard.writeText("+234 906 791 2440");
                        }}
                      >
                        <div>Phone:</div>
                        +234 906 791 2440
                      </div>

                      <div className="text-light mt-3">
                        <div>Email:</div>
                        <a href="mailto:sirgbemziho@gmail.com">
                          sirgbemziho@gmail.com
                        </a>
                        <br />
                        <a href="mailto:sirgbemziho@gmail.com">
                          sirgbemziho@gmail.com
                        </a>
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
                  Search for Housing & Land
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
        <div className="credits container text-center">
          Designed by and developed by{" "}
          <a className="text-light" href="https://github.com/msugh623">
            Ernest Chia
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
