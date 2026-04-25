import React, { useState } from "react";
import { MdEmail, MdArrowBack } from "react-icons/md";
import API from "../../utils/api";// Tera axios instance

const ForgotPassword = ({ onBack }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });
        try {
            const { data } = await API.post("/auth/forgot-password", { email });
            setMessage({ text: data.message, type: "success" });
        } catch (err) {
            setMessage({ text: err.response?.data?.message || "Something went wrong", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-4">
                <MdArrowBack /> Back to Login
            </button>
            
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                <p className="text-gray-400 text-sm mt-1">Humein apna email dein, hum link bhej denge.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <MdEmail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>

                <button 
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Sending Link..." : "Send Reset Link"}
                </button>
            </form>

            {message.text && (
                <p className={`text-center text-sm p-3 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
};

export default ForgotPassword;