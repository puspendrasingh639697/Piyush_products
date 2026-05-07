// // import React, { useState } from "react";
// // import { MdEmail, MdLock, MdPhone, MdPerson } from "react-icons/md";
// // import API from "../../utils/api";

// // const Register = ({ onSuccess }) => {
// //     const [formData, setFormData] = useState({ 
// //         name: "", 
// //         email: "", 
// //         phone: "", 
// //         password: "" 
// //     });
    
// //     const [loading, setLoading] = useState(false);
// //     const [msg, setMsg] = useState({ text: "", type: "" });

// //     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //     const handleRegister = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setMsg({ text: "", type: "" });

// //         try {
// //             const response = await API.post("/auth/register", formData);
// //             const data = response.data;
            
// //             console.log("🟢 Register Response:", data);
            
// //             if (data.success || data._id) {
// //                 setMsg({ text: "✅ Account Created! Switching to Login...", type: "success" });
// //                 setTimeout(() => {
// //                     if (onSuccess) onSuccess();
// //                 }, 2000);
// //             }
// //         } catch (err) {
// //             console.log("🔴 Register Error:", err.response?.data);
// //             setMsg({ 
// //                 text: `❌ ${err.response?.data?.message || "Registration Failed"}`, 
// //                 type: "error" 
// //             });
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleRegister} className="space-y-4">
// //             <div className="relative group">
// //                 <MdPerson className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
// //                 <input 
// //                     name="name" 
// //                     type="text" 
// //                     placeholder="Full Name" 
// //                     onChange={handleChange} 
// //                     className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all" 
// //                     required 
// //                 />
// //             </div>

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
// //                 <MdPhone className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
// //                 <input 
// //                     name="phone" 
// //                     type="tel" 
// //                     placeholder="Phone Number" 
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
// //                 {loading ? "Creating Account..." : "Register Now"}
// //             </button>

// //             {msg.text && (
// //                 <p className={`text-center text-sm font-medium p-2 rounded ${msg.type === "success" ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
// //                     {msg.text}
// //                 </p>
// //             )}
// //         </form>
// //     );
// // };

// // export default Register;

// // src/components/Register.jsx
// import React, { useState } from "react";
// import { MdEmail, MdLock, MdPhone, MdPerson } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import API from "../../utils/api";

// const Register = ({ onSuccess, onSwitchToLogin }) => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({ 
//         name: "", 
//         email: "", 
//         phone: "", 
//         password: "" 
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrors({});
        
//         // ✅ Prepare data - phone optional
//         const requestData = {
//             name: formData.name.trim(),
//             email: formData.email.trim().toLowerCase(),
//             password: formData.password
//         };
        
//         // ✅ Only add phone if user entered and valid
//         if (formData.phone && formData.phone.trim()) {
//             const phoneRegex = /^[0-9]{10}$/;
//             if (phoneRegex.test(formData.phone.trim())) {
//                 requestData.phone = formData.phone.trim();
//             } else {
//                 toast.error("Phone number must be 10 digits");
//                 setLoading(false);
//                 return;
//             }
//         }
        
//         console.log("📤 Register Request:", requestData);
        
//         try {
//             const response = await API.post("/user/register", requestData);
//             const data = response.data;
            
//             console.log("✅ Register Response:", data);
            
//             if (data.token || data.accessToken) {
//                 const token = data.token || data.accessToken;
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("accessToken", token);
//                 localStorage.setItem("user", JSON.stringify({
//                     _id: data._id,
//                     name: data.name,
//                     email: data.email,
//                     role: data.role || 'user',
//                     phone: data.phone || ''
//                 }));
                
//                 toast.success(`Welcome, ${data.name}! Registration successful!`);
                
//                 if (onSuccess) onSuccess();
//                 navigate("/");
//             } else {
//                 toast.error(data.message || "Registration failed");
//             }
//         } catch (err) {
//             console.error("❌ Register Error:", err.response?.data);
            
//             // ✅ Show detailed error from backend
//             const errorData = err.response?.data;
            
//             if (errorData?.message) {
//                 toast.error(errorData.message);
//             } else if (errorData?.errors) {
//                 const firstError = Object.values(errorData.errors)[0]?.message;
//                 toast.error(firstError || "Registration failed");
//             } else {
//                 toast.error("Registration failed. Please try again.");
//             }
            
//             // Set errors from backend
//             if (errorData?.errors) {
//                 setErrors(errorData.errors);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleRegister} className="space-y-4">
//             {/* Name */}
//             <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Full Name *</label>
//                 <div className="relative">
//                     <MdPerson className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                     <input 
//                         name="name" 
//                         type="text" 
//                         value={formData.name}
//                         placeholder="John Doe" 
//                         onChange={handleChange} 
//                         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
//                         required
//                     />
//                 </div>
//                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name?.message || errors.name}</p>}
//             </div>

