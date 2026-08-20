import React, { useEffect } from "react";
import Delay from "../components/Delay";
import { LazyLoadImage } from "react-lazy-load-image-component";
import media, { greenhouseCards } from "../media";
import { useStateContext } from "../state/StateContext";

const GreenHouseProject = () => {
  const { setTitle } = useStateContext();

  useEffect(() => {
    scroll({ top: 0 });
    setTitle("Some  Other Project");
  }, []);

  return (
    <section id="services" className="py-5 pt-3 section services">
      <div className="container">
        <div className="mb-4 px-md-5">
          <h2 className="h2 heading mb-4 slideUp">Some Other Project</h2>

          <Delay delay={120}>
            <div className="slideUp">
              Landhome Farm, nestled in the heart of Nigeria, has embarked on an
              innovative greenhouse project aimed at revolutionizing agriculture
              in the region. This ambitious initiative combines traditional
              farming practices with cutting-edge technology to create a
              sustainable and efficient growing environment. The greenhouse
              project encompasses a range of structures equipped with climate
              control systems, irrigation methods, and nutrient delivery systems
              to optimize plant growth and maximize yield.
            </div>
          </Delay>

          <div className="row mt-3">
            <div className="col-md-6">
              <div className="pe-md-2">
                <Delay delay={500}>
                  <div className="slideUp">
                    By harnessing natural sunlight and regulating temperature
                    and humidity levels, these greenhouses provide an ideal
                    environment for cultivating a variety of crops year-round,
                    regardless of external weather conditions. From tomatoes and
                    peppers to cucumbers and leafy greens, Landhome’s greenhouse
                    project diversifies crop production and ensures a consistent
                    and reliable food supply for local communities.
                    <div className="mt-3"></div>
                    Moreover, the greenhouse project at Landhome Farm is not
                    only about increasing agricultural productivity but also
                    about promoting environmental sustainability. By utilizing
                    advanced irrigation techniques such as drip irrigation and
                    capturing rainwater for reuse, the project minimizes water
                    waste and reduces reliance on traditional irrigation
                    methods.
                  </div>
                </Delay>
                <br />
                <Delay delay={600}>
                  <div className="">
                    <LazyLoadImage
                      effect="opacity"
                      className="img-fluid acbg rounded shadow"
                      placeholderSrc="/images/default.png"
                      src={media.greenHouseProject1}
                      alt=""
                    />
                  </div>
                </Delay>
                <br />
              </div>
            </div>
            <div className="col-md-6">
              <div className="ps-md-2">
                <Delay delay={750}>
                  <div className="mb-3 slideUp">
                    <LazyLoadImage
                      effect="opacity"
                      className="img-fluid acbg rounded shadow"
                      placeholderSrc="/images/default.png"
                      src={media.greenHouseProject2}
                      alt=""
                    />
                  </div>
                </Delay>
                <br />
                <Delay delay={800}>
                  <div className="slideUp">
                    Additionally, integrated pest management strategies and
                    organic farming practices are employed to minimize the use
                    of pesticides and herbicides, ensuring that crops are grown
                    in a healthy and eco-friendly manner. This commitment to
                    sustainability extends beyond production methods to include
                    energy-efficient technologies and waste management
                    practices, further reducing the farm’s carbon footprint and
                    environmental impact.
                    <div className="mt-3"></div>
                    Furthermore, the greenhouse project at Landhome Farm
                    represents a significant investment in the local economy,
                    creating jobs, and stimulating economic growth in the
                    region. Through training and employment opportunities, local
                    residents are empowered to participate in the agricultural
                    sector and contribute to the success of the greenhouse
                    project.
                  </div>
                </Delay>
              </div>
            </div>
          </div>

          <div className="mt-3">
            Additionally, by producing high-quality crops year-round, Landhome
            enhances food security and reduces reliance on imported goods,
            strengthening Nigeria’s agricultural sector and fostering
            self-sufficiency. As a result, the greenhouse project at Landhome
            Farm not only transforms the agricultural landscape but also serves
            as a model for sustainable development and economic empowerment in
            Nigeria and beyond.
          </div>
          <div className="mt-3">
            The greenhouse project at Landhome Farm in Nigeria offers numerous
            advantages to farm production, contributing to agricultural
            sustainability, productivity, and economic development:
          </div>

          <div className="row">
            {greenhouseCards.map((data, i) => (
              <Delay delay={(i + 1) * 100}>
                <div
                  className="col-12 col-md-6 col-xl-4 mt-4 slideUp"
                  key={data.title}
                >
                  <div className={`hovShade shadow h-100`}>
                    <h4 className="h4 mb-2">{data.title}</h4>
                    <p>{data.body}</p>
                  </div>
                </div>
              </Delay>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenHouseProject;
