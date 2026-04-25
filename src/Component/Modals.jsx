import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MdEmail, 
  MdLock, 
  MdPhone, 
  MdClose,
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

const Modals = (props) => {
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Register form data - only 3 fields
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        number: "",
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    // Login form data - only 2 fields
    const [formDatas, setFormDatas] = useState({
        email: "",
        password: "",
    });

    const [loadings, setLoadings] = useState(false);
    const [msgs, setMsgs] = useState("");

    // Input handlers
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChanges = (e) => {
        setFormDatas({
            ...formDatas,
            [e.target.name]: e.target.value,
        });
    };

    // Register submit - store in localStorage
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            
            const userExists = users.find(user => user.email === formData.email);
            if (userExists) {
                setMsg("❌ User already exists");
                setLoading(false);
                return;
            }

            const newUser = {
                id: Date.now(),
                email: formData.email,
                password: formData.password,
                number: formData.number,
            };
            
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            
            setMsg("✅ Registration Successful!");
            
            setTimeout(() => {
                setFormData({ email: "", password: "", number: "" });
                setIsRegister(false);
            }, 1500);

        } catch (error) {
            setMsg("❌ Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    // Login submit - check localStorage
    const handleSubmits = async (e) => {
        e.preventDefault();
        setLoadings(true);
        setMsgs("");

        try {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find(
                user => user.email === formDatas.email && user.password === formDatas.password
            );

            if (user) {
                setMsgs("✅ Login Successful");
                localStorage.setItem("currentUser", JSON.stringify(user));
                
                setTimeout(() => {
                    setFormDatas({ email: "", password: "" });
                    if (props.onClose) props.onClose();
                }, 1000);
            } else {
                setMsgs("❌ Invalid email or password");
            }

        } catch (error) {
            setMsgs("❌ Login Failed");
        } finally {
            setLoadings(false);
        }
    };

    const handleClick = (event) => {
        if (props.onClose) props.onClose();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={handleClick}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl shadow-2xl border border-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClick}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-gray-800"
                >
                    <MdClose size={20} />
                </button>

                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            {isRegister ? "Create Account" : "Welcome Back"}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            {isRegister ? "Sign up to get started" : "Sign in to continue"}
                        </p>
                    </div>

                    {/* Form Toggle */}
                    <div className="flex gap-2 bg-gray-800/50 rounded-xl p-1 w-full mb-6">
                        {[
                            { id: "login", label: "Sign In", icon: <FaSignInAlt size={14} /> },
                            { id: "register", label: "Sign Up", icon: <FaUserPlus size={14} /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setIsRegister(tab.id === "register")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                                    isRegister === (tab.id === "register")
                                        ? "bg-red-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Forms */}
                    <AnimatePresence mode="wait">
                        {!isRegister ? (
                            <motion.form
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={handleSubmits}
                                className="space-y-5"
                            >
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <MdEmail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formDatas.email}
                                            onChange={handleChanges}
                                            placeholder="you@example.com"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <MdLock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formDatas.password}
                                            onChange={handleChanges}
                                            placeholder="Enter your password"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loadings}
                                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loadings ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaSignInAlt size={16} />
                                            <span>Sign In</span>
                                        </>
                                    )}
                                </button>

                                {/* Message */}
                                {msgs && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-3 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-2 ${
                                            msgs.includes("✅") 
                                                ? "bg-green-900/30 text-green-400 border border-green-800"
                                                : "bg-red-900/30 text-red-400 border border-red-800"
                                        }`}
                                    >
                                        {msgs}
                                    </motion.div>
                                )}
                            </motion.form>
                        ) : (
                            <motion.form
                                key="register"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <MdEmail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <MdLock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Phone Number Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <MdPhone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUserPlus size={16} />
                                            <span>Create Account</span>
                                        </>
                                    )}
                                </button>

                                {/* Message */}
                                {msg && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-3 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-2 ${
                                            msg.includes("✅") 
                                                ? "bg-green-900/30 text-green-400 border border-green-800"
                                                : "bg-red-900/30 text-red-400 border border-red-800"
                                        }`}
                                    >
                                        {msg}
                                    </motion.div>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Modals;