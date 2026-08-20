import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";
import api from "../../../axios/api";

const levels = ["Basic", "Location", "Meta", "Media"];

const EditListing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deselectedIds, setDeselectedIds] = useState([]);
  const [theLevel, setTheLevel] = useState(levels[0]);
  const [transition, setTransition] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/listings/${listingId}`);
        setForm(res.data);
        setSelectedIds(res.data.images?.map((img) => img.id) || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "verified") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name.startsWith("meta.")) {
      setForm((prev) => ({
        ...prev,
        meta: { ...prev.meta, [name.split(".")[1]]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setMediaFiles([...e.target.files]);
  };

  const toggleImageSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      setDeselectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => [...prev, id]);
      setDeselectedIds((prev) => prev.filter((x) => x !== id));
    }
  };

  function handleNext() {
    setTransition("next");
    setTheLevel(
      (prev) => levels[Math.min(levels.indexOf(prev) + 1, levels.length - 1)]
    );
    setTimeout(() => setTransition(""), 400);
  }

  function handlePrev() {
    setTransition("prev");
    setTheLevel((prev) => levels[Math.max(levels.indexOf(prev) - 1, 0)]);
    setTimeout(() => setTransition(""), 400);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tst = toast.loading("Updating listing...");

      let newImages = [];
      if (mediaFiles.length > 0) {
        const formData = new FormData();
        mediaFiles.forEach((file) => formData.append("media", file));
        const uploadRes = await api.post("/files/many", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        newImages = uploadRes.data.map((img) => ({
          url: img.url,
          id: img.id,
          type: img.type,
        }));
      }

      const mergedImages = [
        ...(form.images?.filter((img) => selectedIds.includes(img.id)) || []),
        ...newImages,
      ];

      await api.put(`/listings/${listingId}`, {
        ...form,
        price: Number(form.price) || 0,
        reach: Number(form.reach) || 0,
        images: mergedImages,
      });

      toast.dismiss(tst);
      toast.success("Listing updated successfully!");
      navigate("/auth/user-profile/listed/" + listingId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update listing");
    } finally {
      setLoading(false);
      toast.dismiss(tst);
    }
  };

  if (loading && !form)
    return <div className="text-center bg-white text-dark p-3">Loading...</div>;
  if (!form) return null;

  const levelDom = {
    Basic: (
      <div className={transition === "prev" ? "slideRight" : ""}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            className="form-control"
            rows={3}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            name="tags"
            value={form.tags || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
    ),
    Location: (
      <div className={transition === "prev" ? "slideRight" : "slideLeft"}>
        <div className="mb-3">
          <label className="form-label">Region</label>
          <input
            name="reigion"
            value={form.reigion || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <select
            className="form-select"
            name="state"
            value={form.state || ""}
            onChange={handleChange}
          >
            <option value="">All States</option>
            {states().map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            name="country"
            value={form.country || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
    ),
    Meta: (
      <div className={transition === "prev" ? "slideRight" : "slideLeft"}>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="sale">Sale</option>
            <option value="rental">Rental</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            name="price"
            type="number"
            value={form.price || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">External URL</label>
          <input
            name="externalUrl"
            value={form.externalUrl || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Meta Size</label>
          <input
            name="meta.size"
            value={form.meta?.size || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
    ),
    Media: (
      <div className={transition === "prev" ? "slideRight" : "slideLeft"}>
        {/* Existing images/videos */}
        {form.images?.length > 0 && (
          <div className="mb-2 d-flex flex-wrap gap-2">
            {form.images.map((file) => {
              const fileType = file.type.startsWith("image/")
                ? "image"
                : "video";
              const isSelected = selectedIds.includes(file.id);
              return (
                <div
                  key={file.id}
                  onClick={() => toggleImageSelect(file.id)}
                  style={{
                    border: isSelected
                      ? "2px solid green"
                      : "2px solid transparent",
                    opacity: deselectedIds.includes(file.id) ? 0.4 : 1,
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  {fileType === "image" ? (
                    <img
                      src={file.url}
                      alt="Preview"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    <video
                      src={file.url}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                      controls
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* New uploads */}
        <div className="mb-3">
          <label className="form-label">Add Media</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          {mediaFiles.length > 0 && (
            <div className="mt-2 d-flex flex-wrap gap-2">
              {Array.from(mediaFiles).map((file, idx) => {
                const fileType = file.type.startsWith("image/")
                  ? "image"
                  : "video";
                return (
                  <div key={idx}>
                    {fileType === "image" ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="New Preview"
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                        controls
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    ),
  };

  return (
    <div className="bg-light text-dark pb-5">
      <div className="container pt-5 darkTheme">
        <div className="row">
          <form
            onSubmit={handleSubmit}
            className="col-11 col-sm-9 ani col-md-7 col-lg-6 px-3 shadow-lg panel rounded mx-auto slideUp"
            style={{
              height: "fit-content",
              transition: "all 0.3s",
            }}
          >
            <div className="d-flex flex-column">
              <h3 className="m-auto fs-4 mt-3 d-flex mb-2">Edit listing</h3>
              <div className="small text-center mb-3">
                Update your property listing information
              </div>
            </div>

            <div
              className={`mb-2 rounded border-success text-dark border px-2 me-auto ${
                transition === "prev"
                  ? "slideRight"
                  : transition === "next"
                  ? "slideLeft"
                  : ""
              }`}
              key={theLevel}
            >
              {theLevel} Information
            </div>

            {levelDom[theLevel]}

            <div className="py-2 d-flex">
              <div className="ms-auto d-flex" style={{ maxWidth: "50px" }}>
                {levels.map((l) => (
                  <div
                    className="themebg ani"
                    key={l}
                    style={{
                      minWidth: "6px",
                      width: theLevel === l ? "16px" : "6px",
                      height: "6px",
                      margin: "auto 2px",
                      borderRadius: "10px",
                    }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="d-flex">
              {theLevel !== levels[0] && (
                <div
                  type="button"
                  aria-live="polite"
                  className="btn mb-4 themebg text-light"
                  onClick={handlePrev}
                >
                  Back
                </div>
              )}
              {theLevel === levels[levels.length - 1] ? (
                <button className="btn mb-4 ms-auto themebg text-light">
                  Update Listing
                </button>
              ) : (
                <div
                  className="btn mb-4 ms-auto themebg text-light"
                  onClick={handleNext}
                >
                  Next
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditListing;

function states() {
  return [
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
}
