// // import axios from "axios";

// // const API = axios.create({
// //     baseURL: "http://localhost:5000/api", 
// // });

// // API.interceptors.request.use((req) => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //         req.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return req;
// // });

// // export default API;


// import axios from "axios";

// // ✅ Production URL (Live)
// const API = axios.create({
//     baseURL: "https://piyush-sir.onrender.com/api",  // ✅ Live backend
//     // baseURL: "http://localhost:5000/api",        // ❌ Local (comment karo)
// });

// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });

// export default API;


// src/utils/api.js
import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: "https://piyush-sir.onrender.com/api",
    timeout: 30000,
});

// ✅ Request Interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        console.log("🔑 Token:", token ? `${token.substring(0, 30)}...` : "No token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response Interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/';
            toast.error("Session expired. Please login again.");
        }
        return Promise.reject(error);
    }
);

export default API;