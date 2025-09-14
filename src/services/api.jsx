import axios from "axios";

const api = axios.create({
  baseURL: "https://barbconnect-backend-1.onrender.com",
});

export default api;
