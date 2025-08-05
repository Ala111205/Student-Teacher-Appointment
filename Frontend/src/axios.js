import axios from "axios";

const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL,
     withCredentials: true
});

console.log(".env file Not working: ",process.env.REACT_APP_API_URL)

export default api;