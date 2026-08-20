import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import media from "../media";
import api from "../../axios/api";
import { toast } from "material-react-toastify";
import { FaTimes } from "react-icons/fa";

const context = createContext();

const StateContext = ({ children }) => {
  const [didScroll, setDidScroll] = useState(false);
  const [scrollData, setScrollData] = useState({ x: scrollX, y: scrollY });
  const [isLooking, setIsLooking] = useState(false);
  const [toPop, setToPop] = useState(0);
  const [twitch, setTwitch] = useState(Number(new Date()));
  const [hero, _] = useState(media.heroBg);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState({});
  const [listings, setListings] = useState([]);
  const [someList, setSomeList] = useState([]);
  const [modal, setModal] = useState("");
  const [verification, setVerification] = useState({});
  const [modalTitle, setModalTitle] = useState();

  async function fetchSrc() {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
      const vfrRes = await api.get("/auth/profile/verification");
      setVerification(vfrRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      try {
        const res = await api.get("/listings");
        setListings(res.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.response?.data?.error?.message ||
            "Something went wrong",
          {
            autoClose: false,
          }
        );
      }
    }
  }
  useEffect(() => {
    onscroll = () => {
      setDidScroll(true);
      onscroll = () => {
        setTimeout(() => {
          setScrollData({ x: scrollX, y: scrollY });
        }, 0);
      };
    };
    fetchSrc();
    !didScroll &&
      setTimeout(() => {
        location.pathname == "/" &&
          scrollY == 0 &&
          (() => {
            scroll({ top: 200, behavior: "smooth" });
            setTimeout(() => {
              scroll({ top: 0, behavior: "smooth" });
            }, 1200);
          })();
      }, 5000);
  }, []);

  return (
    <context.Provider
      value={{
        didScroll,
        setDidScroll,
        scrollData,
        isLooking,
        setIsLooking,
        toPop,
        setToPop,
        twitch,
        setTwitch,
        hero,
        title,
        setTitle,
        user,
        setUser,
        someList,
        setSomeList,
        listings,
        setListings,
        modal,
        setModal,
        verification,
        setVerification,
        fetchSrc,
        modalTitle,
        setModalTitle,
      }}
    >
      {children}
      <>
        <a id="url-mounter" href=""></a>
        {modal && (
          <div
            className="d-flex"
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#c2c2c2ab",
              zIndex: 10000,
            }}
            onClick={() => setModal("") || setModalTitle("")}
          >
            <div
              className="rounded m-auto p-2 d-flex slideUp flex-column themebg"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "98vw",
                maxHeight:"98vh"
              }}
            >
              <div className="d-flex pb-2">
                <div className=" text-light">{modalTitle}</div>
                <button
                  className="active ms-auto fs-6 p-0 px-2 my-auto rounded"
                  onClick={() => setModal("") || setModalTitle()}
                >
                  <FaTimes className="icon" />
                </button>
              </div>
              <div
                className="rounded row mx-auto g-0"
                style={{
                  minWidth: "25vw",
                  minHeight: "30vh",
                  backgroundColor: "#121b27ff",
                }}
              >
                {modal}
              </div>
            </div>
          </div>
        )}
      </>
    </context.Provider>
  );
};

export default StateContext;
export const useStateContext = () => useContext(context);
