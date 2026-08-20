import React, { useState } from "react";
import { toast } from "material-react-toastify";
import api from "../../../axios/api";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaCheck,
  FaStar,
  FaCheckCircle,
  FaFileUpload,
} from "react-icons/fa";
import { useStateContext } from "../../state/StateContext";
import { useEffect } from "react";

const initialState = {
  nin: "",
  address: "",
  images: [],
};

const levels = ["Get Verified", "Identification", "Documents"];

const levelEssentials = {
  "Get Verified": [],
  Identification: ["nin", "address"],
  Documents: ["idCard"],
};

const GetVerified = () => {
  const [form, setForm] = useState(initialState);
  const [theLevel, setTheLevel] = useState(levels[0]);
  const [idCard, setIdCard] = useState(null);
  const [cacDoc, setCacDoc] = useState(null);
  const [utilityBill, setUtilityBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    const currentEssentials = levelEssentials[theLevel];
    for (const field of currentEssentials) {
      if (field === "idCard" && !idCard) {
        return toast.warning("Please upload your ID Card to proceed.");
      }
      if (form[field] === "" || form[field] === null) {
        return toast.warning(`Please fill in your ${field} to proceed.`);
      }
    }
    document.action = "next";
    const nextLevelIndex = levels.indexOf(theLevel) + 1;
    setTheLevel(levels[nextLevelIndex]);
  };

  const previousStep = () => {
    document.action = "prev";
    const prevLevelIndex = levels.indexOf(theLevel) - 1;
    setTheLevel(levels[prevLevelIndex]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (theLevel !== levels[levels.length - 1]) {
      return nextStep();
    }

    const tst = toast.loading("Submitting verification request...");
    setMsg("");
    setLoading(true);

    try {
      let images = [];
      const filesToUpload = [idCard, cacDoc, utilityBill].filter(Boolean);
      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach((file) => formData.append("media", file));
        const uploadRes = await api.post("/files/many", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        images = uploadRes.data.map((img) => ({
          url: img.url,
          id: img.id,
          type: img.type,
        }));
      }

      await api.post("/auth/profile/verification", {
        ...form,
        images,
      });

      setMsg("Verification submitted successfully!");
      setForm(initialState);
      setIdCard(null);
      setCacDoc(null);
      setUtilityBill(null);

      navigate("/auth/user-profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit verification. Please try again.");
    } finally {
      toast.dismiss(tst);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Get Verified, build customer trust - laho";
  }, []);

  const FileUploader = ({ label, file, setFile, required }) => {
    //     const [loFIle,setLoFile]=useState(null)
    return (
      <div className="position-relative">
        <label className="form-label text-start d-block mb-2 text-dark">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <div className="file-drop-zone border border-2 border-dashed rounded-3 p-4 text-center d-flex flex-column align-items-center justify-content-center">
          {file ? (
            <div className="d-flex flex-column align-items-center gap-2">
              <FaCheckCircle className="text-success" size={20} />
              <span className="badge rounded-pill bg-success fw-normal py-2 px-3">
                {file.name}
              </span>
              {
                //           <img
                //         src={URL.createObjectURL(file)}
                //         alt="preview"
                //         className="img-thumbnail mt-2"
                //         key={label}
                //         style={{ maxWidth: "120px", maxHeight: "120px" }}
                //         />
              }
            </div>
          ) : (
            <>
              <FaFileUpload className="text-secondary mb-2" size={32} />
              <p className="m-0 text-secondary">
                Drag and drop or{" "}
                <span className="text-primary fw-bold">click to upload</span>
              </p>
            </>
          )}
          <input
            type="file"
            className="file-input position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </div>
    );
  };

  const levelDom = {
    "Get Verified": (
      <div
        className={`ani ${
          document.action === "prev" ? "slideRight" : "slideLeft"
        }`}
      >
        <div className="d-flex justify-content-center mb-4">
          <div className="bg-warning-subtle rounded-circle p-3">
            <FaShieldAlt size={50} className="text-warning" />
          </div>
        </div>
        <h4 className="fw-bold mb-3 text-dark">Why get verified?</h4>
        <p className="text-secondary small">
          Verified users are <strong>more likely to close deals</strong> because
          people trust verified profiles. Stand out and boost your credibility
          instantly.
        </p>

        <div className="alert alert-warning d-flex flex-column align-items-center text-center  fw-semibold my-3 p-3 rounded-3">
          <FaStar className="text-warning mb-2" size={20} />
          <div>
            Verification costs just <span className="text-dark">₦5,000</span> —
            a small step for a big boost in trust.
          </div>
        </div>

        <ul className="list-unstyled text-start mb-4">
          <li className="d-flex align-items-center mb-2">
            <FaCheck className="text-success me-2" />
            <span className="text-dark">
              List and rent properties with confidence.
            </span>
          </li>
          <li className="d-flex align-items-center mb-2">
            <FaCheck className="text-success me-2" />
            <span className="text-dark">
              Gain the trust of potential partners and users.
            </span>
          </li>
          <li className="d-flex align-items-center mb-2">
            <FaCheck className="text-success me-2" />
            <span className="text-dark">Unlock premium account features.</span>
          </li>
        </ul>
      </div>
    ),
    Identification: (
      <div
        className={`ani ${
          document.action === "prev" ? "slideRight" : "slideLeft"
        }`}
      >
        <div className="mb-3">
          <label htmlFor="nin" className="form-label">
            National ID Number (NIN)
          </label>
          <input
            type="text"
            name="nin"
            value={form.nin}
            onChange={handleChange}
            className="form-control"
            id="nin"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Residential Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
            id="address"
            required
          />
        </div>
      </div>
    ),
    Documents: (
      <div
        className={`ani ${
          document.action === "prev" ? "slideRight" : "slideLeft"
        }`}
      >
        <div className="row g-4">
          <div className="col-12">
            <FileUploader
              label="Upload ID Card"
              file={idCard}
              setFile={setIdCard}
              required={true}
            />
          </div>
          <div className="col-12">
            <FileUploader
              label="Upload CAC Document"
              file={cacDoc}
              setFile={setCacDoc}
              required={true}
            />
          </div>
          <div className="col-12">
            <FileUploader
              label="Upload Utility Bill"
              file={utilityBill}
              setFile={setUtilityBill}
              required={true}
            />
          </div>
        </div>
      </div>
    ),
  };

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
                    <h3 className="fs-3 fw-bold m-0 text-dark">Get Verified</h3>
                  </div>
                  <div className="text-secondary small">
                    Unlock premium trust & visibility. Verified users can list
                    and rent properties with confidence.
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4" key={theLevel}>
                    {levelDom[theLevel]}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex flex-grow-1 me-3">
                      {levels.map((l, index) => (
                        <div
                          className={`progress-pill rounded-pill mx-1 ${
                            index <= levels.indexOf(theLevel)
                              ? "themebg"
                              : "bg-secondary"
                          } ani`}
                          style={{
                            height: "6px",
                            width: theLevel === l ? "13px" : "6px",
                            transition: "width 0.3s ease-in-out",
                          }}
                          key={l}
                        ></div>
                      ))}
                    </div>

                    <div className="d-flex gap-2">
                      {theLevel !== levels[0] && (
                        <div
                          className="btn btn-outline-success themetxt fw-bold cursor-pointer"
                          onClick={previousStep}
                        >
                          Back
                        </div>
                      )}
                      {theLevel !== levels[levels.length - 1] ? (
                        <div
                          className="btn themebg text-light fw-bold cursor-pointer"
                          onClick={nextStep}
                        >
                          {theLevel === levels[0] ? "Get Started" : "Next"}
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="btn themebg text-light fw-bold"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Submitting...
                            </>
                          ) : (
                            "Submit Verification"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </form>

                {msg && (
                  <div className="mt-3 alert alert-success text-center">
                    {msg}
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

export default GetVerified;
