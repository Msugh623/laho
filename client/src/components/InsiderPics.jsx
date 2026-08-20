import React, { useEffect, useState } from "react";
import { useStateContext } from "../state/StateContext";
import { insiderpics } from "../media";
import { LazyLoadImage } from "react-lazy-load-image-component";

const InsiderPics = () => {
  const { isLooking, setIsLooking, toPop } = useStateContext();
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    !isLooking && toPop == 0 ? setIsMoving("panRev") : setIsMoving("pan");
    setTimeout(() => {
      setIsMoving(false);
    }, 600);
  }, [toPop]);

  return (
    <section className="section pb-0 mb-3 pt-0">
      <div className="row justify-content-center text-center mb-4">
        <div className="col-md-5">
          <h3 className="h3 heading">Our Inside Pictures</h3>
          <div>
            Take a look at some pretty pictures captured in and around our
            premises.
          </div>
        </div>
      </div>
      <div
        className="container"
        onMouseEnter={() => setIsLooking(true)}
        onMouseLeave={() => setIsLooking(false)}
      >
        <div
          className="testimonials-slider swiper panContainer mb-0"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            id="marquee"
            className={`swiper-wrapper mb-0 d-flex ${isMoving}`}
          >
            {insiderpics.map((pic, i) => {
              return (
                <p
                  key={i + pic.image}
                  className={`col-sm-4 px-3 ani`}
                  style={{
                    minWidth: window.innerWidth > 700 ? "450px" : "320px",
                    maxWidth: "320px",
                  }}
                >
                  <InsiderPic
                    pic={pic}
                    glow={toPop !== i}
                    key={i + pic.image}
                    i={i}
                    insiderpics={insiderpics}
                  />
                </p>
              );
            })}
            {/* <div className="leftPanel"></div>
                        <div className="rightPanel"></div> */}
          </div>

          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default InsiderPics;

const InsiderPic = ({ pic, glow }) => {
  const { toPop } = useStateContext();

  useEffect(() => {
    const mk = document.getElementById("marquee");
    if (glow) {
      const diff = window.innerWidth > 700 ? 450 : 320;
      const val =
        window.innerWidth < 800
          ? window.innerWidth / 6
          : window.innerWidth < 1500
          ? window.innerWidth / 4
          : 420;
      mk.scroll({
        left: toPop * diff - (val < 90 ? 0 : val),
        behavior: "smooth",
      });
    }
  }, [toPop]);

  return (
    <div className="swiper-slide mb-5 p-sm-2" id={glow ? "current" : ""}>
      <div
        className={`testimonial-wrap shadow rounded p-0  ${
          glow ? "downCard" : "shadow-lev slidecard"
        }`}
      >
        <img
          effect="opacity"
          loading="eager"
          className="img-fluid acbg rounded shadow"
          placeholderSrc="/images/default.png"
          src={pic.image}
          alt=""
        />
      </div>
    </div>
  );
};
