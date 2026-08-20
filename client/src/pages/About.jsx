import React, { useEffect } from "react";
import Delay from "../components/Delay";
import { LazyLoadImage } from "react-lazy-load-image-component";
import media from "../media";
import { useStateContext } from "../state/StateContext";

const About = () => {
  const { setTitle } = useStateContext();

  useEffect(() => {
    scroll({ top: 0 });
    document.title = "About Us - laho";
  }, []);

  return (
    <section id="about" className="py-5 pt-3 section services">
      <div className="container">
        <div className="mb-4 px-md-5">
          <h2 className="h2 heading mb-4 slideUp">About Us</h2>
          <div className="row">
            <Delay delay={150}>
              <div className="px-md-3 pb-3 slideUp">
                laho was founded with a simple but ambitious idea to redefine
                how people discover and buy anything in a fast-changing digital
                era. From homes and land to everyday essentials and unique
                finds, the buying process should be simpler, smarter, and more
                transparent for everyone. We are here to change that.
              </div>
            </Delay>

            <div className="col-md-6">
              <div className="pe-md-2">
                <Delay delay={500}>
                  <div className="slideUp">
                    <h4 className="fw-bold mb-3">Our Vision</h4>
                    <p>
                      To become the most trusted and accessible digital
                      marketplace for everyday buying and selling, empowering
                      individuals and communities to confidently discover and
                      buy anything they need with ease. Our vision is centered
                      on breaking barriers to access and making commerce more
                      transparent, inclusive, and convenient for all.
                    </p>
                    <p>
                      Through innovation, we create opportunities for both
                      first-time buyers and seasoned investors, strengthening
                      communities and making it easier to connect buyers with
                      the right opportunities.
                    </p>
                  </div>
                </Delay>
                <br />
                <Delay delay={800}>
                  <div className="slideUp">
                    <LazyLoadImage
                      effect="opacity"
                      className="img-fluid acbg rounded shadow"
                      placeholderSrc="/images/deal.png"
                      src={"/images/default.png"}
                      alt="laho Vision"
                    />
                  </div>
                </Delay>
              </div>
            </div>

            <div className="col-md-6">
              <div className="ps-md-2">
                <Delay>
                  <div className="slideUp">
                    <h4 className="fw-bold mb-3">Our Mission</h4>
                    <p>
                      Our mission is to simplify everyday transactions by
                      building a transparent, user-friendly platform where
                      people can list and discover all kinds of assets, from
                      homes and land to vehicles, equipment, and other
                      essentials. Every interaction is designed to foster trust,
                      affordability, and confidence in the buying process.
                    </p>
                    <Delay delay={600}>
                      <div className="mb-3 slideUp">
                        <LazyLoadImage
                          effect="opacity"
                          className="img-fluid acbg rounded shadow"
                          placeholderSrc="/images/default.png"
                          src={"/images/default.png"}
                          alt="laho Mission"
                        />
                      </div>
                    </Delay>

                    <Delay delay={800}>
                      <p>
                        We are committed to leveraging technology to remove
                        unnecessary middlemen, reduce costs, and create a level
                        playing field for both seasoned investors and first-time
                        buyers. Every feature on our platform is designed with
                        one goal in mind: to give users confidence, clarity, and
                        control in their property journey.
                      </p>
                    </Delay>
                  </div>
                </Delay>
                <br />
              </div>
            </div>

            <div className="col-12 mt-4">
              <Delay delay={1000}>
                <div className="slideUp">
                  <h4 className="fw-bold mb-3">Our Commitment</h4>
                  <p>
                    At laho, our commitment goes beyond transactions. We believe
                    in building stronger communities by making buying and
                    selling simpler and more accessible for everyone.
                    Transparency, integrity, and innovation guide every decision
                    we make, from how we design our platform to how we support
                    our users. Whether you are searching for a first home, a
                    vehicle, equipment, or a new opportunity, we are here to
                    make the process seamless and trustworthy.
                  </p>
                  <p>
                    Welcome to laho where opportunities meet trust, and the
                    future of commerce becomes simpler, smarter, and more
                    accessible for all.
                  </p>
                </div>
              </Delay>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
