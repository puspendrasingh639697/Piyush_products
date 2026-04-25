import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import NotificationBell from './NotificationBell';
import logo from "../assets/Icons/logo-removebg-preview.png";
import {
  RiShoppingBasketFill, RiSearchLine, RiCloseLine, RiMenu3Line,
  RiUserLine, RiHeartLine, RiAccountCircleLine, RiLogoutBoxRLine,
  RiDashboardLine, RiFilterLine
} from "react-icons/ri";
import AuthModal from "./Auth/AuthModal";
import API from "../utils/api";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = ({ card = [], cartCount = 0 }) => {
  const { t } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categories, setCategories] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
    fetchCategories();
    window.addEventListener("storage", checkUserRole);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("storage", checkUserRole);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const checkUserRole = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
      setIsAdmin(userData?.role === "admin");
    } catch (err) {
      setUser(null);
      setIsAdmin(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get('/products/all');
      let productsData = [];
      if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data?.products) {
        productsData = response.data.products;
      }
      const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      try {
        const response = await API.get(`/products/all?keyword=${encodeURIComponent(query)}`);
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data?.products) {
          productsData = response.data.products;
        }
        setSearchSuggestions(productsData.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      }
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      if (sortBy) {
        url += `&sort=${sortBy}`;
      }
      navigate(url);
      setSearchQuery("");
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product._id}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSortBy("");
    setShowFilters(false);
    if (window.location.pathname === '/products') {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsAdmin(false);
    navigate("/");
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.cookware'), path: "/", hasDropdown: true },
    { name: t('nav.serveware'), path: "/serveware" },
    { name: t('nav.essentials'), path: "/essentials" },
    { name: t('nav.deals'), path: "/deals" },
    { name: t('nav.gifting'), path: "/gifting" },
  ];

  const dropdownItems = [
    "Triply cookware", "Thermoware", "Steel bottles", 
    "Lunchbox", "Cookers", "Cookware sets", "Copper utensils"
  ];

  const sidebarItems = [
    { name: t('nav.profile'), icon: RiUserLine, path: "/profile" },
    { name: t('nav.wishlist'), icon: RiHeartLine, path: "/wishlist" },
    { name: "Account Details", icon: RiAccountCircleLine, path: "/myaccount" },
  ];

  return (
    <>
      <nav className="sticky top-0 w-full z-50 shadow-md">
        {/* TOP BAR */}
        <div className="bg-[#ed9e0c] text-white text-center py-2 text-[12px] md:text-[14px]">
          🚚 Free Shipping on all orders above ₹999! Standard for pan India
        </div>

        {/* MAIN HEADER */}
        <div className="bg-[#f4c58f] px-4 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-black text-2xl">
              <RiMenu3Line />
            </button>
            <Link to="/">
              <img src={logo} alt="logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div ref={searchRef} className="hidden lg:flex relative w-full max-w-lg mx-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input 
                  value={searchQuery} 
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  placeholder={t('common.search')}
                  className="w-full bg-white px-6 py-3 rounded-full outline-none shadow-sm pr-12"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-600 transition">
                  <RiSearchLine className="text-xl" />
                </button>
              </div>
            </form>
            
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {showSuggestions && searchQuery.trim() && searchSuggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 p-4 text-center">
                <p className="text-gray-500">{t('common.noProducts')} "{searchQuery}"</p>
                <button onClick={handleSearch} className="mt-2 text-red-600 hover:underline">
                  {t('common.search')}
                </button>
              </div>
            )}
          </div>

          {/* ACTION ICONS */}
          <div className="flex items-center gap-6 md:gap-10">
            <LanguageSwitcher />
            <NotificationBell />

            {/* ✅ PROFILE ICON - DIRECT PROFILE ACCESS */}
            <button 
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center group"
            >
              <RiUserLine className="text-3xl text-black group-hover:text-red-700 transition" />
              <span className="hidden sm:block text-[12px] mt-1">Profile</span>
            </button>

            {/* ✅ FILTER BUTTON */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex flex-col items-center group relative"
            >
              <RiFilterLine className="text-3xl text-black group-hover:text-red-700 transition" />
              <span className="text-[14px] mt-1">Filter</span>
              {(selectedCategory || sortBy) && (
                <span className="absolute -top-1 -right-2 w-3 h-3 bg-red-600 rounded-full"></span>
              )}
            </button>

            {/* ✅ WISHLIST BUTTON - FIXED WITH NAVIGATION */}
            <button 
              onClick={() => navigate('/wishlist')}
              className="flex flex-col items-center group"
            >
              <RiHeartLine className="text-3xl text-black group-hover:text-red-700 transition" />
              <span className="hidden sm:block text-[14px] mt-1">{t('nav.wishlist')}</span>
            </button>

            {/* ✅ USER LOGIN/LOGOUT */}
            <div className="flex flex-col items-center group">
              {user?.name ? (
                <div className="flex flex-col items-center relative">
                  <div className="text-center">
                    <span className="hidden sm:block text-[12px] font-bold text-black">
                      {user.name?.split(" ")[0]}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 mt-1"
                    title="Logout"
                  >
                    <RiLogoutBoxRLine className="text-xl" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center">
                  <RiUserLine className="text-3xl text-black" />
                  <span className="hidden sm:block text-[14px] mt-1 uppercase font-bold">Sign In</span>
                </button>
              )}
            </div>

            {/* ✅ CART BUTTON WITH CART COUNT */}
            <button 
              onClick={() => navigate('/cart')} 
              className="relative flex flex-col items-center group"
            >
              <RiShoppingBasketFill className="text-3xl text-black group-hover:text-red-700 transition" />
              <span className="absolute -top-1 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
              <span className="hidden sm:block text-[14px] mt-1">{t('nav.cart')}</span>
            </button>
          </div>
        </div>

        {/* ✅ FILTERS PANEL */}
        {showFilters && (
          <div className="bg-white border-t border-b border-gray-200 py-4 px-12 hidden lg:block">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border rounded-lg text-sm focus:ring-red-500"
                >
                  <option value="">All</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border rounded-lg text-sm focus:ring-red-500"
                >
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              
              <button
                onClick={handleSearch}
                className="px-4 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Apply Filters
              </button>
              
              {(selectedCategory || sortBy) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* ✅ NAVIGATION LINKS */}
        <div className="bg-[#bc8a5f] hidden lg:block">
          <ul className="flex justify-center items-center gap-10 py-3">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={link.path} className="text-black text-[15px] font-medium hover:text-white transition-colors uppercase">
                  {link.name}
                </Link>
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[500px] bg-white shadow-2xl z-50 p-6 rounded-b-lg"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {dropdownItems.map((item) => (
                          <Link 
                            key={item} 
                            to={`/products?search=${item}`} 
                            onClick={() => setSearchQuery(item)}
                            className="text-[13px] font-bold text-gray-700 hover:text-red-800 transition-all uppercase"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ✅ MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              onClick={() => setIsMobileMenuOpen(false)} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black z-[60]" 
            />
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }} 
              className="fixed left-0 top-0 h-full w-72 bg-white z-[70] shadow-xl"
            >
              <div className="p-5 bg-[#f4c58f] flex justify-between items-center">
                <img src={logo} className="h-10" alt="Logo" />
                <RiCloseLine className="text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
              </div>
              
              <form onSubmit={handleSearch} className="p-4 border-b">
                <div className="relative">
                  <input 
                    value={searchQuery} 
                    onChange={handleSearchChange}
                    placeholder={t('common.search')}
                    className="w-full px-4 py-2 pr-10 border rounded-lg outline-none"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <RiSearchLine className="text-xl" />
                  </button>
                </div>
              </form>
              
              <div className="p-4 border-b">
                <p className="font-bold mb-2">Filters</p>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2"
                >
                  <option value="">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={handleSearch} className="flex-1 bg-red-600 text-white py-1 rounded">Apply</button>
                  {(selectedCategory || sortBy) && (
                    <button onClick={clearFilters} className="flex-1 bg-gray-500 text-white py-1 rounded">Clear</button>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col p-2">
                {navLinks.map(link => (
                  <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="p-4 font-bold border-b text-sm text-gray-800 uppercase">
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ USER ACCOUNT SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              onClick={() => setIsCartOpen(false)} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black z-[60]" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              className="fixed right-0 top-0 h-full w-72 bg-white z-[70] shadow-xl flex flex-col"
            >
              <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-widest">
                    {user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}
                  </h2>
                  {isAdmin && <p className="text-xs text-red-400 font-bold">ADMIN ACCESS</p>}
                </div>
                <RiCloseLine className="text-2xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
              </div>
              
              <div className="flex-1 p-4">
                {sidebarItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    onClick={() => setIsCartOpen(false)} 
                    className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-lg font-bold text-gray-700 transition-all border-b border-gray-50"
                  >
                    <item.icon className="text-xl text-amber-700" /> {item.name}
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsCartOpen(false)} 
                    className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-lg font-bold text-red-600 transition-all border-b border-gray-50"
                  >
                    <RiDashboardLine className="text-xl text-red-600" /> 
                    Admin Dashboard
                    <span className="ml-auto text-[8px] bg-red-100 text-red-600 px-1 rounded">ADMIN</span>
                  </Link>
                )}
              </div>
              
              {user?.name && (
                <div className="p-6 border-t">
                  <button onClick={handleLogout} className="w-full bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-800 transition-all">
                    <RiLogoutBoxRLine /> Sign Out
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ AUTH MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => {
            setShowAuthModal(false);
            checkUserRole();
          }} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;