import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import api from "../../../axios/api";
import { BiErrorCircle } from "react-icons/bi";
import { toast } from "material-react-toastify";

const FinishVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await api.post("/auth/profile/verification/finish");
        setIsLoading("success");
        setTimeout(() => {
          location.href = location.origin + "/auth/user-profile";
        }, 3000);
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            err?.response?.data ||
            err?.message ||
            "Something went wrong"
        );

        setIsLoading("error");
      }
    })();
  }, [refresh]);
  return (
    <div className="d-flex m-5 p-5">
      <h1 className="m-auto themetxt">
        {isLoading == true ? (
          <FaSpinner className="spinner" />
        ) : isLoading == "success" ? (
          <>
            <FaCheckCircle className="slideUp" />
          </>
        ) : (
          <>
            <div className="d-flex flex-column">
              <div className="mx-auto text-danger slideUp">
                <BiErrorCircle /> Something went wrong
              </div>
              <div className="mx-auto mt-1">
                <button
                  className="btn-primary btn"
                  onClick={() => setRefresh((prev) => !prev)}
                >
                  Retry
                </button>
              </div>
            </div>
          </>
        )}
      </h1>
    </div>
  );
};

export default FinishVerification;
