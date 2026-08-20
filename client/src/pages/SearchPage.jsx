import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../../axios/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaInfoCircle, FaSpinner, FaStar, FaSync } from "react-icons/fa";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Extract query parameters
  const state = searchParams.get("state") || "";
  const verified = searchParams.get("verified") === "true";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "relevance:desc";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/listings/query", {
        params: {
          state,
          verified,
          minPrice,
          maxPrice,
          q,
          sort,
          page,
          limit,
        },
      });
      setListings(res.data.results);
      setTotalResults(res.data.total);
      document.title = `${res.data.total} listings for "${q}" - laho`;
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [state, verified, minPrice, maxPrice, q, sort, page, limit]);

  useEffect(() => {
    scroll({ top: 0, behavior: "smooth" });
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchParams((prev) => {
      if (type === "checkbox") {
        prev.set(name, checked);
      } else {
        prev.set(name, value);
      }
      // Reset to page 1 when filters change
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  };

  const handleRefresh = () => {
    fetchData();
  };

  const totalPages = Math.ceil(totalResults / limit);

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  return (
    <div className="bg-white text-dark">
      <div className="container py-4">
        {/* Navbar */}
        <nav className="navbar text-dark rounded px-2 shadow navbar-light bg-light mb-4">
          <div className="d-flex w-100">
            <div className="navbar-brand">Search Filters</div>
            <button
              className="btn ms-auto themebg text-light"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle Filters"
            >
              Filters
            </button>
            <button
              className="btn btn-outline-secondary themetxt border-success ms-2"
              onClick={handleRefresh}
              aria-label="Refresh"
            >
              <FaSync />
            </button>
          </div>
          {/* Search box always visible */}
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Search"
            name="q"
            value={q}
            onChange={handleFilterChange}
          />
        </nav>

        {/* Collapsible Filters */}
        {showFilters && (
          <div className="bg-light p-3 rounded shadow-lg mb-4 slideIn">
            <div className="row">
              <div className="col-md-4 mb-2">
                <select
                  className="form-select"
                  name="state"
                  value={state}
                  onChange={handleFilterChange}
                >
                  <option value="">All States</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="verified"
                    checked={verified}
                    onChange={handleFilterChange}
                    id="verifiedCheck"
                  />
                  <label className="form-check-label" htmlFor="verifiedCheck">
                    Verified
                  </label>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min Price"
                  name="minPrice"
                  value={minPrice}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-4 mb-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max Price"
                  name="maxPrice"
                  value={maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-4 mb-2">
                <select
                  className="form-select"
                  name="sort"
                  value={sort}
                  onChange={handleFilterChange}
                >
                  <option value="relevance:desc">Relevance</option>
                  <option value="price:asc">Price: Low to High</option>
                  <option value="price:desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Listings Display */}
        {loading ? (
          <div className="text-center text-dark py-5">
            <FaSpinner className="spinner fs-2" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            <div className="row">
              {listings.map((listing) => (
                <div key={listing.id} className="col-12 col-sm-6 col-md-4 mb-4">
                  <Link
                    to={`/listed/${listing.id}`}
                    className="card no-dec hovShade shadow rounded d-flex flex-column"
                  >
                    {listing.heldUp && !listing.sold && (
                      <button
                        className="mb-1 btn text-light small themebg"
                        style={{
                          fontSize: ".7em",
                          position: "absolute",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info(
                            "This is probably because " +
                              `${
                                theUser.name
                              } has been contacted over the listing, you can still contact ${
                                theUser?.gender == "male" ? "him" : "her"
                              } as the listing has not been sold out`,
                          );
                        }}
                      >
                        <FaInfoCircle className="icon" /> This Listing has been
                        held up by the owner
                      </button>
                    )}
                    <div className="w-100 row px-0 g-0 mx-auto">
                      {/* Add this div */}

                      {(() => {
                        const isImage = (
                          listing.images[0]?.type || ""
                        ).startsWith("image");
                        return isImage ? (
                          <LazyLoadImage
                            effect="opacity"
                            className="img-fluid  w-100  rounded col-12"
                            placeholderSrc="/images/default.png"
                            src={
                              listing.images[0]?.url || "/images/default.png"
                            }
                            style={{
                              height: "200px",
                              minHeight: "200px",
                              maxHeight: "200px",
                              objectFit: "cover",
                              minWidth: "100%",
                            }}
                            alt={listing.name}
                          />
                        ) : (
                          <>
                            <video
                              effect="opacity"
                              className="img-fluid  w-100  rounded col-12"
                              placeholderSrc="/images/default.png"
                              src={
                                listing.images[0]?.url || "/images/default.png"
                              }
                              style={{
                                height: "200px",
                                minHeight: "200px",
                                maxHeight: "200px",
                                objectFit: "cover",
                                minWidth: "100%",
                              }}
                              alt={listing.name}
                            />
                          </>
                        );
                      })()}
                    </div>
                    {/* Add this div */}
                    <div className="card-body">
                      <h5 className="card-title">{listing.name}</h5>
                      <p className="card-text">
                        {listing.reigion}, {listing.state}
                      </p>
                      <p className="card-text mb-0 themetxt fw-bold">
                        NGN {listing.price.toLocaleString()}
                      </p>
                      <div className="d-flex">
                        {listing.verified && (
                          <div
                            className="rounded small me-1 px-2 my-auto"
                            style={{
                              backgroundColor: "#D4AF37",
                              maxWidth: "fit-content",
                            }}
                          >
                            <FaStar
                              className="icon"
                              style={{
                                color: "#ffe479ff",
                              }}
                            />{" "}
                            Verified
                          </div>
                        )}
                        <div
                          className="rounded text-light small px-2 my-auto"
                          style={{
                            backgroundColor:
                              listing.type == "rental"
                                ? "#0056a7a4"
                                : "#3d8f1c",
                            maxWidth: "fit-content",
                          }}
                        >
                          {listing.type}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </button>
                </li>
                {/* Display up to 5 page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = Math.max(
                    1,
                    Math.min(page - 2 + i, totalPages),
                  );
                  return (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        page === pageNumber ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
