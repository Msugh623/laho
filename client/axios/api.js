import axios from "axios";

export default axios.create({
  baseURL: location.origin.includes("173")
    ? "http://localhost:3000"
    : location.origin,
  headers: {
    "X-Auth": localStorage.access ? localStorage.access : "",
  },
  // withCredentials: true,
});
