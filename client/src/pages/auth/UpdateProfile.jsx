import React, { useState, useRef } from "react";
import { toast } from "material-react-toastify";
import api from "../../../axios/api";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiHide, BiShow } from "react-icons/bi";
import { SafeUser } from "../../../../schemas/constructors";
import { useEffect } from "react";
import { useStateContext } from "../../state/StateContext";

const UpdateProfile = () => {
  const levels = ["Personal", "Contact", "Security"];
  const { user } = useStateContext();
  const [data, setData] = useState({});
  const [profileFile, setProfileFile] = useState(null);
  const fileInputRef = useRef();
  const [theLevel, setTheLevel] = useState("Personal");
  const [showPass, setShowPass] = useState(false);
  const [showVrfPass, setVrfShowPass] = useState(false);

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
    const tst = toast.loading("Updating profile", {
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
      const userData = {
        ...data,
        profileicon: profileiconUrl || user.profileicon,
        iconData: iconData.url ? iconData : user.iconData,
      };
      const prom = {};
      const keys = Object.keys(userData);
      for (const key of keys) {
        if (userData[key]) {
          prom[key] = userData[key];
        }
      }
      await api.put("/auth/profile", prom);
      location.pathname = "/";
    } catch (err) {
      toast.error(
        `${err?.response?.data?.message || err?.response?.data || err?.message}`
      );
    } finally {
      toast.dismiss(tst);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        password: "",
      }));
    }, 2000);
    document.getElementById("pass") &&
      (() => (document.getElementById("pass").value = ""))();
  }, [theLevel]);

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
              value={data.firstname || user.firstname}
              placeholder="Firstname"
            />
          </div>
          <div className="form-group col-6">
            <input
              type="text"
              name="lastname"
              className="form-control border"
              onChange={handleInput}
              value={data.lastname || user.lastname}
              placeholder="Lastname"
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <select
            name="gender"
            className="form-control border"
            onChange={handleInput}
            value={data.gender || user.gender}
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
            value={data.email || user.email}
            placeholder="Email"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            name="phone"
            className="form-control border"
            onChange={handleInput}
            value={data.phone || user.phone}
            placeholder="Phone"
          />
        </div>
        <div className="form-group mb-3">
          <textarea
            name="bio"
            className="form-control border"
            onChange={handleInput}
            value={data.bio || user.bio}
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
          value={data.email || user.email}
          placeholder="Email"
        />
        <div className="form-group mb-3 d-flex">
          <input
            type="password"
            name="password"
            title="Enter your desired new password (optional)"
            id="pass"
            minLength={6}
            autoComplete="off"
            className="form-control border"
            onChange={handleInput}
            value={data.password || user.password}
            placeholder="New Password (optional)"
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
            name="prevPass"
            id="confpass"
            autoComplete="off"
            className="form-control border"
            onChange={handleInput}
            value={data.prevPass || user.prevPass}
            title="This must be same as the password as the old password"
            placeholder="Old password (optional)"
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
                <span className="my-auto pb-3 themetxt"> Edit Profile</span>
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
                  Save Changes
                </button>
              ) : (
                <div
                  className="btn mb-4 ms-auto themebg text-light "
                  onClick={() => {
                    document.action = "next";
                    next();
                  }}
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

export default UpdateProfile;
