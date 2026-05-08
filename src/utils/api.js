// // // // // // import axios from "axios";

// // // // // // const API = axios.create({
// // // // // //     baseURL: "http://localhost:5000/api", 
// // // // // // });

// // // // // // API.interceptors.request.use((req) => {
// // // // // //     const token = localStorage.getItem("token");
// // // // // //     if (token) {
// // // // // //         req.headers.Authorization = `Bearer ${token}`;
// // // // // //     }
// // // // // //     return req;
// // // // // // });

// // // // // // export default API;


// // // // // import axios from "axios";

// // // // // // ✅ Production URL (Live)
// // // // // const API = axios.create({
// // // // //     baseURL: "https://piyush-sir.onrender.com/api",  // ✅ Live backend
// // // // //     // baseURL: "http://localhost:5000/api",        // ❌ Local (comment karo)
// // // // // });

// // // // // API.interceptors.request.use((req) => {
// // // // //     const token = localStorage.getItem("token");
// // // // //     if (token) {
// // // // //         req.headers.Authorization = `Bearer ${token}`;
// // // // //     }
// // // // //     return req;
// // // // // });

// // // // // export default API;


// // // // // src/utils/api.js
// // // // import axios from "axios";
// // // // import { toast } from "react-toastify";

// // // // const API = axios.create({
// // // //     baseURL: "https://piyush-sir.onrender.com/api",
// // // //     timeout: 30000,
// // // // });

// // // // // ✅ Request Interceptor
// // // // API.interceptors.request.use(
// // // //     (config) => {
// // // //         const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
// // // //         console.log("🔑 Token:", token ? `${token.substring(0, 30)}...` : "No token");
// // // //         if (token) {
// // // //             config.headers.Authorization = `Bearer ${token}`;
// // // //         }
// // // //         return config;
// // // //     },
// // // //     (error) => Promise.reject(error)
// // // // );

// // // // // ✅ Response Interceptor
// // // // API.interceptors.response.use(
// // // //     (response) => response,
// // // //     (error) => {
// // // //         if (error.response?.status === 401) {
// // // //             localStorage.clear();
// // // //             window.location.href = '/';
// // // //             toast.error("Session expired. Please login again.");
// // // //         }
// // // //         return Promise.reject(error);
// // // //     }
// // // // );

// // // // export default API;


// // // // src/utils/api.js
// // // import axios from "axios";

// // // const API = axios.create({
// // //     baseURL: "https://piyush-sir.onrender.com/api",
// // //     timeout: 30000,
// // // });

// // // // Request Interceptor
// // // API.interceptors.request.use(
// // //     (config) => {
// // //         const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
// // //         if (token) {
// // //             config.headers.Authorization = `Bearer ${token}`;
// // //         }
// // //         return config;
// // //     },
// // //     (error) => Promise.reject(error)
// // // );

// // // // Response Interceptor
// // // API.interceptors.response.use(
// // //     (response) => response,
// // //     (error) => {
// // //         if (error.response?.status === 401) {
// // //             localStorage.clear();
// // //             window.location.href = '/';
// // //         }
// // //         return Promise.reject(error);
// // //     }
// // // );

// // // export default API;

// // import axios from "axios";

// // const API = axios.create({
// //     baseURL: "http://localhost:5000/api",
// // });

// // export default API;


// import axios from "axios";

// const API = axios.create({
//     baseURL: "https://piyush-sir.onrender.com/api",
// });

// export default API;

import axios from "axios";

const API = axios.create({
    baseURL: "https://piyush-sir.onrender.com/api",
    timeout: 30000, // 30 seconds wait karega
});

// Request Interceptor: Request bhejne se pehle token lagana
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Backend se error aane par handle karna
API.interceptors.response.use(
    (response) => response,
    (error) => {
        // Agar status 401 (Unauthorized) hai
        if (error.response?.status === 401) {
            console.log("Token expire ho gaya ya galat hai...");
            
            // Sab clear karke login page par bhejo
            localStorage.removeItem('accessToken');
            
            // Loop se bachne ke liye check: Agar pehle se home/login par nahi ho tabhi redirect karo
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default API;