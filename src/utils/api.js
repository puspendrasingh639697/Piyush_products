// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:5000/api", 
// });

// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });

// export default API;


import axios from "axios";

// ✅ Production URL (Live)
const API = axios.create({
    baseURL: "https://piyush-sir.onrender.com/api",  // ✅ Live backend
    // baseURL: "http://localhost:5000/api",        // ❌ Local (comment karo)
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;