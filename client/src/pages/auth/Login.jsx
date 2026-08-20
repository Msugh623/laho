import React, { useState } from "react";
import { toast } from "material-react-toastify";
import api from "../../../axios/api";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleInput = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    const tst = toast.loading("Logging in", {
      autoClose: false,
    });
    try {
      const cred = (await api.post("/auth/login", data))?.data;
      localStorage.access = cred.token;
      api.defaults.headers.common["Authorization"] = "Bearer " + cred.token;
      const rep = localStorage?.returnTo;
      localStorage.returnTo = "";
      location.replace(rep || "/");
    } catch (err) {
      toast.error(
        `${err?.response?.data?.message || err?.response?.data || err?.message}`,
      );
    } finally {
      toast.dismiss(tst);
    }
  };

  return (
    <div className="bg-light">
      <div className="container pt-5 pb-5 darkTheme ">
        <div className="row">
          <form
            onSubmit={login}
            className="col-10 col-sm-9 col-md-7 col-lg-5 px-3 col-xl-4 shadow-lg panel rounded mx-auto slideUp"
          >
            <div className="d-flex">
              <h3 className="m-auto mt-3 d-flex">
                <Link to={"/"}>
                  <LazyLoadImage
                    effect="opacity"
                    className="me-2 h-[] my-auto icon"
                    src="/logo.png"
                    alt=""
                    height={"40px"}
                  />
                </Link>
                <span className="my-auto pb-3 themetxt"> Login</span> <br />
              </h3>
            </div>
            <div className="mb-3 mt-1 text-center text-dark">
              <small className="small ">Login to yout landsmart account</small>
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control border"
                name="email"
                onChange={handleInput}
                value={data.email}
                required
                placeholder="Email"
              />
            </div>
            <div className="form-group d-flex">
              <input
                type="password"
                name="password"
                className="form-control border"
                onChange={handleInput}
                value={data.password}
                required
                id="pass"
                placeholder="Password"
              />
              <div
                type={"button"}
                className="border bg-none border-start-0  d-flex px-2 text-dark"
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
            <div className="py-2">
              <Link
                to={"/auth/create-account"}
                className="small py-3 p-0 m-0 themetxt"
                style={{
                  fontSize: ".8em",
                }}
              >
                Don't have an account? Create account!
              </Link>
            </div>
            <button className="btn mb-4  themebg text-light" style={{}}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
