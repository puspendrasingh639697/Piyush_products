// import React, { useState } from "react";
// import { MdEmail, MdArrowBack } from "react-icons/md";
// import API from "../../utils/api";// Tera axios instance

// const ForgotPassword = ({ onBack }) => {
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState({ text: "", type: "" });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage({ text: "", type: "" });
//         try {
//             const { data } = await API.post("/auth/forgot-password", { email });
//             setMessage({ text: data.message, type: "success" });
//         } catch (err) {
//             setMessage({ text: err.response?.data?.message || "Something went wrong", type: "error" });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="space-y-5">
//             <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-4">
//                 <MdArrowBack /> Back to Login
//             </button>
            
//             <div className="text-center mb-6">
//                 <h2 className="text-2xl font-bold text-white">Reset Password</h2>
//                 <p className="text-gray-400 text-sm mt-1">Humein apna email dein, hum link bhej denge.</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="relative group">
//                     <MdEmail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
//                     <input 
//                         type="email" 
//                         placeholder="Email Address" 
//                         className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
//                         onChange={(e) => setEmail(e.target.value)}
//                         required 
//                     />
//                 </div>

//                 <button 
//                     disabled={loading}
//                     className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
//                 >
//                     {loading ? "Sending Link..." : "Send Reset Link"}
//                 </button>
//             </form>

//             {message.text && (
//                 <p className={`text-center text-sm p-3 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
//                     {message.text}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../utils/api";

const ForgotPassword = ({ onBack }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Enter a valid email address";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            toast.error(emailError);
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const response = await API.post('/users/forgot-password', { email: email.trim() });
            if (response.data.success || response.data.message) {
                setSent(true);
                toast.success('Reset link sent to your email!');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Email not found. Please register first.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
            >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                <p className="text-gray-400 text-sm mb-4">
                    We've sent a password reset link to <br />
                    <span className="text-[#8B1E2D] font-medium">{email}</span>
                </p>
                <button
                    onClick={onBack}
                    className="text-[#8B1E2D] hover:underline text-sm flex items-center justify-center gap-1 mx-auto transition"
                >
                    <FaArrowLeft size={12} /> Back to Login
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div className="text-center mb-2">
                <p className="text-gray-400 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
            </div>

            <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                </label>
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B1E2D]" size={16} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all`}
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-medium hover:bg-[#6B1622] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                    </>
                ) : (
                    'Send Reset Link'
                )}
            </button>

            <button
                type="button"
                onClick={onBack}
                className="text-gray-500 hover:text-[#8B1E2D] text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
            >
                <FaArrowLeft size={12} /> Back to Login
            </button>
        </motion.form>
    );
};

export default ForgotPassword;