import React, { useState } from "react";
import { toast } from "material-react-toastify";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaStar, FaFileAlt, FaTrash } from "react-icons/fa";
import api from "../../../axios/api";
import { useStateContext } from "../../state/StateContext";
import GetVerified from "./GetVerified";
import { useEffect } from "react";

const VerificationPage = () => {
  const { verification, setVerification, fetchSrc, setModal, user } =
    useStateContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!verification?.id) return;
    if (!window.confirm("Are you sure you want to delete this verification?"))
      return;

    try {
      setLoading(true);
      await api.delete(`/auth/profile/verification`);
      toast.success("Verification deleted successfully");
      setVerification(null); // clear state
      fetchSrc();
      navigate("/auth/user-profile");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data || err?.message || "Failed to delete verification"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCompletion = async () => {
    if (!verification?.id) return;
    if (
      !window.confirm(
        "You will pay a verification fee of N5000 to complete verification"
      )
    )
      return;

    try {
      setLoading(true);
      const checkout = await api.post(`/auth/profile/verification/complete`);
      const url = checkout.data.url;
      location.href = url;
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data || err?.message || "Failed to delete verification"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSrc();
    document.title = "Manage your Verification - Landhome";
  }, []);
  if (!verification?.id) {
    return <GetVerified />;
  }

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card shadow-lg rounded-4 border-0 ani slideUp">
              <div className="card-body p-4 p-md-5 text-center">
                <div className="d-flex flex-column align-items-center mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaStar className="text-warning" size={26} />
                    <h3 className="fs-3 fw-bold m-0 text-dark">
                      Your Verification
                    </h3>
                  </div>
                  <div className="text-secondary small">
                    Review your submitted verification request.
                  </div>
                </div>

                <div className="text-start">
                  <div className="mb-3">
                    <strong>NIN:</strong> {verification.nin || "—"}
                  </div>
                  <div className="mb-3">
                    <strong>Address:</strong> {verification.address || "—"}
                  </div>
                  <div className="mb-3">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-info text-dark">
                      {verification.status || "pending"}
                    </span>
                  </div>

                  <div className="mb-3">
                    <strong>Documents:</strong>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {verification.images?.map((img) => (
                        <div key={img.id} className="position-relative">
                          <img
                            src={img.url}
                            alt="doc"
                            className="rounded shadow-sm"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            onClick={() => {
                              setModal(
                                <img
                                  src={img.url}
                                  alt="doc"
                                  className="rounded shadow-sm"
                                  style={{
                                    objectFit: "cover",
                                  }}
                                />
                              );
                            }}
                          />
                          <FaFileAlt
                            className="position-absolute bottom-0 end-0 text-light bg-dark p-1 rounded-circle"
                            size={18}
                          />
                        </div>
                      ))}
                      {(!verification.images ||
                        verification.images.length === 0) && (
                        <span className="text-secondary">
                          No documents uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!user.verified && (
                  <div className="mt-4 small">
                    {verification.status !== "approved" && (
                      <button
                        className="btn btn-danger fw-bold d-flex align-items-center gap-2 mx-auto"
                        onClick={handleDelete}
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <>
                            <FaTrash /> Delete Verification
                          </>
                        )}
                      </button>
                    )}
                    {verification.status == "approved" && (
                      <button
                        className="btn btn-warning  fw-bold d-flex align-items-center gap-2 mx-auto"
                        onClick={handleCompletion}
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <>Complete Verification</>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {!user.verified ? (
                  <div className="alert alert-warning mt-4 d-flex align-items-center gap-2">
                    <FaShieldAlt className="text-warning" />
                    <span>
                      Your request cannot be edited. Please delete and resubmit
                      if needed.
                    </span>
                  </div>
                ) : (
                  <div className="alert alert-warning mt-4 d-flex align-items-center gap-2">
                    <FaShieldAlt className="text-warning fs-4" />
                    <span>You Landhome account is verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
