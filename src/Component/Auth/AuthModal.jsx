

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MdClose } from "react-icons/md";
// import { FaUserPlus, FaSignInAlt, FaKey } from "react-icons/fa";
// import Login from "./Login";
// import Register from "./Register";
// import ForgotPassword from "./ForgotPassword"; // Iska code maine pichle message mein diya tha

// const AuthModal = ({ onClose }) => {
//     // view state: 'login', 'register', ya 'forgot'
//     const [view, setView] = useState("login");

//     return (
//         <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4"
//             onClick={onClose}
//         >
//             <motion.div 
//                 initial={{ scale: 0.9, y: 20 }} 
//                 animate={{ scale: 1, y: 0 }}
//                 className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Close Button */}
//                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
//                     <MdClose size={24} />
//                 </button>

//                 {/* Header Section */}
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
//                         {view === "login" && "Welcome Back"}
//                         {view === "register" && "Join Us"}
//                         {view === "forgot" && "Reset Access"}
//                     </h2>
//                     <p className="text-gray-400 text-sm mt-2">
//                         {view === "login" && "Sign in to manage your orders"}
//                         {view === "register" && "Create an account to get started"}
//                         {view === "forgot" && "Enter your email to get a reset link"}
//                     </p>
//                 </div>

//                 {/* Tabs - Sirf Login aur Register ke liye dikhayenge */}
//                 {view !== "forgot" && (
//                     <div className="flex bg-gray-800/50 p-1 rounded-xl mb-8 border border-gray-700">
//                         <button 
//                             onClick={() => setView("login")} 
//                             className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${view === "login" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
//                         >
//                             <FaSignInAlt /> Login
//                         </button>
//                         <button 
//                             onClick={() => setView("register")} 
//                             className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${view === "register" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
//                         >
//                             <FaUserPlus /> Register
//                         </button>
//                     </div>
//                 )}

