import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../../axios/api";
import { useStateContext } from "../../state/StateContext";

const VerificationSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verification, setVerification] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setModal, setModalTitle } = useStateContext();

  useEffect(() => {
    const fetchVerification = async () => {
      try {
        const res = await api.get(`/admin/verifications/${id}`);
        setVerification(res.data);

        if (res.data?.uid) {
          const userRes = await api.get(`/users/${res.data.uid}`);
          setUser(userRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch verification:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, [id]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this verification request?"
      )
    )
      return;
    try {
      await api.delete(`/admin/verifications/${id}`);
      navigate("/sys/admin/verifications");
    } catch (err) {
      console.error("Failed to delete verification:", err);
    }
  };

  const handleEmail = () => {
    if (user?.email) {
      window.location.href = `mailto:${user.email}`;
    } else {
      alert("No email available for this user.");
    }
  };

  const handleApprove = async () => {
    try {
      await api.put(`/admin/verifications/${id}/approve`);
      navigate("/sys/admin/verifications");
    } catch (err) {
      console.error("Failed to approve:", err);
    }
  };

  const handleReject = async () => {
    try {
      await api.put(`/admin/verifications/${id}/reject`);
      navigate("/sys/admin/verifications");
    } catch (err) {
      console.error("Failed to reject:", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!verification) {
    return <div className="text-center mt-5">Verification not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header themebg text-white">
          <h3 className="mb-0">Verification Details</h3>
        </div>
        <div className="card-body">
          {/* Profile info */}
          <div className="text-center mb-4">
            <img
              src={verification.profileicon}
              alt="Profile"
              className="rounded-circle mb-3"
              width="120"
              height="120"
            />
            <h4>
              {verification.firstname} {verification.lastname}
            </h4>
            <p className="text-muted">Verification ID: {id}</p>
          </div>

          {/* Verification Info */}
          <div className="mb-4">
            <h5 className="fw-bold">Verification Information</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>NIN:</strong> {verification.nin || "N/A"}
              </li>
              <li className="list-group-item">
                <strong>Residence:</strong> {verification.address || "N/A"}
              </li>
              <li className="list-group-item">
                <strong>Uploaded Documents:</strong>
                <div className="d-flex flex-wrap gap-3 mt-2">
                  {verification.images?.length > 0 ? (
                    verification.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt={`doc-${idx}`}
                        className="border rounded"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                        onClick={() => {
                          setModal(
                            <img
                              key={idx}
                              src={img.url}
                              alt={`doc-${idx}`}
                              className="border rounded"
                              style={{
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          );
                          setModalTitle(
                            user?.firstname + "'s verification request document"
                          );
                        }}
                      />
                    ))
                  ) : (
                    <span className="text-muted ms-2">No documents</span>
                  )}
                </div>
              </li>
            </ul>
          </div>

          {/* User Info */}
          {user && (
            <div className="mb-4">
              <h5 className="fw-bold">User Information</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Username:</strong> {user.username}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {user.phone || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Role:</strong> {user.role || "User"}
                </li>
                <li className="list-group-item">
                  <strong>Joined:</strong>{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Unknown"}
                </li>
              </ul>
              <div className="mt-3">
                <Link
                  to={`/sys/admin/users/${user.id}`}
                  className="btn btn-outline-primary"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-success" onClick={handleApprove}>
              Approve
            </button>
            <button className="btn btn-danger" onClick={handleReject}>
              Reject
            </button>
            <button className="btn btn-primary" onClick={handleEmail}>
              Email User
            </button>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              Delete Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSingle;
