import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaUserCheck, FaList, FaShieldAlt } from "react-icons/fa";
import api from "../../../axios/api";

const AdminIndex = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    verifiedUserCount: 0,
    listingCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 bg-white text-dark">
      <h3 className="fw-bold mb-4 ">Admin Dashboard</h3>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="p-3 rounded themebg text-light shadow-sm d-flex align-items-center">
            <FaUsers size={28} className="me-3 text-warning" />
            <div>
              <h5 className="mb-0">{stats.userCount}</h5>
              <small>Total Users</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 rounded themebg text-light shadow-sm d-flex align-items-center">
            <FaUserCheck size={28} className="me-3 text-warning" />
            <div>
              <h5 className="mb-0">{stats.verifiedUserCount}</h5>
              <small>Verified Users</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 rounded themebg text-light shadow-sm d-flex align-items-center">
            <FaList size={28} className="me-3 text-warning" />
            <div>
              <h5 className="mb-0">{stats.listingCount}</h5>
              <small>Total Listings</small>
            </div>
          </div>
        </div>
      </div>

      {/* Verification management link */}
      <div className="mt-5">
        <Link
          to="/sys/admin/verifications"
          className="px-4 py-2 rounded themebg text-light text-decoration-none shadow-sm d-inline-flex align-items-center"
        >
          <FaShieldAlt className="me-2 text-warning" /> Manage Verifications
        </Link>
      </div>
    </div>
  );
};

export default AdminIndex;