//                 {/* Conditional Rendering of Forms */}
//                 <div className="min-h-[300px]">
//                     {view === "login" && (
//                         <div className="space-y-4">
//                             <Login />
//                             <div className="text-center mt-4">
//                                 <button 
//                                     onClick={() => setView("forgot")}
//                                     className="text-xs text-gray-500 hover:text-red-500 flex items-center justify-center gap-1 mx-auto transition-colors"
//                                 >
//                                     <FaKey size={10} /> Forgot Password?
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {view === "register" && (
//                         <Register onSuccess={() => setView("login")} />
//                     )}

//                     {view === "forgot" && (
//                         <ForgotPassword onBack={() => setView("login")} />
//                     )}
//                 </div>

//                 {/* Footer Tip */}
//                 <div className="mt-8 pt-6 border-t border-gray-800 text-center">
//                     <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
//                         Secure SSL Encrypted Connection
//                     </p>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default AuthModal;


// src/components/AuthModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdEmail, MdLock, MdPhone, MdPerson } from "react-icons/md";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const AuthModal = ({ onClose, onSuccess }) => {
    const navigate = useNavigate();
    const [view, setView] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    // ✅ Login Handler
    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            toast.error("Please enter email and password");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await API.post("/user/login", {
                email: formData.email.trim(),
                password: formData.password
            });
            
            const data = response.data;
            console.log("Login Response:", data);
            
            if (data.token || data.accessToken) {
                const token = data.token || data.accessToken;
                const userData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role || 'user',
                    phone: data.phone || ''
                };
                
                localStorage.setItem("token", token);
                localStorage.setItem("accessToken", token);
                localStorage.setItem("user", JSON.stringify(userData));
                
                toast.success(`Welcome back, ${data.name || 'User'}!`);
                
                if (onSuccess) onSuccess();
                if (onClose) onClose();
                
                // Redirect based on role
                if (userData.role === 'admin' || userData.role === 'super_admin') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                toast.error("Invalid response from server");
            }
        } catch (err) {
            console.error("Login error:", err);
            const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMsg);
            setErrors({ general: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    // ✅ Register Handler
    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await API.post("/user/register", {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                password: formData.password
            });
            
            const data = response.data;
            console.log("Register Response:", data);
            
            if (data.token || data.accessToken) {
                const token = data.token || data.accessToken;
                const userData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role || 'user',
                    phone: data.phone || ''
                };
                
                localStorage.setItem("token", token);
                localStorage.setItem("accessToken", token);
                localStorage.setItem("user", JSON.stringify(userData));
                
                toast.success(`Welcome, ${data.name}! Account created successfully!`);
                
                if (onSuccess) onSuccess();
                if (onClose) onClose();
                navigate("/");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Register error:", err);
            const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMsg);
            setErrors({ general: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    // ✅ Forgot Password Handler
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        
        if (!formData.email) {
            toast.error("Please enter your email");
            return;
        }
        
        setLoading(true);
        
        try {
            await API.post("/user/forgot-password", { email: formData.email.trim() });
            toast.success("Reset link sent to your email!");
            setView("login");
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.message || "Email not found");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20, opacity: 0 }} 
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Dark Red */}
                    <div className="bg-gradient-to-r from-[#8B1E2D] to-[#6B1622] p-6 text-center">
                        <h2 className="text-2xl font-bold text-white">
                            {view === "login" ? "Welcome Back" : view === "register" ? "Create Account" : "Reset Password"}
                        </h2>
                        <p className="text-red-200 text-sm mt-1">
                            {view === "login" ? "Sign in to continue" : view === "register" ? "Join us for exclusive deals" : "We'll send you a reset link"}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
                    >
                        <MdClose size={18} />
                    </button>

                    {/* Tabs */}
                    {view !== "forgot" && (
                        <div className="flex border-b border-gray-200">
                            <button 
                                onClick={() => { setView("login"); resetForm(); }} 
                                className={`flex-1 py-3 text-center font-medium transition-all ${view === "login" ? "text-[#8B1E2D] border-b-2 border-[#8B1E2D]" : "text-gray-500 hover:text-gray-700"}`}
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => { setView("register"); resetForm(); }} 
                                className={`flex-1 py-3 text-center font-medium transition-all ${view === "register" ? "text-[#8B1E2D] border-b-2 border-[#8B1E2D]" : "text-gray-500 hover:text-gray-700"}`}
                            >
                                Register
                            </button>
                        </div>
                    )}

                    {/* Form Body */}
                    <div className="p-6">
                        {/* Login Form */}
                        {view === "login" && (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                                    <div className="relative">
                                        <MdEmail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                                    <div className="relative">
                                        <MdLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-[#8B1E2D] transition"
                                        >
                                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {errors.general && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                        <p className="text-red-600 text-sm text-center">{errors.general}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-semibold hover:bg-[#6B1622] transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Sign In"}
                                </button>

                                <div className="text-center">
                                    <button 
                                        type="button"
                                        onClick={() => { setView("forgot"); resetForm(); }}
                                        className="text-sm text-gray-500 hover:text-[#8B1E2D] transition"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Register Form */}
                        {view === "register" && (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                                    <div className="relative">
                                        <MdPerson className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                                    <div className="relative">
                                        <MdEmail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
                                    <div className="relative">
                                        <MdPhone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                                    <div className="relative">
                                        <MdLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-[#8B1E2D] transition"
                                        >
                                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <MdLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>

                                {errors.general && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                        <p className="text-red-600 text-sm text-center">{errors.general}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-semibold hover:bg-[#6B1622] transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Create Account"}
                                </button>
                            </form>
                        )}

                        {/* Forgot Password Form */}
                        {view === "forgot" && (
                            <form onSubmit={handleForgotPassword} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                                    <div className="relative">
                                        <MdEmail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-semibold hover:bg-[#6B1622] transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Send Reset Link"}
                                </button>

                                <div className="text-center">
                                    <button 
                                        type="button"
                                        onClick={() => { setView("login"); resetForm(); }}
                                        className="text-sm text-gray-500 hover:text-[#8B1E2D] transition"
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 text-center">
                        <p className="text-gray-400 text-xs">
                            🔒 Secure SSL Encrypted Connection
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AuthModal;