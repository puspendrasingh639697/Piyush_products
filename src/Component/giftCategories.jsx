import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaGift, FaHeart, FaHome, FaUsers, FaCalendarAlt, 
  FaShoppingCart, FaEye, FaStar, FaArrowRight 
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../utils/api";

// Static fallback data
const staticGiftProducts = [
  { _id: "1", name: "Premium Cookware Set", price: 4999, image: "https://via.placeholder.com/300", category: "cookware", rating: 4.5 },
  { _id: "2", name: "Elegant Serveware", price: 2999, image: "https://via.placeholder.com/300", category: "serveware", rating: 4.8 },
  { _id: "3", name: "Stainless Steel Bottle Set", price: 1299, image: "https://via.placeholder.com/300", category: "essentials", rating: 4.3 },
  { _id: "4", name: "Luxury Lunch Box", price: 899, image: "https://via.placeholder.com/300", category: "lunchbox", rating: 4.2 },
  { _id: "5", name: "Copper Utensils Set", price: 3999, image: "https://via.placeholder.com/300", category: "cookware", rating: 4.7 },
  { _id: "6", name: "Festive Gift Hamper", price: 2499, image: "https://via.placeholder.com/300", category: "serveware", rating: 4.9 },
];

const giftCategories = [
  { id: "all", label: "All Gifts", icon: FaGift },
  { id: "for-mom", label: "For Mom", icon: FaHeart, keyword: "cookware" },
  { id: "newlyweds", label: "For Newlyweds", icon: FaUsers, keyword: "serveware" },
  { id: "housewarming", label: "Housewarming", icon: FaHome, keyword: "essentials" },
  { id: "festival", label: "Festival Gifts", icon: FaCalendarAlt, keyword: "serveware" },
];

const Gifting = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData?.name) {
      setUser(userData);
      setIsLoggedIn(true);
      setFormData(prev => ({
        ...prev,
        firstName: userData.name?.split(" ")[0] || "",
        lastName: userData.name?.split(" ")[1] || "",
        email: userData.email || "",
      }));
    }
    fetchGiftProducts();
  }, []);

  const fetchGiftProducts = async () => {
    setLoading(true);
    try {
      let url = "/products/all";
      if (activeCategory !== "all") {
        const category = giftCategories.find(c => c.id === activeCategory);
        if (category && category.keyword) {
          url += `?category=${category.keyword}`;
        }
      }
      
      const response = await API.get(url);
      let data = [];
      if (Array.isArray(response.data)) data = response.data;
      else if (response.data?.products) data = response.data.products;
      
      if (data.length > 0) {
        setProducts(data.slice(0, 20));
      } else {
        setProducts(staticGiftProducts);
      }
    } catch (err) {
      console.error("API failed, using static data:", err);
      setProducts(staticGiftProducts);
      toast.info("Showing sample gift products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftProducts();
  }, [activeCategory]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isLoggedIn) {
      toast.info("Please login to submit your gifting request");
      navigate("/");
      return;
    }

    toast.success("Thank you! Our gifting expert will contact you soon.");
    setFormData({
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      phone: "",
      message: "",
    });
  };

  const addToCart = (product, e) => {
    e.stopPropagation();
    try {
      let cart = localStorage.getItem('shoppingCart');
      if (!cart) cart = [];
      else cart = JSON.parse(cart);
      
      const existingIndex = cart.findIndex(item => item.id === product._id);
      if (existingIndex !== -1) cart[existingIndex].quantity += 1;
      else cart.push({ id: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 });
      
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      toast.success(`${product.name} added to cart!`);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const buyNow = (product, e) => {
    e.stopPropagation();
    addToCart(product, e);
    setTimeout(() => navigate('/cart'), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Banner - Centered */}
      <div className="relative bg-gradient-to-r from-[#6B1622] to-[#8B1E2D] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-yellow-400 text-[#8B1E2D] px-4 py-1 rounded-full text-sm font-bold mb-4">
               PREMIUM GIFTING
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4">
              GIFT WITH LOVE
            </h1>
            <p className="text-red-200 text-lg max-w-2xl mx-auto">
              Thoughtful kitchen gifts for every occasion. Make your loved ones feel special with our premium collection.
            </p>
            <button
              onClick={() => document.getElementById('corporate-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-yellow-400 text-[#8B1E2D] px-6 py-2.5 rounded-full font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 mt-6"
            >
              Corporate Gifting <FaArrowRight />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Category Filters - Centered */}
      <div className="sticky top-0 z-40 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 justify-center flex-wrap">
            {giftCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#8B1E2D] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="text-sm" />
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {giftCategories.find(c => c.id === activeCategory)?.label || "Gift Collection"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {products.length} perfect gift{products.length !== 1 ? "s" : ""} for your loved ones
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎁</div>
            <p className="text-xl font-medium text-gray-400">No gifting products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-48">
                  <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <FaGift size={10} /> GIFT
                  </span>
                  {product.rating && (
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="text-white text-xs">{product.rating}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-[#8B1E2D] transition-colors">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#8B1E2D] font-bold text-lg">₹{product.price}</p>
                    <p className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={(e) => addToCart(product, e)} className="flex-1 bg-white border-2 border-[#8B1E2D] text-[#8B1E2D] py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-[#8B1E2D] hover:text-white transition-all">
                      <FaShoppingCart size={12} /> CART
                    </button>
                    <button onClick={(e) => buyNow(product, e)} className="flex-1 bg-[#8B1E2D] text-white py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-[#6B1622] transition-all">
                      <FaEye size={12} /> BUY
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Corporate Gifting Form - Centered on Page */}
      <div id="corporate-form" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#8B1E2D] to-[#6B1622] text-white p-6 text-center">
            <FaGift className="text-4xl mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold">Corporate Gifting</h2>
            <p className="text-red-200 mt-2">Leave your message and we'll get back to you shortly.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none transition"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none transition"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your gifting requirements..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none transition resize-none"
                required
              />
            </div>
            
            {!isLoggedIn && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-sm text-yellow-800">
                  Please <button type="button" onClick={() => navigate("/")} className="text-[#8B1E2D] font-bold hover:underline">login</button> to submit your gifting request
                </p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={!isLoggedIn}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] ${
                isLoggedIn
                  ? "bg-[#8B1E2D] hover:bg-[#6B1622]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#8B1E2D] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-light tracking-widest uppercase">LOVE YOUR LIFE</h3>
          <p className="text-red-200 text-sm mt-2">© 2024 Premium Gifting | Made with ❤️ for your loved ones</p>
        </div>
      </div>
    </div>
  );
};

export default Gifting;