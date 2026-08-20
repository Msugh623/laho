import React, { useEffect, useState, useMemo } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "material-react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../axios/api";

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`card shadow border-0 rounded-4 overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`card-body p-4 p-md-5 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses = "btn rounded-pill fw-bold";
  return (
    <button className={`${baseClasses} btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

const ITEMS_PER_PAGE = 9;

const Verifications = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("cards");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("pending");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/admin/verifications");
        setVerifications(data);
      } catch (err) {
        toast.error("Failed to fetch verifications");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabFiltered = useMemo(() => {
    return verifications.filter((v) => v.status === activeTab);
  }, [verifications, activeTab]);

  const filteredVerifications = useMemo(() => {
    return tabFiltered.filter(
      (v) =>
        (v.firstname || "").toLowerCase().includes(search.toLowerCase()) ||
        (v.lastname || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, tabFiltered]);

  const totalPages = Math.ceil(filteredVerifications.length / ITEMS_PER_PAGE);
  const paginatedVerifications = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredVerifications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVerifications, page]);

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/verifications/${id}/approve`);
      toast.success("Verification approved");
      setVerifications((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "approved" } : v))
      );
    } catch {
      toast.error("Error approving verification");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/admin/verifications/${id}/reject`);
      toast.success("Verification rejected");
      setVerifications((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "rejected" } : v))
      );
    } catch {
      toast.error("Error rejecting verification");
    }
  };

  const handleApproveAll = async () => {
    try {
      await api.put("/admin/verifications/approve-all");
      toast.success("All verifications approved");
      setVerifications((prev) =>
        prev.map((v) => ({ ...v, status: "approved" }))
      );
    } catch {
      for (let v of verifications) {
        if (v.status !== "approved") {
          await handleApprove(v.id);
        }
      }
    }
  };

  if (loading) return <p className="text-center mt-5 text-muted">Loading...</p>;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold text-dark">Verifications</h1>
        <div className="d-flex flex-wrap align-items-center gap-2 mt-3 mt-md-0">
          <div className="input-group me-2" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control rounded-pill border-0 shadow-sm"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Button
            variant={viewMode === "cards" ? "primary" : "outline-secondary"}
            onClick={() => setViewMode("cards")}
          >
            Cards
          </Button>
          <Button
            variant={viewMode === "table" ? "primary" : "outline-secondary"}
            onClick={() => setViewMode("table")}
          >
            Table
          </Button>
          {activeTab === "pending" && (
            <Button variant="success" onClick={handleApproveAll}>
              Approve All
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {["pending", "approved", "rejected"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${
                activeTab === tab ? "active fw-bold" : ""
              }`}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Main Content */}
      {viewMode === "cards" ? (
        <div className="row g-4">
          {paginatedVerifications.map((v) => (
            <div key={v.id} className="col-12 col-sm-6 col-lg-4">
              <Card
                role="button"
                onClick={() => navigate(`/sys/admin/verifications/${v.id}`)}
                className="cursor-pointer"
              >
                <CardContent>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={v.profileicon || "https://via.placeholder.com/150"}
                      alt={`${v.firstname} ${v.lastname}`}
                      className="rounded-circle mb-3 border border-3 border-white shadow-sm"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="fw-bold mb-1 text-dark">
                      {v.firstname} {v.lastname}
                    </h5>
                    <span
                      className={`badge rounded-pill text-capitalize ${
                        v.status === "approved"
                          ? "bg-success"
                          : v.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {v.status}
                    </span>
                    {v.status === "pending" && (
                      <div
                        className="d-flex gap-2 mt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="success"
                          className="btn-sm"
                          onClick={() => handleApprove(v.id)}
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => handleReject(v.id)}
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="table-responsive rounded-4 shadow-sm">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Profile</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                {activeTab === "pending" && (
                  <th className="text-end">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedVerifications.map((v) => (
                <tr
                  key={v.id}
                  role="button"
                  onClick={() => navigate(`/sys/admin/verifications/${v.id}`)}
                  className="cursor-pointer"
                >
                  <td>
                    <img
                      src={v.profileicon || "https://via.placeholder.com/150"}
                      alt={`${v.firstname} ${v.lastname}`}
                      className="rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{v.firstname}</td>
                  <td>{v.lastname}</td>
                  <td>
                    <span
                      className={`badge rounded-pill text-capitalize ${
                        v.status === "approved"
                          ? "bg-success"
                          : v.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  {activeTab === "pending" && (
                    <td
                      className="text-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="d-flex justify-content-end gap-2">
                        <Button
                          variant="success"
                          className="btn-sm"
                          onClick={() => handleApprove(v.id)}
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => handleReject(v.id)}
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <Button
          variant="outline-secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span className="text-muted">
          Page {page} of {totalPages || 1}
        </span>
        <Button
          variant="outline-secondary"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Verifications;
