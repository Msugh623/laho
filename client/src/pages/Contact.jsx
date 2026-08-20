import React, { useEffect } from "react";
import { FaFacebook, FaLocationDot } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import Delay from "../components/Delay";
import { BsEnvelopeAtFill } from "react-icons/bs";
import { useStateContext } from "../state/StateContext";

const Contact = () => {
  const { setTitle } = useStateContext();

  useEffect(() => {
    scroll({ top: 0 });
    document.title = "Contact Us - laho";
  }, []);

  return (
    <section id="services" className="py-5 pt-3 section services">
      <div className="container">
        <div className="mb-4 px-md-5">
          <h2 className="h2 heading mb-2 mt-3 slideUp">Contact Us</h2>
          <Delay delay={100}>
            <div className="mb-4 fs-5 slideUp">
              Get in touch with us today, we are here to answer your questions
              and guide you on your property journey.
            </div>
          </Delay>
          <div className="row">
            <div className="col-md-6">
              <Delay delay={300}>
                <div className="mb-4 slideRight">
                  <h6>
                    <FaLocationDot className="icon" /> Address:
                  </h6>
                  <h5 className="mb-1">Joseph suarwan tarka University makurdi Benue state Nigeria.</h5>
                </div>
              </Delay>
              <Delay delay={500}>
                <div className="mb-2 slideRight ">
                  <h6 className="mb-1">
                    <GrContactInfo className="icon fs-4" /> Contact:
                  </h6>
                  <h5>
                    09048960601
                    <br />
                    <br />
                    ahiabuikeexcel@gmail.com
                    <br />
                  </h5>
                </div>
              </Delay>
              <div className="social-links slideUp text-dark">
                {/* <Delay inline={true} delay={600}>
                  <a
                    className="slideIn fs-4 me-2"
                    target="_blank"
                    href="https://web.facebook.com/kareleoodua/"
                  >
                    <FaFacebook />
                  </a>
                </Delay> */}
                <Delay inline={true} delay={1000}>
                  <a
                    className="slideRight fs-4"
                    target="_blank"
                    href="mailto: ahiabuikeexcel@gmail.com"
                  >
                    <BsEnvelopeAtFill />
                  </a>
                </Delay>
              </div>
            </div>
            <div className="col-md-6 ">
              <Delay delay={300} preRender={true}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1324.9489483656855!2d8.964534426982471!3d7.308800118606539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1758577442613!5m2!1sen!2sng"
                  className="shadow-lg"
                  width="100%"
                  height="300"
                  style={{}}
                  allowfullscreen=""
                  loading="lazy"
                  // eslint-disable-next-line react/no-unknown-property
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </Delay>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
