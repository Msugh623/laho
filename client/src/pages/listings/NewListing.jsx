import React, { useState } from "react";
import { toast } from "material-react-toastify";
import api from "../../../axios/api";
import { useNavigate } from "react-router-dom";

const levels = ["Basic", "Location", "Meta", "Media"];
const initialState = {
  name: "",
  description: "",
  tags: "",
  reigion: "",
  state: "",
  country: "Nigeria",
  images: [],
  address: "",
  price: "",
  upVotes: "",
  relevance: 0,
  verified: false,
  reach: 0,
  externalUrl: "",
  meta: { size: "0ft by 0ft" },
};

const NewListing = () => {
  const [form, setForm] = useState(initialState);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [theLevel, setTheLevel] = useState(levels[0]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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

  function handleNext() {
    document.action = "next";

    // scroll({ top: 0, behavior: "smooth" });
    setTheLevel(
      (prev) => levels[Math.min(levels.indexOf(prev) + 1, levels.length - 1)]
    );
    setTimeout(() => {
      document.action = "";
    }, 400);
  }

  function handlePrev() {
    document.action = "prev";
    setTheLevel((prev) => levels[Math.max(levels.indexOf(prev) - 1, 0)]);
    setTimeout(() => {
      document.action = "";
    }, 400);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return toast("Your request is processing... Please wait");
    }
    const tst = toast.loading("Creating your listing");
    setMsg("");
    setLoading(true);
    try {
      let images = [];
      if (mediaFiles.length > 0) {
        const formData = new FormData();
        mediaFiles.forEach((file) => formData.append("media", file));
        const uploadRes = await api.post("/files/many", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        images = uploadRes.data.map((img) => ({
          url: img.url,
          id: img.id,
          type: img.type,
        }));
      }
      const _ = await api.post("/listings", {
        ...form,
        price: Number(form.price),
        relevance: String(form.relevance),
        reach: Number(form.reach),
        images,
        upVotes: [],
        meta: { ...form.meta },
      });
      setMsg("Listing created successfully!");
      setForm(initialState);
      setMediaFiles([]);
      setTheLevel(levels[0]);
      navigate("/auth/user-profile/listed/" + _.data?.id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create listing");
    } finally {
      toast.dismiss(tst);
    }
    setLoading(false);
  };

  const levelDom = {
    Basic: (
      <div className={`${document.action == "prev" && "slideRight"}`}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows={3}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
    ),
    Location: (
      <div className={document.action == "prev" ? "slideRight" : "slideLeft"}>
        <div className="mb-3">
          <label className="form-label">Region</label>
          <input
            name="reigion"
            value={form.reigion}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <select
            className="form-select"
            name="state"
            value={form.state}
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
            value={form.country}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
    ),
    Media: (
      <div className={document.action == "prev" ? "slideRight" : "slideLeft"}>
        <div className="mb-3">
          <label className="form-label">Images/Videos</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>
        {mediaFiles.length > 0 && (
          <div className="mb-2 d-flex flex-wrap gap-2">
            {Array.from(mediaFiles).map((file, idx) => {
              const fileType = file.type.startsWith("image/")
                ? "image"
                : "video";
              return (
                <div key={idx}>
                  {fileType === "image" ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      style={{
                        minWidth: 80,
                        minHeight: 80,
                        maxWidth: 80,
                        maxHeight: 80,
                        borderRadius: 8,
                        objectFit: "cover", // Add objectFit
                      }}
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      alt="Video Preview"
                      style={{
                        minWidth: 80,
                        minHeight: 80,
                        maxWidth: 80,
                        maxHeight: 80,
                        borderRadius: 8,
                        objectFit: "cover", // Add objectFit
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
    ),
    Meta: (
      <div className={document.action == "prev" ? "slideRight" : "slideLeft"}>
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
            value={form.price}
            onChange={handleChange}
            className="form-control"
            type="number"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">External URL</label>
          <input
            name="externalUrl"
            value={form.externalUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Meta Size</label>
          <input
            name="meta.size"
            value={form.meta.size}
            onChange={handleChange}
            className="form-control"
          />
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
              transition: "all, 0.3s",
            }}
          >
            <div className="d-flex flex-column">
              <h3 className="m-auto fs-4 mt-3 d-flex mb-2">Create a listing</h3>
              <div className="small text-center mb-3 ">
                Put your property up for listing and be rest assured, it is in
                safe hands
              </div>
            </div>
            <div
              className={`mb-2 rounded border-success text-dark border px-2 me-auto ${
                document.action == "prev"
                  ? "slideRight"
                  : document.action == "next"
                  ? "slideLeft"
                  : ""
              }`}
              key={theLevel}
            >
              {theLevel} Information
            </div>
            {/* Form Inputs */}
            {levelDom[theLevel]}

            <div className="py-2 d-flex">
              <div className="">
                {/* You can add a link or info here if needed */}
              </div>
              <div
                className="ms-auto d-flex"
                style={{
                  maxWidth: "50px",
                }}
              >
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
                  Create Listing
                </button>
              ) : (
                <div
                  className="btn mb-4 ms-auto themebg text-light "
                  onClick={handleNext}
                >
                  Next
                </div>
              )}
            </div>
            {msg && <div className="mt-3 alert alert-info">{msg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewListing;

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
