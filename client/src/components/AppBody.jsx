import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const AppBody = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.access) {
      return () => {};
    }
    if (location.pathname.includes("profile")) {
      navigate("/auth/login");
    }
    if (location.pathname.includes("admin")) {
      navigate("/auth/login");
    }
    if (location.pathname.includes("verif")) {
      navigate("/auth/login");
    }
  }, [location.pathname]);
  return (
    <div className="bg-white text-dark pb-5">
      {location.pathname.length > 2 && <Nav />}
      <Outlet />
    </div>
  );
};

export default AppBody;