//             {/* Email */}
//             <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Email Address *</label>
//                 <div className="relative">
//                     <MdEmail className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                     <input 
//                         name="email" 
//                         type="email" 
//                         value={formData.email}
//                         placeholder="you@example.com" 
//                         onChange={handleChange} 
//                         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
//                         required
//                     />
//                 </div>
//                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message || errors.email}</p>}
//             </div>

//             {/* Phone - Optional */}
//             <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number <span className="text-gray-400 text-xs">(Optional)</span></label>
//                 <div className="relative">
//                     <MdPhone className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                     <input 
//                         name="phone" 
//                         type="tel" 
//                         value={formData.phone}
//                         placeholder="9876543210" 
//                         onChange={handleChange} 
//                         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
//                     />
//                 </div>
//                 {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone?.message || errors.phone}</p>}
//                 <p className="text-gray-400 text-xs mt-1">Enter 10 digit number (optional)</p>
//             </div>

//             {/* Password */}
//             <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Password *</label>
//                 <div className="relative">
//                     <MdLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
//                     <input 
//                         name="password" 
//                         type="password" 
//                         value={formData.password}
//                         placeholder="Create a password" 
//                         onChange={handleChange} 
//                         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all" 
//                         required
//                     />
//                 </div>
//                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password?.message || errors.password}</p>}
//                 <p className="text-gray-400 text-xs mt-1">Minimum 6 characters</p>
//             </div>

//             <button 
//                 type="submit" 
//                 disabled={loading} 
//                 className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-semibold hover:bg-[#6B1622] transition-all shadow-md active:scale-95 disabled:opacity-50"
//             >
//                 {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div> : "Create Account"}
//             </button>
            
//             <div className="text-center">
//                 <button 
//                     type="button"
//                     onClick={onSwitchToLogin}
//                     className="text-sm text-gray-500 hover:text-[#8B1E2D] transition"
//                 >
//                     Already have an account? <span className="font-semibold">Login</span>
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default Register;

// src/components/Register.jsx
import React, { useState } from "react";
import { MdEmail, MdLock, MdPhone, MdPerson, MdCheckCircle } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../utils/api";

const Register = ({ onSuccess, onSwitchToLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "", 
        password: "",
        confirmPassword: ""  // ✅ Frontend only
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        // ✅ Frontend only validation - confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }
        
        setLoading(true);
        
        // ✅ Backend ko sirf ye data bhejna hai - NO confirmPassword
        const requestData = {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password
        };
        
        // Phone optional
        if (formData.phone && formData.phone.trim()) {
            requestData.phone = formData.phone.trim();
        }
        
        console.log("📤 Sending to Backend:", requestData);
        
        try {
            const response = await API.post("/user/register", requestData);
            
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data));
                toast.success(`Welcome, ${response.data.name}!`);
                
                if (onSuccess) onSuccess();
                navigate("/");
            }
        } catch (err) {
            console.error("Register error:", err.response?.data);
            toast.error(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Name *</label>
                <div className="relative">
                    <MdPerson className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="name" 
                        type="text" 
                        value={formData.name}
                        placeholder="John Doe" 
                        onChange={handleChange} 
                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#8B1E2D]`}
                        required
                    />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address *</label>
                <div className="relative">
                    <MdEmail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        placeholder="you@example.com" 
                        onChange={handleChange} 
                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#8B1E2D]`}
                        required
                    />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone - Optional */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number <span className="text-gray-400">(Optional)</span></label>
                <div className="relative">
                    <MdPhone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="phone" 
                        type="tel" 
                        value={formData.phone}
                        placeholder="9876543210" 
                        onChange={handleChange} 
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B1E2D]"
                    />
                </div>
            </div>

            {/* Password */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Password *</label>
                <div className="relative">
                    <MdLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        value={formData.password}
                        placeholder="Create a password" 
                        onChange={handleChange} 
                        className={`w-full pl-11 pr-12 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#8B1E2D]`}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-[#8B1E2D]"
                    >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <p className="text-gray-400 text-xs mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password - FRONTEND ONLY */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password *</label>
                <div className="relative">
                    <MdCheckCircle className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        name="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"} 
                        value={formData.confirmPassword}
                        placeholder="Confirm your password" 
                        onChange={handleChange} 
                        className={`w-full pl-11 pr-12 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#8B1E2D]`}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-[#8B1E2D]"
                    >
                        {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-semibold hover:bg-[#6B1622] transition shadow-md"
            >
                {loading ? "Creating Account..." : "Create Account"}
            </button>
            
            <div className="text-center">
                <button 
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-sm text-gray-500 hover:text-[#8B1E2D] transition"
                >
                    Already have an account? <span className="font-semibold">Login</span>
                </button>
            </div>
        </form>
    );
};

export default Register;