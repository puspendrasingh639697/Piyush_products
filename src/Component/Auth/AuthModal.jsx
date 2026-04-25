

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { FaUserPlus, FaSignInAlt, FaKey } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword"; // Iska code maine pichle message mein diya tha

const AuthModal = ({ onClose }) => {
    // view state: 'login', 'register', ya 'forgot'
    const [view, setView] = useState("login");

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} 
                animate={{ scale: 1, y: 0 }}
                className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                    <MdClose size={24} />
                </button>

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                        {view === "login" && "Welcome Back"}
                        {view === "register" && "Join Us"}
                        {view === "forgot" && "Reset Access"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        {view === "login" && "Sign in to manage your orders"}
                        {view === "register" && "Create an account to get started"}
                        {view === "forgot" && "Enter your email to get a reset link"}
                    </p>
                </div>

                {/* Tabs - Sirf Login aur Register ke liye dikhayenge */}
                {view !== "forgot" && (
                    <div className="flex bg-gray-800/50 p-1 rounded-xl mb-8 border border-gray-700">
                        <button 
                            onClick={() => setView("login")} 
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${view === "login" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                        >
                            <FaSignInAlt /> Login
                        </button>
                        <button 
                            onClick={() => setView("register")} 
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${view === "register" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                        >
                            <FaUserPlus /> Register
                        </button>
                    </div>
                )}

                {/* Conditional Rendering of Forms */}
                <div className="min-h-[300px]">
                    {view === "login" && (
                        <div className="space-y-4">
                            <Login />
                            <div className="text-center mt-4">
                                <button 
                                    onClick={() => setView("forgot")}
                                    className="text-xs text-gray-500 hover:text-red-500 flex items-center justify-center gap-1 mx-auto transition-colors"
                                >
                                    <FaKey size={10} /> Forgot Password?
                                </button>
                            </div>
                        </div>
                    )}

                    {view === "register" && (
                        <Register onSuccess={() => setView("login")} />
                    )}

                    {view === "forgot" && (
                        <ForgotPassword onBack={() => setView("login")} />
                    )}
                </div>

                {/* Footer Tip */}
                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                        Secure SSL Encrypted Connection
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AuthModal;