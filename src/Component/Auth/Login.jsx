// // import React, { useState } from "react";
// // import { MdEmail, MdLock } from "react-icons/md";
// // import { useNavigate } from "react-router-dom";
// // import API from "../../utils/api";

// // const Login = ({ onSuccess }) => {
// //     const navigate = useNavigate();
// //     const [formData, setFormData] = useState({ email: "", password: "" });
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState("");

// //     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
// // const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
    
// //     try {
// //         // 1. URL Check: Localhost 5000 wala route confirm karo
// //         const response = await API.post("/user/login", formData);
// //         const data = response.data; // Backend response yahan hai
        
// //         console.log("🔵 Full Login Response:", data);
// //         console.log(localStorage.getItem('token'));

// //         // 2. Data direct data se uthao (Kyunki backend mein 'user' object nahi hai)
// //         const userRole = data?.role || "user";
        
// //         // 3. Token aur User ko sahi se Save karo
// //         localStorage.setItem("token", data.token);
// //         localStorage.setItem("user", JSON.stringify({
// //             _id: data._id,
// //             name: data.name,
// //             email: data.email,
// //             role: data.role // Ab ye 'admin' pakad lega
// //         }));
        
// //         console.log("✅ LocalStorage Updated!");

// //         // 4. Navbar ko notify karo
// //         window.dispatchEvent(new Event("storage"));
        
// //         if (onSuccess) onSuccess();
        
// //         // 5. Redirect Logic
// //         if (userRole === "admin") {
// //             navigate("/admin");
// //         } else {
// //             navigate("/");
// //         }
        
// //     } catch (err) {
// //         // Agar error aaye toh poora object print karo galti dekhne ke liye
// //         console.log("🔴 Login Error Details:", err.response?.data);
// //         setError(err.response?.data?.message || "Login fail ho gaya bhai!");
// //     } finally {
// //         setLoading(false);
// //     }
// // };

// //     return (
// //         <form onSubmit={handleLogin} className="space-y-4">
// //             <div className="relative group">
// //                 <MdEmail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
// //                 <input 
// //                     name="email" 
// //                     type="email" 
// //                     placeholder="Email Address" 
// //                     onChange={handleChange} 
// //                     className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all" 
// //                     required 
// //                 />
// //             </div>
            
// //             <div className="relative group">
// //                 <MdLock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
// //                 <input 
// //                     name="password" 
// //                     type="password" 
// //                     placeholder="Password" 
// //                     onChange={handleChange} 
// //                     className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all" 
// //                     required 
// //                 />
// //             </div>

// //             <button 
// //                 type="submit" 
// //                 disabled={loading} 
// //                 className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
// //             >
// //                 {loading ? "Signing In..." : "Login"}
// //             </button>
            
// //             {error && (
// //                 <p className="text-center text-red-400 bg-red-500/10 p-2 rounded text-sm">
// //                     {error}
// //                 </p>
// //             )}
// //         </form>
// //     );
// // };

// // export default Login;

// // src/components/Login.jsx
// import React, { useState } from "react";
// import { MdEmail, MdLock } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import API from "../../utils/api";

// const Login = ({ onSuccess, onSwitchToRegister }) => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
        
//         try {
//             const response = await API.post("/user/login", formData);
//             const data = response.data;
            
//             console.log("Login Response:", data);
            
//             if (data.token) {
//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("accessToken", data.token);
//                 localStorage.setItem("user", JSON.stringify({
//                     _id: data._id,
//                     name: data.name,
//                     email: data.email,
//                     role: data.role || 'user'
//                 }));
                
//                 toast.success(`Welcome back, ${data.name || 'User'}!`);
                
//                 window.dispatchEvent(new Event("storage"));
//                 if (onSuccess) onSuccess();
                
