import React, { useState, useRef } from "react";
import { toast } from "material-react-toastify";
import api from "../../../axios/api";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiHide, BiShow } from "react-icons/bi";
import { SafeUser } from "../../../../schemas/constructors";
import { useEffect } from "react";

const Signup = () => {
  const levels = ["Personal", "Contact", "Security"];
  const [data, setData] = useState(new SafeUser({}));
  const [profileFile, setProfileFile] = useState(null);
  const fileInputRef = useRef();
  const [theLevel, setTheLevel] = useState("Personal");
  const [showPass, setShowPass] = useState(false);
  const [showVrfPass, setVrfShowPass] = useState(false);

  const levelEssentials = {
    Personal: ["firstname", "lastname", "gender"],
    Contact: ["email", "phone"],
    Security: ["password"],
  };

  const handleInput = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleProfileFile = (e) => {
    setProfileFile(e.target.files[0]);
  };

  function next() {
    const testArr = [];
    for (let i = 0; i < levelEssentials[theLevel].length; i++) {
      testArr.push(Boolean(data[levelEssentials[theLevel][i]]));
    }
    if (testArr.indexOf(false) > -1) {
      return toast.warning(
        "Please fill in your " +
          levelEssentials[theLevel][testArr.indexOf(false)]
      );
    }
    setTheLevel(
      (prev) => levels[levels.indexOf(prev) + 1] || levels[levels.length - 1]
    );
    setTimeout(() => {
      document.action = "";
    }, 400);
  }

  function previous() {
    setTheLevel((prev) => levels[levels.indexOf(prev) - 1] || levels[0]);
    setTimeout(() => {
      document.action = "";
    }, 400);
  }
  const signup = async (e) => {
    e.preventDefault();
    if (document.action == "next") {
      return next();
    }
    if (document.action == "prev") {
      return previous();
    }
    document.action = "";
    const tst = toast.loading("Creating Account", {
      autoClose: false,
    });
    try {
      let profileiconUrl = data.profileicon;
      let iconData = {};
      if (profileFile) {
        const formData = new FormData();
        formData.append("media", profileFile);
        const uploadRes = await api.post("/files/single", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        iconData = uploadRes.data;
        profileiconUrl = uploadRes.data.url;
      }
      const userData = { ...data, profileicon: profileiconUrl, iconData };
      const cred = (await api.post("/auth/signup", userData))?.data;
      localStorage.access = cred.token;
      api.defaults.headers.common["Authorization"] = "Bearer " + cred.token;
      const rep = localStorage?.returnTo;
      localStorage.returnTo = "";
      location.replace(rep || "/");
    } catch (err) {
      toast.error(
        `${err?.response?.data?.message || err?.response?.data || err?.message}`
      );
    } finally {
      toast.dismiss(tst);
    }
  };
  
  useEffect(() => {
    setData((prev) => ({ ...prev, id: "" }));
  }, []);

  const levelDom = {
    Personal: (
      <div className={`${document.action == "prev" && "slideRight"}`}>
        <div className={`form-group row mb-3`}>
          <div className="form-group col-6">
            <input
              type="text"
              name="firstname"
              className="form-control border"
              onChange={handleInput}
              value={data.firstname}
              required
              placeholder="Firstname"
            />
          </div>
          <div className="form-group col-6">
            <input
              type="text"
              name="lastname"
              className="form-control border"
              onChange={handleInput}
              value={data.lastname}
              required
              placeholder="Lastname"
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <select
            name="gender"
            className="form-control border"
            onChange={handleInput}
            value={data.gender}
            required
            placeholder="Gender"
          >
            <option value="" className="d-none">
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label className="form-label text-dark">Profile Icon</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            ref={fileInputRef}
            required
            onChange={handleProfileFile}
          />
        </div>
        {profileFile && (
          <div className="mb-2">
            <img
              src={URL.createObjectURL(profileFile)}
              alt="Profile Preview"
              style={{ maxWidth: 80, maxHeight: 80, borderRadius: 8 }}
            />
          </div>
        )}
      </div>
    ),
    Contact: (
      <div className={document.action == "prev" ? "slideRight" : "slideLeft"}>
        <div className="form-group mb-3">
          <input
            type="email"
            name="email"
            className="form-control border"
            onChange={handleInput}
            value={data.email}
            required
            placeholder="Email"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            name="phone"
            className="form-control border"
            onChange={handleInput}
            value={data.phone}
            required
            placeholder="Phone"
          />
        </div>
        <div className="form-group mb-3">
          <textarea
            name="bio"
            className="form-control border"
            onChange={handleInput}
            value={data.bio}
            placeholder="Short Bio (optional)"
            rows={2}
          />
        </div>
      </div>
    ),
    Security: (
      <div className={document.action == "prev" ? "slideRight" : "slideLeft"}>
        <input
          type="email"
          name="email"
          className="form-control border"
          style={{
            maxWidth: "0px",
            maxHeight: "0px",
            position: "fixed",
            width: "0px",
            height: "0px",
            opacity: "0",
          }}
          onChange={handleInput}
          value={data.email}
          required
          placeholder="Email"
        />
        <div className="form-group mb-3 d-flex">
          <input
            type="password"
            name="password"
            title="Enter your desired password"
            id="pass"
            minLength={6}
            className="form-control border"
            onChange={handleInput}
            value={data.password}
            autoComplete="off"
            required
            placeholder="Enter Password"
          />
          <div
            className="border bg-none border-start-0 text-dark d-flex px-2"
            onClick={(e) => {
              e.preventDefault();
              setShowPass((prev) => !prev);
              const el = document.getElementById("pass");
              el.type == "password"
                ? (el.type = "text")
                : (el.type = "password");
              el.focus();
            }}
          >
            {!showPass ? (
              <BiHide className="m-auto" />
            ) : (
              <BiShow className="m-auto" />
            )}
          </div>
        </div>
        <div className="form-group d-flex">
          <input
            type="password"
            name="vrfpass"
            id="confpass"
            className="form-control border"
            onChange={handleInput}
            value={data.vrfpass}
            required
            pattern={data.password}
            title="This must be same as the password above"
            autoComplete="off"
            placeholder="Confirm password"
          />
          <div
            type={"button"}
            className="border bg-none border-start-0 text-dark  d-flex px-2"
            onClick={(e) => {
              e.preventDefault();
              setVrfShowPass((prev) => !prev);
              const el = document.getElementById("confpass");
              el.type == "password"
                ? (el.type = "text")
                : (el.type = "password");
              el.focus();
            }}
          >
            {!showVrfPass ? (
              <BiHide className="m-auto" />
            ) : (
              <BiShow className="m-auto" />
            )}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="bg-light pb-5">
      <div className="container pt-5 darkTheme">
        <div className="row">
          <form
            onSubmit={signup}
            className="col-10 col-sm-9 col-md-7 col-lg-5 px-3 col-xl-4 shadow-lg panel rounded mx-auto slideUp"
          >
            <div className="d-flex">
              <h3 className="m-auto mt-3 d-flex">
                <Link to={"/"}>
                  <LazyLoadImage
                    effect="opacity"
                    className="me-2 h-[60px] my-auto"
                    src="/sprintetName.png"
                    alt=""
                  />
                </Link>
                <span className="my-auto pb-3 themetxt"> Create Account</span>
              </h3>
            </div>
            <div
              className={`mb-2 text-dark ${
                document.action == "prev"
                  ? "slideRight"
                  : document.action == "next"
                  ? "slideLeft"
                  : ""
              }`}
              key={theLevel}
            >
              {theLevel}
            </div>
            {/* Form Inputs */}
            {levelDom[theLevel]}

            <div className="py-2 d-flex">
              <div className="">
                <Link
                  to={"/auth/login"}
                  className="small py-3 p-0"
                  style={{
                    fontSize: ".8em",
                  }}
                >
                  Sign in instead!
                </Link>
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
                      width: theLevel == l ? "16px" : "6px",
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
                  onClick={() => {
                    previous();
                    document.action = "prev";
                  }}
                >
                  Back
                </div>
              )}
              {theLevel == levels[levels.length - 1] ? (
                <button className="btn mb-4 ms-auto themebg text-light">
                  Create Account
                </button>
              ) : (
                <button
                  className="btn mb-4 ms-auto themebg text-light "
                  onClick={() => {
                    document.action = "next";
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
