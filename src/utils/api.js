

// import axios from "axios";

// const API = axios.create({
//     baseURL: "https://piyush-sir.onrender.com/api",
//     timeout: 30000, // 30 seconds wait karega
// });

// // Request Interceptor: Request bhejne se pehle token lagana
// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken'); 
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response Interceptor: Backend se error aane par handle karna
// API.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Agar status 401 (Unauthorized) hai
//         if (error.response?.status === 401) {
//             console.log("Token expire ho gaya ya galat hai...");
            
//             // Sab clear karke login page par bhejo
//             localStorage.removeItem('accessToken');
            
//             // Loop se bachne ke liye check: Agar pehle se home/login par nahi ho tabhi redirect karo
//             if (window.location.pathname !== '/') {
//                 window.location.href = '/';
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default API;


import axios from "axios";

const API = axios.create({
    baseURL: "https://piyush-sir.onrender.com/api",
    timeout: 60000, // ✅ 60 sec kiya
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // ✅ FIX 1
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("Token expire ho gaya ya galat hai...");
            localStorage.clear(); // ✅ FIX 2
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default API;