//                 // Redirect based on role
//                 if (data.role === 'admin' || data.role === 'super_admin') {
//                     navigate("/admin");
//                 } else {
//                     navigate("/");
//                 }
//             } else {
//                 setError("Invalid response from server");
//             }
//         } catch (err) {
//             console.error("Login error:", err);
//             setError(err.response?.data?.message || "Login failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     console.log("Token:", localStorage.getItem('token'));
// console.log("User:", localStorage.getItem('user'));

//     return (
//         <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
//                 <div className="relative">
//                     <MdEmail className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                     <input 
//                         name="email" 
//                         type="email" 
//                         placeholder="you@example.com" 
//                         onChange={handleChange} 
//                         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
//                         required 
//                     />
//                 </div>
//             </div>
            
//             <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
//                 <div className="relative">
//                     <MdLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                     <input 
//                         name="password" 
//                         type="password" 
//                         placeholder="Enter your password" 
//                         onChange={handleChange} 
//                         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
//                         required 
//                     />
//                 </div>
//             </div>

//             <button 
//                 type="submit" 
//                 disabled={loading} 
//                 className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-semibold hover:bg-[#6B1622] transition-all shadow-md active:scale-95 disabled:opacity-50"
//             >
//                 {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div> : "Sign In"}
//             </button>
            
//             <div className="text-center">
//                 <button 
//                     type="button"
//                     onClick={onSwitchToRegister}
//                     className="text-sm text-gray-500 hover:text-[#8B1E2D] transition"
//                 >
//                     Don't have an account? <span className="font-semibold">Register</span>
//                 </button>
//             </div>
            
//             {error && (
//                 <p className="text-center text-red-600 bg-red-50 p-3 rounded-xl text-sm">
//                     {error}
//                 </p>
//             )}
//         </form>
//     );
// };

// export default Login;

// src/components/Login.jsx
import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../utils/api";

const Login = ({ onSuccess, onSwitchToRegister }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const response = await API.post("/user/login", formData);
            const data = response.data;
            
            console.log("🔵 Login Response:", data);
            
            // ✅ Check for token in different formats
            const token = data.token || data.accessToken;
            
            if (token) {
                // ✅ Save both token formats
                localStorage.setItem("token", token);
                localStorage.setItem("accessToken", token);
                
                // Save refresh token if exists
                if (data.refreshToken) {
                    localStorage.setItem("refreshToken", data.refreshToken);
                }
                
                // ✅ Save user data
                const userData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role || 'user',
                    phone: data.phone || ''
                };
                localStorage.setItem("user", JSON.stringify(userData));
                
                console.log("✅ Tokens saved:", {
                    token: !!localStorage.getItem('token'),
                    accessToken: !!localStorage.getItem('accessToken'),
                    user: userData
                });
                
                toast.success(`Welcome back, ${data.name || 'User'}!`);
                
                window.dispatchEvent(new Event("storage"));
                
                if (onSuccess) onSuccess();
                
                // ✅ Redirect based on role
                if (data.role === 'admin' || data.role === 'super_admin') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                setError("Invalid response from server - No token received");
                toast.error("Login failed. Please try again.");
            }
        } catch (err) {
            console.error("🔴 Login error:", err);
            const errorMsg = err.response?.data?.message || "Login failed. Please check your credentials.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                    <MdEmail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={formData.email}
                        onChange={handleChange} 
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
                        required 
                    />
                </div>
            </div>
            
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                    <MdLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={formData.password}
                        onChange={handleChange} 
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
                        required 
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-semibold hover:bg-[#6B1622] transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div> : "Sign In"}
            </button>
            
            <div className="text-center">
                <button 
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-sm text-gray-500 hover:text-[#8B1E2D] transition"
                >
                    Don't have an account? <span className="font-semibold">Register</span>
                </button>
            </div>
            
            {error && (
                <p className="text-center text-red-600 bg-red-50 p-3 rounded-xl text-sm">
                    {error}
                </p>
            )}
        </form>
    );
};

export default Login;