import React, { useEffect } from "react";
import Delay from "../components/Delay";
import { LazyLoadImage } from "react-lazy-load-image-component";
import media from "../media";
import { useStateContext } from "../state/StateContext";

const About = () => {
  const { setTitle } = useStateContext();

  useEffect(() => {
    scroll({ top: 0 });
    document.title = "About Us - Landhome";
  }, []);

  return (
    <section id="about" className="py-5 pt-3 section services">
      <div className="container">
        <div className="mb-4 px-md-5">
          <h2 className="h2 heading mb-4 slideUp">About Us</h2>
          <div className="row">
            <Delay delay={150}>
              <div className="px-md-3 pb-3 slideUp">
                Landhome was founded with a simple but ambitious idea to
                redefine how people find, buy, and rent land and housing in a
                fast-changing digital era. Real estate is often the most
                important investment people make, and yet for many, the process
                remains complicated, expensive, and filled with uncertainty. We
                are here to change that.
              </div>
            </Delay>

            <div className="col-md-6">
              <div className="pe-md-2">
                <Delay delay={500}>
                  <div className="slideUp">
                    <h4 className="fw-bold mb-3">Our Vision</h4>
                    <p>
                      To become the most trusted and accessible digital
                      marketplace for land and housing, empowering individuals
                      and communities to confidently find, buy, and rent
                      properties with ease. Our vision is centered on breaking
                      barriers to property ownership and making the real estate
                      market transparent and inclusive for all.
                    </p>
                    <p>
                      Our vision is to break barriers to property ownership by
                      making real estate transparent, inclusive, and accessible.
                      Through innovation, we create opportunities for both
                      first-time buyers and investors, strengthening communities
                      and driving sustainable growth.
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
                      alt="Landhome Vision"
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
                      Our mission is to simplify property transactions by
                      building a transparent, user-friendly platform where
                      property owners can seamlessly list their lands and homes,
                      buyers and renters can connect directly, and every
                      interaction fosters trust, affordability, and sustainable
                      growth in the real estate sector.
                    </p>
                    <Delay delay={600}>
                      <div className="mb-3 slideUp">
                        <LazyLoadImage
                          effect="opacity"
                          className="img-fluid acbg rounded shadow"
                          placeholderSrc="/images/default.png"
                          src={"/images/default.png"}
                          alt="Landhome Mission"
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
                    At Landhome, our commitment goes beyond transactions. We
                    believe in building stronger communities by making land and
                    housing accessible to everyone. Transparency, integrity, and
                    innovation guide every decision we make, from how we design
                    our platform to how we support our users. Whether you are
                    searching for your first home, investing in land, or
                    securing a rental, we are here to make the process seamless
                    and trustworthy.
                  </p>
                  <p>
                    Welcome to Landhome where opportunities meet trust, and the
                    future of real estate becomes simpler, smarter, and more
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
