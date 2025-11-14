// src/api/client.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

client.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error.response || error)
        return Promise.reject(error);
    }
);

export default client;