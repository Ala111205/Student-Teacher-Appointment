import axios from "axios";

const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
     withCredentials: true
});

console.log(".env file Not working: ",import.meta.env.VITE_API_URL)

export default api;