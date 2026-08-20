import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import StateContext, { useStateContext } from "./state/StateContext";
import About from "./pages/About";
import GreenHouseProject from "./pages/GreenHouseProject";
import Contact from "./pages/Contact";
import AppBody from "./components/AppBody";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/inject-style";
import "material-react-toastify/ReactToastify.min.css";
import Profile from "./pages/auth/Profile";
import NewListing from "./pages/listings/NewListing";
import MyListing from "./pages/listings/MyListing";
import Listing from "./pages/listings/Listing";
import UserProfile from "./pages/auth/UserProfile";
import SearchPage from "./pages/SearchPage";
import UpdateProfile from "./pages/auth/UpdateProfile";
import EditListing from "./pages/listings/EditListing";
import GetVerified from "./pages/auth/GetVerified";
import VerificationPage from "./pages/auth/Verification";
import AdminIndex from "./pages/admin/AdminIndex";
import Verifications from "./pages/admin/Verifications";
import VerificationSingle from "./pages/admin/Verification";
import UserSingle from "./pages/admin/User";
import FinishVerification from "./pages/auth/finishVerification";

const ViewPort = () => {
  const {} = useStateContext();
  useEffect(() => {
    const ico = document.getElementById("ico");
    if (ico) {
      ico.href = "/logo.png";
    }
  }, []);
  return (
    <BrowserRouter>
      <main className="p-0 m-0 themebg">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AppBody />}>
            <Route index element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/some-other-page" element={<GreenHouseProject />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listed/new" element={<NewListing />} />
            <Route path="/listed/:listingId" element={<Listing />} />
            <Route path="/user/:uid" element={<UserProfile />} />
            <Route path="/auth/user-profile" element={<Profile />} />
            <Route path="/auth/user-profile/edit" element={<UpdateProfile />} />
            <Route
              path="/auth/user-profile/verification"
              element={<GetVerified />}
            />
            <Route
              path="/auth/user-profile/verification/view"
              element={<VerificationPage />}
            />
            <Route
              path="/auth/verification/finish"
              element={<FinishVerification />}
            />

            <Route
              path="/auth/user-profile/listed/:listingId"
              element={<MyListing />}
            />
            <Route
              path="/auth/user-profile/listed/:listingId/edit"
              element={<EditListing />}
            />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/create-account" element={<Signup />} />
            <Route path="/sys/admin" element={<AdminIndex />} />
            <Route
              path="/sys/admin/verifications"
              element={<Verifications />}
            />
            <Route
              path="/sys/admin/verifications/:id"
              element={<VerificationSingle />}
            />
            <Route path="/sys/admin/users/:uid" element={<UserSingle />} />
          </Route>
        </Routes>
        <div className="content pb-0 mb-0">
          <Footer />
        </div>
        <div className="themebg themetxt px-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        {/* <div style={{ position: 'fixed', top: '200px', zIndex: 1000 }} className='text-light bg-primary'>
                {JSON.stringify(scrollData)}
            </div> */}
      </main>
    </BrowserRouter>
  );
};

const Layout = () => {
  return (
    <StateContext>
      <ViewPort />
    </StateContext>
  );
};

export default Layout;
