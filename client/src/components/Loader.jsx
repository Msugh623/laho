import React, { useEffect, useState } from "react";
// import { FaSpinner } from 'react-icons/fa'
import { LazyLoadImage } from "react-lazy-load-image-component";
import media from "../media";
import { FaSpinner } from "react-icons/fa6";

const Loader = () => {
  return (
    <div
      className="w-100"
      style={{
        position: "fixed",
        top: "35vh",
      }}
    >
      <div className="d-flex">
        <div className="mx-auto">
          <h1 className="ani text-center">
            <LazyLoadImage
              src={media.logoSm}
              effect="opacity"
              alt="laho Logo"
              about="laho Logo"
              height={"120px"}
              className="rounded slideIn"
            />

            <Delay delay={100}>
              <div className="slideUp mt-3">
                <Delay delay={300}>
                  <FaSpinner className="spinner icon growIn me-2" />
                </Delay>
                laho
              </div>
            </Delay>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;

const Delay = ({ delay, children }) => {
  const [arch, setArch] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setArch(true);
    }, delay);
  }, []);

  return arch ? children : "";
};
