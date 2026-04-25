import React, { useState } from "react";
import { MdEmail, MdLock, MdPhone, MdPerson } from "react-icons/md";
import API from "../../utils/api";

const Register = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "", 
        password: "" 
    });
    
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: "", type: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ text: "", type: "" });

        try {
            const response = await API.post("/auth/register", formData);
            const data = response.data;
            
            console.log("🟢 Register Response:", data);
            
            if (data.success || data._id) {
                setMsg({ text: "✅ Account Created! Switching to Login...", type: "success" });
                setTimeout(() => {
                    if (onSuccess) onSuccess();
                }, 2000);
            }
        } catch (err) {
            console.log("🔴 Register Error:", err.response?.data);
            setMsg({ 
                text: `❌ ${err.response?.data?.message || "Registration Failed"}`, 
                type: "error" 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative group">
                <MdPerson className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
                <input 
                    name="name" 
                    type="text" 
                    placeholder="Full Name" 
                    onChange={handleChange} 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all" 
                    required 
                />
            </div>

            <div className="relative group">
                <MdEmail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email Address" 
                    onChange={handleChange} 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all" 
                    required 
                />
            </div>

            <div className="relative group">
                <MdPhone className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
                <input 
                    name="phone" 
                    type="tel" 
                    placeholder="Phone Number" 
                    onChange={handleChange} 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all" 
                    required 
                />
            </div>

            <div className="relative group">
                <MdLock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all" 
                    required 
                />
            </div>

            <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
                {loading ? "Creating Account..." : "Register Now"}
            </button>

            {msg.text && (
                <p className={`text-center text-sm font-medium p-2 rounded ${msg.type === "success" ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
                    {msg.text}
                </p>
            )}
        </form>
    );
};

export default Register;