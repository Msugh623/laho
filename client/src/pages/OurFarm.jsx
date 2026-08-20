import React, { useEffect, useState } from "react";
import { homeProducts } from "../media";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useStateContext } from "../state/StateContext";
import Delay from "../components/Delay";

const OurFarm = () => {
  const { setTitle } = useStateContext();
  const [center, setCenter] = useState("");

  useEffect(() => {
    scroll({ top: 0 });
    setTitle("Our Farm");
    setTimeout(() => {
      setCenter("center");
    }, 1000);
  }, []);

  return (
    <section id="services" className="py-5 pt-o section services">
      <div className="container">
        <div className="mb-4 px-md-5">
          <div className="mt-0 px-md-5">
            <h2 className="h2 heading mb-2 slideUp">
              <div className="mt-auto">Our Farm</div>
            </h2>
            <Delay delay={400}>
              <div className="slideUp">
                discover a diverse array of premium agricultural products,
                proudly grown and harvested with care on our innovative farms.
                From fresh vegetables bursting with flavor to succulent meats
                raised with ethical and sustainable practices, laho offers a
                bounty of wholesome goodness straight from the fields to your
                table.
              </div>
            </Delay>
            <Delay delay={600}>
              <div className={`justify-content-${center} row`}>
                {homeProducts.map((product, i) => (
                  <Delay delay={(i + 1) * 100}>
                    <div
                      className="col-12 col-md-6 col-xl-4 mt-4 slideUp"
                      key={product.image}
                    >
                      <div className={`hovShade shadow`}>
                        <LazyLoadImage
                          effect="opacity"
                          className="img-fluid acbg rounded shadow"
                          placeholderSrc="/images/default.png"
                          src={product.image}
                          alt=""
                        />
                        <h4 className="h4 mb-2">{product.name}</h4>
                        <p>{product.about}</p>
                        <Link
                          to={product.url}
                          className="readmore custom-navmenu mt-5 mt-md-0 text-light no-dec growIn"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </Delay>
                ))}
              </div>
            </Delay>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurFarm;
