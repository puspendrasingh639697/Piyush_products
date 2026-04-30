import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const Login = ({ onSuccess }) => {
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
        // 1. URL Check: Localhost 5000 wala route confirm karo
        const response = await API.post("/user/login", formData);
        const data = response.data; // Backend response yahan hai
        
        console.log("🔵 Full Login Response:", data);
        console.log(localStorage.getItem('token'));

        // 2. Data direct data se uthao (Kyunki backend mein 'user' object nahi hai)
        const userRole = data?.role || "user";
        
        // 3. Token aur User ko sahi se Save karo
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role // Ab ye 'admin' pakad lega
        }));
        
        console.log("✅ LocalStorage Updated!");

        // 4. Navbar ko notify karo
        window.dispatchEvent(new Event("storage"));
        
        if (onSuccess) onSuccess();
        
        // 5. Redirect Logic
        if (userRole === "admin") {
            navigate("/admin");
        } else {
            navigate("/");
        }
        
    } catch (err) {
        // Agar error aaye toh poora object print karo galti dekhne ke liye
        console.log("🔴 Login Error Details:", err.response?.data);
        setError(err.response?.data?.message || "Login fail ho gaya bhai!");
    } finally {
        setLoading(false);
    }
};

    return (
        <form onSubmit={handleLogin} className="space-y-4">
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
                {loading ? "Signing In..." : "Login"}
            </button>
            
            {error && (
                <p className="text-center text-red-400 bg-red-500/10 p-2 rounded text-sm">
                    {error}
                </p>
            )}
        </form>
    );
};

export default Login;