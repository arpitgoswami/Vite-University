import axios from "axios";

// https://aplex-backend.onrender.com/
// http://localhost:3000/

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
