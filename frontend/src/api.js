import axios from "axios";

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "deployhw9-production-7d2e.up.railway.app"
    : "http://localhost:4000/";

const api = axios.create({ baseURL: API_ROOT });
export default api;