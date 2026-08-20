import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Main component containing the full search bar UI
export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const navigate=useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    const q = "?" + "q=" + searchText +"&"+ "state=" + selectedState
    navigate("/search"+q)
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center  p-4"
      style={{}}
    >
      {/* Inline CSS for animations */}

      <form
        className="p-4 rounded-4 shadow w-100 shadow-lg"
        style={{ maxWidth: "80rem", backgroundColor: "#56805257" }}
        onSubmit={handleSearch}
      >
        {/* Search Bar Section */}
        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
          {/* Text Input */}
          <div className="position-relative flex-grow-1 w-100 w-md-auto">
            <input
              type="text"
              className="form-control ps-5 pe-3 py-3 rounded-4 shadow-sm"
              placeholder="Search by Type, Location, Size..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary">
              {/* Inline SVG for Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>


          {/* Search Button */}
          <button
            className="btn themebg text-light w-100 w-md-auto px-4 py-3 fw-semibold rounded-4 shadow"
            type="button"
            style={{
              maxWidth: "100px",
            }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
