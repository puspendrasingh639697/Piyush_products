import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import API from "../../utils/api";
// import API from "../api"; // Tera axios instance

const ResetPassword = () => {
    const { token } = useParams(); // URL se token nikaalne ke liye
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setMsg({ text: "Passwords do not match!", type: "error" });
        }

        setLoading(true);
        try {
            const { data } = await API.post(`/auth/reset-password/${token}`, { password });
            setMsg({ text: "Password reset successful! Redirecting to login...", type: "success" });
            
            // 3 second baad login page par bhej do
            setTimeout(() => navigate("/"), 3000);
        } catch (err) {
            setMsg({ text: err.response?.data?.message || "Link expired or invalid!", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaLock className="text-red-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase">New Password</h2>
                    <p className="text-gray-500 text-sm mt-2">Apna naya secure password set karein.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-red-600 transition-all"
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-red-600 transition-all"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                    
                    <button 
                        disabled={loading}
                        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "UPDATE PASSWORD"}
                    </button>
                </form>

                {msg.text && (
                    <div className={`mt-6 p-4 rounded-xl text-center text-sm font-bold ${msg.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {msg.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;