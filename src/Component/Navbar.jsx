

// // // import React, { useState, useEffect, useRef } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { useTranslation } from "react-i18next";
// // // import NotificationBell from './NotificationBell';
// // // import logo from "../assets/Images/LogoShoping.png";
// // // import {
// // //   RiShoppingBasketFill, RiSearchLine, RiCloseLine, RiMenu3Line,
// // //   RiUserLine, RiHeartLine, RiAccountCircleLine, RiLogoutBoxRLine,
// // //   RiDashboardLine, RiFilterLine
// // // } from "react-icons/ri";
// // // import AuthModal from "./Auth/AuthModal";
// // // import API from "../utils/api";
// // // import LanguageSwitcher from "./LanguageSwitcher";

// // // const Navbar = ({ card = [], cartCount = 0 }) => {
// // //   const { t } = useTranslation();
// // //   const [activeDropdown, setActiveDropdown] = useState(null);
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [searchSuggestions, setSearchSuggestions] = useState([]);
// // //   const [showSuggestions, setShowSuggestions] = useState(false);
// // //   const [searchLoading, setSearchLoading] = useState(false);
// // //   const [isCartOpen, setIsCartOpen] = useState(false);
// // //   const [showAuthModal, setShowAuthModal] = useState(false);
// // //   const [user, setUser] = useState(null);
// // //   const [isAdmin, setIsAdmin] = useState(false);
// // //   const [showFilters, setShowFilters] = useState(false);
// // //   const [selectedCategory, setSelectedCategory] = useState("");
// // //   const [sortBy, setSortBy] = useState("");
// // //   const [categories, setCategories] = useState([]);
// // //   const searchRef = useRef(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     checkUserRole();
// // //     fetchCategories();
// // //     window.addEventListener("storage", checkUserRole);
// // //     document.addEventListener("click", handleClickOutside);
// // //     return () => {
// // //       window.removeEventListener("storage", checkUserRole);
// // //       document.removeEventListener("click", handleClickOutside);
// // //     };
// // //   }, []);

// // //   const checkUserRole = () => {
// // //     try {
// // //       const userData = JSON.parse(localStorage.getItem("user") || "{}");
// // //       setUser(userData);
// // //       setIsAdmin(userData?.role === "admin");
// // //     } catch (err) {
// // //       setUser(null);
// // //       setIsAdmin(false);
// // //     }
// // //   };

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const response = await API.get('/products/all');
// // //       let productsData = [];
// // //       if (Array.isArray(response.data)) {
// // //         productsData = response.data;
// // //       } else if (response.data?.products) {
// // //         productsData = response.data.products;
// // //       }
// // //       const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
// // //       setCategories(uniqueCategories);
// // //     } catch (err) {
// // //       console.error("Failed to fetch categories:", err);
// // //     }
// // //   };

// // //   // ✅ Improved Search Handler
// // //   const handleSearchChange = async (e) => {
// // //     const query = e.target.value;
// // //     setSearchQuery(query);
    
// // //     if (!query.trim() || query.trim().length < 2) {
// // //       setSearchSuggestions([]);
// // //       setShowSuggestions(false);
// // //       setSearchLoading(false);
// // //       return;
// // //     }
    
// // //     setSearchLoading(true);
    
// // //     try {
// // //       const response = await API.get(`/products/all?keyword=${encodeURIComponent(query)}`);
// // //       let productsData = [];
// // //       if (Array.isArray(response.data)) {
// // //         productsData = response.data;
// // //       } else if (response.data?.products) {
// // //         productsData = response.data.products;
// // //       }
      
// // //       if (productsData.length === 0) {
// // //         setSearchSuggestions([]);
// // //         setShowSuggestions(true);
// // //       } else {
// // //         setSearchSuggestions(productsData.slice(0, 5));
// // //         setShowSuggestions(true);
// // //       }
// // //     } catch (err) {
// // //       console.error("Failed to fetch suggestions:", err);
// // //       setSearchSuggestions([]);
// // //       setShowSuggestions(true);
// // //     } finally {
// // //       setSearchLoading(false);
// // //     }
// // //   };

// // //   const handleClickOutside = (event) => {
// // //     if (searchRef.current && !searchRef.current.contains(event.target)) {
// // //       setShowSuggestions(false);
// // //     }
// // //   };

// // //   const handleSearch = (e) => {
// // //     e.preventDefault();
// // //     if (searchQuery.trim()) {
// // //       let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
// // //       if (selectedCategory) url += `&category=${selectedCategory}`;
// // //       if (sortBy) url += `&sort=${sortBy}`;
// // //       navigate(url);
// // //       setSearchQuery("");
// // //       setShowSuggestions(false);
// // //       setIsMobileMenuOpen(false);
// // //     }
// // //   };

// // //   const handleSuggestionClick = (product) => {
// // //     navigate(`/product/${product._id}`);
// // //     setSearchQuery("");
// // //     setShowSuggestions(false);
// // //   };

// // //   // ✅ Clear all filters
// // //   const clearFilters = () => {
// // //     setSelectedCategory("");
// // //     setSortBy("");
// // //     setShowFilters(false);
// // //     if (window.location.pathname === '/products') {
// // //       navigate('/products');
// // //     }
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.clear();
// // //     setUser(null);
// // //     setIsAdmin(false);
// // //     navigate("/");
// // //     setIsCartOpen(false);
// // //   };

// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
// // //     };
// // //     window.addEventListener("resize", handleResize);
// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, []);

// // //   const navLinks = [
// // //     { name: t('nav.home'), path: "/" },
// // //     { name: t('nav.cookware'), path: "/", hasDropdown: true },
// // //     { name: t('nav.serveware'), path: "/serveware" },
// // //     { name: t('nav.essentials'), path: "/essentials" },
// // //     { name: t('nav.deals'), path: "/deals" },
// // //     { name: t('nav.gifting'), path: "/gifting" },
// // //   ];

// // //   const dropdownItems = [
// // //     "Triply cookware", "Thermoware", "Steel bottles", 
// // //     "Lunchbox", "Cookers", "Cookware sets", "Copper utensils"
// // //   ];

// // //   const sidebarItems = [
// // //     { name: t('nav.profile'), icon: RiUserLine, path: "/profile" },
// // //     { name: t('nav.wishlist'), icon: RiHeartLine, path: "/wishlist" },
// // //     { name: "Account Details", icon: RiAccountCircleLine, path: "/myaccount" },
// // //   ];

// // //   const getSortDisplayText = () => {
// // //     if (sortBy === 'price-low') return 'Price: Low to High';
// // //     if (sortBy === 'price-high') return 'Price: High to Low';
// // //     if (sortBy === 'newest') return 'Newest First';
// // //     return '';
// // //   };

// // //   return (
// // //     <>
// // //       <nav className="sticky top-0 w-full z-50 shadow-md">
        
        

// // //         {/* MAIN HEADER */}
// // //         <div className="bg-gray-100 px-3 sm:px-6 md:px-10 lg:px-12 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 shadow-sm">
          
// // //           {/* Left Section */}
// // //           <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
// // //             <button 
// // //               onClick={() => setIsMobileMenuOpen(true)} 
// // //               className="lg:hidden text-gray-700 hover:text-[#8B1E2D] transition-colors p-1 sm:p-2"
// // //             >
// // //               <RiMenu3Line className="text-2xl sm:text-3xl" />
// // //             </button>
            
// // //             <Link to="/" className="flex items-center">
// // //               <img
// // //                 src={logo}
// // //                 alt="logo"
// // //                 className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
// // //               />
// // //             </Link>
// // //           </div>

// // //           {/* DESKTOP SEARCH BAR */}
// // //           <div ref={searchRef} className="hidden lg:flex relative w-full max-w-md xl:max-w-lg mx-2 xl:mx-4">
// // //             <form onSubmit={handleSearch} className="w-full">
// // //               <div className="relative">
// // //                 <input 
// // //                   value={searchQuery} 
// // //                   onChange={handleSearchChange}
// // //                   onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
// // //                   placeholder={t('common.search')}
// // //                   className="w-full bg-gray-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full outline-none shadow-sm text-sm sm:text-base border border-gray-200 focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
// // //                 />
// // //                 <button type="submit" className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8B1E2D] transition">
// // //                   <RiSearchLine className="text-lg sm:text-xl" />
// // //                 </button>
// // //                 {searchLoading && (
// // //                   <div className="absolute right-12 sm:right-14 top-1/2 -translate-y-1/2">
// // //                     <div className="w-4 h-4 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin"></div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </form>
            
// // //             {showSuggestions && (
// // //               <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
// // //                 {searchLoading && searchSuggestions.length === 0 && searchQuery.trim().length >= 2 ? (
// // //                   <div className="p-4 text-center">
// // //                     <div className="w-6 h-6 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-2"></div>
// // //                     <p className="text-sm text-gray-500">Searching...</p>
// // //                   </div>
// // //                 ) : searchSuggestions.length > 0 ? (
// // //                   searchSuggestions.map((product) => (
// // //                     <div
// // //                       key={product._id}
// // //                       onClick={() => handleSuggestionClick(product)}
// // //                       className="flex items-center gap-3 p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
// // //                     >
// // //                       <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded" />
// // //                       <div className="flex-1">
// // //                         <p className="text-xs sm:text-sm font-medium text-gray-800">{product.name}</p>
// // //                         <p className="text-[10px] sm:text-xs text-[#8B1E2D] font-semibold">₹{product.price}</p>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 ) : searchQuery.trim().length >= 2 && !searchLoading ? (
// // //                   <div className="p-4 text-center">
// // //                     <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
// // //                     <button onClick={handleSearch} className="mt-2 text-[#8B1E2D] hover:underline text-sm">Search all products</button>
// // //                   </div>
// // //                 ) : null}
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* RIGHT ACTION ICONS */}
// // //           <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
// // //             <div className="hidden sm:block"><LanguageSwitcher /></div>
// // //             <div className="hidden sm:block"><NotificationBell /></div>

// // //             {/* Filter Button with Active Indicator */}
// // //             <button onClick={() => setShowFilters(!showFilters)} className="hidden lg:flex flex-col items-center group relative">
// // //               <RiFilterLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// // //               <span className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Filter</span>
// // //               {(selectedCategory || sortBy) && (
// // //                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B1E2D] rounded-full"></span>
// // //               )}
// // //             </button>

// // //             <button onClick={() => navigate('/wishlist')} className="flex flex-col items-center group">
// // //               <RiHeartLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// // //               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Wishlist</span>
// // //             </button>

// // //             <div className="flex flex-col items-center group">
// // //               {user?.name ? (
// // //                 <div className="flex flex-col items-center relative">
// // //                   <span className="hidden sm:block text-[10px] sm:text-[11px] md:text-[12px] font-medium text-gray-700">{user.name?.split(" ")[0]}</span>
// // //                   <button onClick={handleLogout} className="text-gray-500 hover:text-[#8B1E2D] transition-colors mt-0.5">
// // //                     <RiLogoutBoxRLine className="text-lg sm:text-xl md:text-2xl" />
// // //                   </button>
// // //                 </div>
// // //               ) : (
// // //                 <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center group">
// // //                   <RiUserLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// // //                   <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 uppercase font-medium">Sign In</span>
// // //                 </button>
// // //               )}
// // //             </div>

// // //             <button onClick={() => navigate('/cart')} className="relative flex flex-col items-center group">
// // //               <RiShoppingBasketFill className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// // //               <span className="absolute -top-2 -right-2 bg-[#8B1E2D] text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
// // //                 {cartCount > 9 ? '9+' : cartCount}
// // //               </span>
// // //               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">{t('nav.cart')}</span>
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* ✅ FILTERS PANEL - IMPROVED WITH ACTIVE FILTERS DISPLAY */}
// // //         {showFilters && (
// // //           <div className="bg-white border-t border-b border-gray-200 py-3 px-6 md:px-12">
// // //             <div className="flex flex-wrap items-center gap-4">
// // //               <div className="flex items-center gap-2">
// // //                 <span className="text-sm font-medium text-gray-700">Category:</span>
// // //                 <select
// // //                   value={selectedCategory}
// // //                   onChange={(e) => setSelectedCategory(e.target.value)}
// // //                   className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none"
// // //                 >
// // //                   <option value="">All Categories</option>
// // //                   {categories.map(cat => (
// // //                     <option key={cat} value={cat}>{cat}</option>
// // //                   ))}
// // //                 </select>
// // //               </div>
              
// // //               <div className="flex items-center gap-2">
// // //                 <span className="text-sm font-medium text-gray-700">Sort by:</span>
// // //                 <select
// // //                   value={sortBy}
// // //                   onChange={(e) => setSortBy(e.target.value)}
// // //                   className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none"
// // //                 >
// // //                   <option value="">Default</option>
// // //                   <option value="price-low">Price: Low to High</option>
// // //                   <option value="price-high">Price: High to Low</option>
// // //                   <option value="newest">Newest First</option>
// // //                 </select>
// // //               </div>
              
// // //               <button
// // //                 onClick={handleSearch}
// // //                 className="px-4 py-1.5 bg-[#8B1E2D] text-white rounded-lg text-sm hover:bg-[#6B1622] transition-colors font-medium"
// // //               >
// // //                 Apply Filters
// // //               </button>
              
// // //               {(selectedCategory || sortBy) && (
// // //                 <button
// // //                   onClick={clearFilters}
// // //                   className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium flex items-center gap-1"
// // //                 >
// // //                   <RiCloseLine size={14} /> Clear Filters
// // //                 </button>
// // //               )}
// // //             </div>
            
// // //             {/* ✅ Active Filters Display Tags */}
// // //             {(selectedCategory || sortBy) && (
// // //               <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
// // //                 <span className="text-xs text-gray-500">Active filters:</span>
// // //                 {selectedCategory && (
// // //                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs">
// // //                     Category: {selectedCategory}
// // //                     <button onClick={() => setSelectedCategory('')} className="hover:text-red-700">
// // //                       <RiCloseLine size={12} />
// // //                     </button>
// // //                   </span>
// // //                 )}
// // //                 {sortBy && (
// // //                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs">
// // //                     Sort: {getSortDisplayText()}
// // //                     <button onClick={() => setSortBy('')} className="hover:text-red-700">
// // //                       <RiCloseLine size={12} />
// // //                     </button>
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* NAVIGATION LINKS */}
// // //         <div className="bg-[#8B1E2D] hidden lg:block">
// // //           <ul className="flex justify-center items-center gap-6 xl:gap-10 py-2">
// // //             {navLinks.map((link) => (
// // //               <li key={link.name} className="relative" onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)} onMouseLeave={() => setActiveDropdown(null)}>
// // //                 <Link to={link.path} className="text-white text-[12px] lg:text-[13px] xl:text-[14px] font-medium hover:text-yellow-300 transition-colors uppercase tracking-wide">
// // //                   {link.name}
// // //                 </Link>
// // //                 <AnimatePresence>
// // //                   {activeDropdown === link.name && (
// // //                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full left-1/2 -translate-x-1/2 w-[450px] xl:w-[500px] bg-white shadow-2xl z-50 p-5 rounded-b-lg">
// // //                       <div className="grid grid-cols-2 gap-2">
// // //                         {dropdownItems.map((item) => (
// // //                           <Link key={item} to={`/products?search=${item}`} onClick={() => setSearchQuery(item)} className="text-[11px] xl:text-[12px] font-semibold text-gray-700 hover:text-[#8B1E2D] transition-colors py-2 px-3 rounded hover:bg-gray-50">
// // //                             {item}
// // //                           </Link>
// // //                         ))}
// // //                       </div>
// // //                     </motion.div>
// // //                   )}
// // //                 </AnimatePresence>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       </nav>

// // //       {/* MOBILE SIDEBAR */}
// // //       <AnimatePresence>
// // //         {isMobileMenuOpen && (
// // //           <>
// // //             <motion.div onClick={() => setIsMobileMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" />
// // //             <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col">
// // //               <div className="p-4 sm:p-5 bg-white border-b flex justify-between items-center">
// // //                 <img src={logo} className="h-8 sm:h-10" alt="Logo" />
// // //                 <RiCloseLine className="text-2xl sm:text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
// // //               </div>
              
// // //               <form onSubmit={handleSearch} className="p-3 sm:p-4 border-b">
// // //                 <div className="relative">
// // //                   <input value={searchQuery} onChange={handleSearchChange} placeholder={t('common.search')} className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 border rounded-lg outline-none text-sm focus:border-[#8B1E2D] focus:ring-1 focus:ring-[#8B1E2D]" />
// // //                   <button type="submit" className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B1E2D]"><RiSearchLine className="text-lg sm:text-xl" /></button>
// // //                 </div>
// // //               </form>
              
// // //               {/* Mobile Filters */}
// // //               <div className="p-3 sm:p-4 border-b">
// // //                 <div className="flex items-center justify-between mb-3">
// // //                   <p className="font-semibold text-sm">Filters</p>
// // //                   {(selectedCategory || sortBy) && (
// // //                     <button onClick={() => { setSelectedCategory(''); setSortBy(''); }} className="text-xs text-[#8B1E2D] hover:underline">Clear all</button>
// // //                   )}
// // //                 </div>
// // //                 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded-lg mb-2 text-sm focus:border-[#8B1E2D]">
// // //                   <option value="">All Categories</option>
// // //                   {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
// // //                 </select>
// // //                 <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2 border rounded-lg mb-2 text-sm focus:border-[#8B1E2D]">
// // //                   <option value="">Sort by</option>
// // //                   <option value="price-low">Price: Low to High</option>
// // //                   <option value="price-high">Price: High to Low</option>
// // //                   <option value="newest">Newest First</option>
// // //                 </select>
                
// // //                 {/* Active filters tags for mobile */}
// // //                 {(selectedCategory || sortBy) && (
// // //                   <div className="flex flex-wrap gap-1 mt-2 mb-2">
// // //                     {selectedCategory && <span className="text-xs bg-[#8B1E2D]/10 text-[#8B1E2D] px-2 py-1 rounded-full">{selectedCategory} ✕</span>}
// // //                     {sortBy && <span className="text-xs bg-[#8B1E2D]/10 text-[#8B1E2D] px-2 py-1 rounded-full">{getSortDisplayText()} ✕</span>}
// // //                   </div>
// // //                 )}
                
// // //                 <div className="flex gap-2 mt-3">
// // //                   <button onClick={() => { handleSearch(); setIsMobileMenuOpen(false); }} className="flex-1 bg-[#8B1E2D] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#6B1622]">Apply Filters</button>
// // //                   {(selectedCategory || sortBy) && (
// // //                     <button onClick={() => { clearFilters(); setIsMobileMenuOpen(false); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-300">Clear</button>
// // //                   )}
// // //                 </div>
// // //               </div>
              
// // //               <div className="flex-1 overflow-y-auto">
// // //                 {navLinks.map(link => (
// // //                   <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block p-3 sm:p-4 font-medium border-b text-sm sm:text-base text-gray-700 hover:text-[#8B1E2D] transition-colors uppercase tracking-wide">
// // //                     {link.name}
// // //                   </Link>
// // //                 ))}
// // //               </div>
              
// // //               <div className="p-3 sm:p-4 border-t">
// // //                 <LanguageSwitcher />
// // //               </div>
// // //             </motion.div>
// // //           </>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* USER ACCOUNT SIDEBAR */}
// // //       <AnimatePresence>
// // //         {isCartOpen && (
// // //           <>
// // //             <motion.div onClick={() => setIsCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" />
// // //             <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col">
// // //               <div className="p-4 sm:p-5 bg-gray-900 text-white flex justify-between items-center">
// // //                 <div>
// // //                   <h2 className="text-base sm:text-lg font-bold">{user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}</h2>
// // //                   {isAdmin && <p className="text-[10px] sm:text-xs text-[#8B1E2D]">ADMIN ACCESS</p>}
// // //                 </div>
// // //                 <RiCloseLine className="text-xl sm:text-2xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
// // //               </div>
// // //               <div className="flex-1 p-3 sm:p-4">
// // //                 {sidebarItems.map((item) => (
// // //                   <Link key={item.name} to={item.path} onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
// // //                     <item.icon className="text-lg sm:text-xl text-[#8B1E2D]" /> {item.name}
// // //                   </Link>
// // //                 ))}
// // //                 {isAdmin && (
// // //                   <Link to="/admin" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-[#8B1E2D] transition-colors border-b border-gray-100">
// // //                     <RiDashboardLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Admin Dashboard
// // //                     <span className="ml-auto text-[8px] bg-[#8B1E2D]/10 text-[#8B1E2D] px-1.5 py-0.5 rounded-full">ADMIN</span>
// // //                   </Link>
// // //                 )}
// // //               </div>
// // //               {user?.name && (
// // //                 <div className="p-3 sm:p-4 border-t">
// // //                   <button onClick={handleLogout} className="w-full bg-[#8B1E2D] text-white py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#6B1622] transition-colors font-medium text-sm">
// // //                     <RiLogoutBoxRLine /> Sign Out
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </motion.div>
// // //           </>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* AUTH MODAL */}
// // //       <AnimatePresence>
// // //         {showAuthModal && (
// // //           <AuthModal onClose={() => { setShowAuthModal(false); checkUserRole(); }} />
// // //         )}
// // //       </AnimatePresence>
// // //     </>
// // //   );
// // // };

// // // export default Navbar;

// // import React, { useState, useEffect, useRef } from "react";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useTranslation } from "react-i18next";
// // import NotificationBell from './NotificationBell';
// // import logo from "../assets/Images/LogoShoping.png";
// // import {
// //   RiShoppingBasketFill, RiSearchLine, RiCloseLine, RiMenu3Line,
// //   RiUserLine, RiHeartLine, RiAccountCircleLine, RiLogoutBoxRLine,
// //   RiDashboardLine, RiFilterLine
// // } from "react-icons/ri";
// // import AuthModal from "./Auth/AuthModal";
// // import API from "../utils/api";
// // import LanguageSwitcher from "./LanguageSwitcher";

// // const Navbar = ({ card = [], cartCount = 0 }) => {
// //   const { t } = useTranslation();
// //   const location = useLocation();
// //   const [activeDropdown, setActiveDropdown] = useState(null);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchSuggestions, setSearchSuggestions] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [searchLoading, setSearchLoading] = useState(false);
// //   const [isCartOpen, setIsCartOpen] = useState(false);
// //   const [showAuthModal, setShowAuthModal] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [sortBy, setSortBy] = useState("");
// //   const [categories, setCategories] = useState([]);
// //   const [dropdownProducts, setDropdownProducts] = useState([]); // ✅ Dynamic dropdown products
// //   const [dropdownLoading, setDropdownLoading] = useState(false);
// //   const searchRef = useRef(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     checkUserRole();
// //     fetchCategories();
// //     fetchDropdownProducts(); // ✅ Fetch products for dropdown
// //     window.addEventListener("storage", checkUserRole);
// //     document.addEventListener("click", handleClickOutside);
// //     return () => {
// //       window.removeEventListener("storage", checkUserRole);
// //       document.removeEventListener("click", handleClickOutside);
// //     };
// //   }, []);

// //   const checkUserRole = () => {
// //     try {
// //       const userData = JSON.parse(localStorage.getItem("user") || "{}");
// //       setUser(userData);
// //       setIsAdmin(userData?.role === "admin");
// //     } catch (err) {
// //       setUser(null);
// //       setIsAdmin(false);
// //     }
// //   };

// //   const fetchCategories = async () => {
// //     try {
// //       const response = await API.get('/products/all');
// //       let productsData = [];
// //       if (Array.isArray(response.data)) {
// //         productsData = response.data;
// //       } else if (response.data?.products) {
// //         productsData = response.data.products;
// //       }
// //       const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
// //       setCategories(uniqueCategories);
// //     } catch (err) {
// //       console.error("Failed to fetch categories:", err);
// //     }
// //   };

// //   // ✅ Fetch products for dropdown menu
// //   const fetchDropdownProducts = async () => {
// //     setDropdownLoading(true);
// //     try {
// //       const response = await API.get('/products/all');
// //       let productsData = [];
// //       if (Array.isArray(response.data)) {
// //         productsData = response.data;
// //       } else if (response.data?.products) {
// //         productsData = response.data.products;
// //       }
// //       // Get unique products for dropdown (limit to 8-10 items)
// //       setDropdownProducts(productsData.slice(0, 8));
// //     } catch (err) {
// //       console.error("Failed to fetch dropdown products:", err);
// //       // Fallback static items if API fails
// //       setDropdownProducts([
// //         { _id: '1', name: 'Triply cookware', category: 'cookware' },
// //         { _id: '2', name: 'Thermoware', category: 'thermoware' },
// //         { _id: '3', name: 'Steel bottles', category: 'bottles' },
// //         { _id: '4', name: 'Lunchbox', category: 'lunchbox' },
// //         { _id: '5', name: 'Cookers', category: 'cookers' },
// //         { _id: '6', name: 'Cookware sets', category: 'cookware' },
// //         { _id: '7', name: 'Copper utensils', category: 'copper' },
// //       ]);
// //     } finally {
// //       setDropdownLoading(false);
// //     }
// //   };

// //   const handleSearchChange = async (e) => {
// //     const query = e.target.value;
// //     setSearchQuery(query);
    
// //     if (!query.trim() || query.trim().length < 2) {
// //       setSearchSuggestions([]);
// //       setShowSuggestions(false);
// //       setSearchLoading(false);
// //       return;
// //     }
    
// //     setSearchLoading(true);
    
// //     try {
// //       const response = await API.get(`/products/all?keyword=${encodeURIComponent(query)}`);
// //       let productsData = [];
// //       if (Array.isArray(response.data)) {
// //         productsData = response.data;
// //       } else if (response.data?.products) {
// //         productsData = response.data.products;
// //       }
      
// //       if (productsData.length === 0) {
// //         setSearchSuggestions([]);
// //         setShowSuggestions(true);
// //       } else {
// //         setSearchSuggestions(productsData.slice(0, 5));
// //         setShowSuggestions(true);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch suggestions:", err);
// //       setSearchSuggestions([]);
// //       setShowSuggestions(true);
// //     } finally {
// //       setSearchLoading(false);
// //     }
// //   };

// //   const handleClickOutside = (event) => {
// //     if (searchRef.current && !searchRef.current.contains(event.target)) {
// //       setShowSuggestions(false);
// //     }
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
// //       if (selectedCategory) url += `&category=${selectedCategory}`;
// //       if (sortBy) url += `&sort=${sortBy}`;
// //       navigate(url);
// //       setSearchQuery("");
// //       setShowSuggestions(false);
// //       setIsMobileMenuOpen(false);
// //     }
// //   };

// //   const handleSuggestionClick = (product) => {
// //     navigate(`/product/${product._id}`);
// //     setSearchQuery("");
// //     setShowSuggestions(false);
// //   };

// //   const clearFilters = () => {
// //     setSelectedCategory("");
// //     setSortBy("");
// //     setShowFilters(false);
// //     if (window.location.pathname === '/products') {
// //       navigate('/products');
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     setUser(null);
// //     setIsAdmin(false);
// //     navigate("/");
// //     setIsCartOpen(false);
// //   };

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
// //     };
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // ✅ Helper function to check if link is active
// //   const isActiveLink = (path) => {
// //     if (path === "/") {
// //       return location.pathname === "/";
// //     }
// //     return location.pathname.startsWith(path);
// //   };

// //   const navLinks = [
// //     { name: t('nav.home'), path: "/" },
// //     { name: t('nav.cookware'), path: "/", hasDropdown: true },
// //     { name: t('nav.serveware'), path: "/serveware" },
// //     { name: t('nav.essentials'), path: "/essentials" },
// //     { name: t('nav.deals'), path: "/deals" },
// //     { name: t('nav.gifting'), path: "/gifting" },
// //   ];

// //   const getSortDisplayText = () => {
// //     if (sortBy === 'price-low') return 'Price: Low to High';
// //     if (sortBy === 'price-high') return 'Price: High to Low';
// //     if (sortBy === 'newest') return 'Newest First';
// //     return '';
// //   };

// //   return (
// //     <>
// //       <nav className="sticky top-0 w-full z-50 shadow-md">
        
// //         {/* MAIN HEADER */}
// //         <div className="bg-gray-100 px-3 sm:px-6 md:px-10 lg:px-12 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 shadow-sm">
          
// //           {/* Left Section */}
// //           <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
// //             <button 
// //               onClick={() => setIsMobileMenuOpen(true)} 
// //               className="lg:hidden text-gray-700 hover:text-[#8B1E2D] transition-colors p-1 sm:p-2"
// //             >
// //               <RiMenu3Line className="text-2xl sm:text-3xl" />
// //             </button>
            
// //             <Link to="/" className="flex items-center">
// //               <img
// //                 src={logo}
// //                 alt="logo"
// //                 className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
// //               />
// //             </Link>
// //           </div>

// //           {/* DESKTOP SEARCH BAR */}
// //           <div ref={searchRef} className="hidden lg:flex relative w-full max-w-md xl:max-w-lg mx-2 xl:mx-4">
// //             <form onSubmit={handleSearch} className="w-full">
// //               <div className="relative">
// //                 <input 
// //                   value={searchQuery} 
// //                   onChange={handleSearchChange}
// //                   onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
// //                   placeholder={t('common.search')}
// //                   className="w-full bg-gray-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full outline-none shadow-sm text-sm sm:text-base border border-gray-200 focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
// //                 />
// //                 <button type="submit" className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8B1E2D] transition">
// //                   <RiSearchLine className="text-lg sm:text-xl" />
// //                 </button>
// //                 {searchLoading && (
// //                   <div className="absolute right-12 sm:right-14 top-1/2 -translate-y-1/2">
// //                     <div className="w-4 h-4 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin"></div>
// //                   </div>
// //                 )}
// //               </div>
// //             </form>
            
// //             {showSuggestions && (
// //               <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
// //                 {searchLoading && searchSuggestions.length === 0 && searchQuery.trim().length >= 2 ? (
// //                   <div className="p-4 text-center">
// //                     <div className="w-6 h-6 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-2"></div>
// //                     <p className="text-sm text-gray-500">Searching...</p>
// //                   </div>
// //                 ) : searchSuggestions.length > 0 ? (
// //                   searchSuggestions.map((product) => (
// //                     <div
// //                       key={product._id}
// //                       onClick={() => handleSuggestionClick(product)}
// //                       className="flex items-center gap-3 p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
// //                     >
// //                       <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded" />
// //                       <div className="flex-1">
// //                         <p className="text-xs sm:text-sm font-medium text-gray-800">{product.name}</p>
// //                         <p className="text-[10px] sm:text-xs text-[#8B1E2D] font-semibold">₹{product.price}</p>
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : searchQuery.trim().length >= 2 && !searchLoading ? (
// //                   <div className="p-4 text-center">
// //                     <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
// //                     <button onClick={handleSearch} className="mt-2 text-[#8B1E2D] hover:underline text-sm">Search all products</button>
// //                   </div>
// //                 ) : null}
// //               </div>
// //             )}
// //           </div>

// //           {/* RIGHT ACTION ICONS */}
// //           <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
// //             <div className="hidden sm:block"><LanguageSwitcher /></div>
// //             <div className="hidden sm:block"><NotificationBell /></div>

// //             <button onClick={() => setShowFilters(!showFilters)} className="hidden lg:flex flex-col items-center group relative">
// //               <RiFilterLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// //               <span className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Filter</span>
// //               {(selectedCategory || sortBy) && (
// //                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B1E2D] rounded-full"></span>
// //               )}
// //             </button>

// //             <button onClick={() => navigate('/wishlist')} className="flex flex-col items-center group">
// //               <RiHeartLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// //               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Wishlist</span>
// //             </button>

// //             <div className="flex flex-col items-center group">
// //               {user?.name ? (
// //                 <div className="flex flex-col items-center relative">
// //                   <span className="hidden sm:block text-[10px] sm:text-[11px] md:text-[12px] font-medium text-gray-700">{user.name?.split(" ")[0]}</span>
// //                   <button onClick={handleLogout} className="text-gray-500 hover:text-[#8B1E2D] transition-colors mt-0.5">
// //                     <RiLogoutBoxRLine className="text-lg sm:text-xl md:text-2xl" />
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center group">
// //                   <RiUserLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// //                   <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 uppercase font-medium">Sign In</span>
// //                 </button>
// //               )}
// //             </div>

// //             <button onClick={() => navigate('/cart')} className="relative flex flex-col items-center group">
// //               <RiShoppingBasketFill className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
// //               <span className="absolute -top-2 -right-2 bg-[#8B1E2D] text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
// //                 {cartCount > 9 ? '9+' : cartCount}
// //               </span>
// //               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">{t('nav.cart')}</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* FILTERS PANEL */}
// //         {showFilters && (
// //           <div className="bg-white border-t border-b border-gray-200 py-3 px-6 md:px-12">
// //             <div className="flex flex-wrap items-center gap-4">
// //               <div className="flex items-center gap-2">
// //                 <span className="text-sm font-medium text-gray-700">Category:</span>
// //                 <select
// //                   value={selectedCategory}
// //                   onChange={(e) => setSelectedCategory(e.target.value)}
// //                   className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none"
// //                 >
// //                   <option value="">All Categories</option>
// //                   {categories.map(cat => (
// //                     <option key={cat} value={cat}>{cat}</option>
// //                   ))}
// //                 </select>
// //               </div>
              
// //               <div className="flex items-center gap-2">
// //                 <span className="text-sm font-medium text-gray-700">Sort by:</span>
// //                 <select
// //                   value={sortBy}
// //                   onChange={(e) => setSortBy(e.target.value)}
// //                   className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none"
// //                 >
// //                   <option value="">Default</option>
// //                   <option value="price-low">Price: Low to High</option>
// //                   <option value="price-high">Price: High to Low</option>
// //                   <option value="newest">Newest First</option>
// //                 </select>
// //               </div>
              
// //               <button
// //                 onClick={handleSearch}
// //                 className="px-4 py-1.5 bg-[#8B1E2D] text-white rounded-lg text-sm hover:bg-[#6B1622] transition-colors font-medium"
// //               >
// //                 Apply Filters
// //               </button>
              
// //               {(selectedCategory || sortBy) && (
// //                 <button
// //                   onClick={clearFilters}
// //                   className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium flex items-center gap-1"
// //                 >
// //                   <RiCloseLine size={14} /> Clear Filters
// //                 </button>
// //               )}
// //             </div>
            
// //             {(selectedCategory || sortBy) && (
// //               <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
// //                 <span className="text-xs text-gray-500">Active filters:</span>
// //                 {selectedCategory && (
// //                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs">
// //                     Category: {selectedCategory}
// //                     <button onClick={() => setSelectedCategory('')} className="hover:text-red-700">
// //                       <RiCloseLine size={12} />
// //                     </button>
// //                   </span>
// //                 )}
// //                 {sortBy && (
// //                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs">
// //                     Sort: {getSortDisplayText()}
// //                     <button onClick={() => setSortBy('')} className="hover:text-red-700">
// //                       <RiCloseLine size={12} />
// //                     </button>
// //                   </span>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* ✅ NAVIGATION LINKS - UPDATED WITH ACTIVE STATE AND DYNAMIC DROPDOWN */}
// //         <div className="bg-[#8B1E2D] hidden lg:block">
// //           <ul className="flex justify-center items-center gap-6 xl:gap-10 py-2">
// //             {navLinks.map((link) => (
// //               <li 
// //                 key={link.name} 
// //                 className="relative" 
// //                 onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)} 
// //                 onMouseLeave={() => setActiveDropdown(null)}
// //               >
// //                 <Link 
// //                   to={link.path} 
// //                   className={`text-[12px] lg:text-[13px] xl:text-[14px] font-medium transition-colors uppercase tracking-wide ${
// //                     isActiveLink(link.path) 
// //                       ? 'text-yellow-300' 
// //                       : 'text-white hover:text-yellow-300'
// //                   }`}
// //                 >
// //                   {link.name}
// //                 </Link>
// //                 <AnimatePresence>
// //                   {activeDropdown === link.name && (
// //                     <motion.div 
// //                       initial={{ opacity: 0, y: 10 }} 
// //                       animate={{ opacity: 1, y: 0 }} 
// //                       exit={{ opacity: 0 }} 
// //                       className="absolute top-full left-1/2 -translate-x-1/2 w-[500px] xl:w-[600px] bg-white shadow-2xl z-50 p-5 rounded-b-lg"
// //                     >
// //                       {dropdownLoading ? (
// //                         <div className="text-center py-8">
// //                           <div className="w-6 h-6 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-2"></div>
// //                           <p className="text-sm text-gray-500">Loading products...</p>
// //                         </div>
// //                       ) : (
// //                         <div className="grid grid-cols-2 gap-3">
// //                           {dropdownProducts.map((product) => (
// //                             <Link 
// //                               key={product._id} 
// //                               to={`/product/${product._id}`}
// //                               onClick={() => setSearchQuery(product.name)}
// //                               className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
// //                             >
// //                               {product.image && (
// //                                 <img 
// //                                   src={product.image} 
// //                                   alt={product.name} 
// //                                   className="w-12 h-12 object-cover rounded-md"
// //                                 />
// //                               )}
// //                               <div className="flex-1">
// //                                 <p className="text-[12px] xl:text-[13px] font-semibold text-gray-800 group-hover:text-[#8B1E2D] transition-colors line-clamp-2">
// //                                   {product.name}
// //                                 </p>
// //                                 {product.price && (
// //                                   <p className="text-[11px] text-[#8B1E2D] font-bold mt-1">
// //                                     ₹{product.price}
// //                                   </p>
// //                                 )}
// //                                 {product.category && (
// //                                   <p className="text-[10px] text-gray-400 mt-0.5">
// //                                     {product.category}
// //                                   </p>
// //                                 )}
// //                               </div>
// //                             </Link>
// //                           ))}
// //                         </div>
// //                       )}
// //                       {/* View All Products Link */}
// //                       <div className="mt-4 pt-3 border-t border-gray-100 text-center">
// //                         <Link 
// //                           to="/products" 
// //                           onClick={() => setActiveDropdown(null)}
// //                           className="text-[12px] text-[#8B1E2D] hover:text-[#6B1622] font-semibold inline-flex items-center gap-1"
// //                         >
// //                           View All Products →
// //                         </Link>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </nav>

// //       {/* MOBILE SIDEBAR */}
// //       <AnimatePresence>
// //         {isMobileMenuOpen && (
// //           <>
// //             <motion.div onClick={() => setIsMobileMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" />
// //             <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col">
// //               <div className="p-4 sm:p-5 bg-white border-b flex justify-between items-center">
// //                 <img src={logo} className="h-8 sm:h-10" alt="Logo" />
// //                 <RiCloseLine className="text-2xl sm:text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
// //               </div>
              
// //               <form onSubmit={handleSearch} className="p-3 sm:p-4 border-b">
// //                 <div className="relative">
// //                   <input value={searchQuery} onChange={handleSearchChange} placeholder={t('common.search')} className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 border rounded-lg outline-none text-sm focus:border-[#8B1E2D] focus:ring-1 focus:ring-[#8B1E2D]" />
// //                   <button type="submit" className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B1E2D]"><RiSearchLine className="text-lg sm:text-xl" /></button>
// //                 </div>
// //               </form>
              
// //               <div className="p-3 sm:p-4 border-b">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <p className="font-semibold text-sm">Filters</p>
// //                   {(selectedCategory || sortBy) && (
// //                     <button onClick={() => { setSelectedCategory(''); setSortBy(''); }} className="text-xs text-[#8B1E2D] hover:underline">Clear all</button>
// //                   )}
// //                 </div>
// //                 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded-lg mb-2 text-sm focus:border-[#8B1E2D]">
// //                   <option value="">All Categories</option>
// //                   {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
// //                 </select>
// //                 <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2 border rounded-lg mb-2 text-sm focus:border-[#8B1E2D]">
// //                   <option value="">Sort by</option>
// //                   <option value="price-low">Price: Low to High</option>
// //                   <option value="price-high">Price: High to Low</option>
// //                   <option value="newest">Newest First</option>
// //                 </select>
                
// //                 {(selectedCategory || sortBy) && (
// //                   <div className="flex flex-wrap gap-1 mt-2 mb-2">
// //                     {selectedCategory && <span className="text-xs bg-[#8B1E2D]/10 text-[#8B1E2D] px-2 py-1 rounded-full">{selectedCategory} ✕</span>}
// //                     {sortBy && <span className="text-xs bg-[#8B1E2D]/10 text-[#8B1E2D] px-2 py-1 rounded-full">{getSortDisplayText()} ✕</span>}
// //                   </div>
// //                 )}
                
// //                 <div className="flex gap-2 mt-3">
// //                   <button onClick={() => { handleSearch(); setIsMobileMenuOpen(false); }} className="flex-1 bg-[#8B1E2D] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#6B1622]">Apply Filters</button>
// //                   {(selectedCategory || sortBy) && (
// //                     <button onClick={() => { clearFilters(); setIsMobileMenuOpen(false); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-300">Clear</button>
// //                   )}
// //                 </div>
// //               </div>
              
// //               <div className="flex-1 overflow-y-auto">
// //                 {navLinks.map(link => (
// //                   <Link 
// //                     key={link.name} 
// //                     to={link.path} 
// //                     onClick={() => setIsMobileMenuOpen(false)} 
// //                     className={`block p-3 sm:p-4 font-medium border-b text-sm sm:text-base transition-colors uppercase tracking-wide ${
// //                       isActiveLink(link.path) 
// //                         ? 'text-[#8B1E2D] bg-gray-50' 
// //                         : 'text-gray-700 hover:text-[#8B1E2D]'
// //                     }`}
// //                   >
// //                     {link.name}
// //                   </Link>
// //                 ))}
// //               </div>
              
// //               <div className="p-3 sm:p-4 border-t">
// //                 <LanguageSwitcher />
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* USER ACCOUNT SIDEBAR */}
// //       <AnimatePresence>
// //         {isCartOpen && (
// //           <>
// //             <motion.div onClick={() => setIsCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" />
// //             <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col">
// //               <div className="p-4 sm:p-5 bg-gray-900 text-white flex justify-between items-center">
// //                 <div>
// //                   <h2 className="text-base sm:text-lg font-bold">{user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}</h2>
// //                   {isAdmin && <p className="text-[10px] sm:text-xs text-[#8B1E2D]">ADMIN ACCESS</p>}
// //                 </div>
// //                 <RiCloseLine className="text-xl sm:text-2xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
// //               </div>
// //               <div className="flex-1 p-3 sm:p-4">
// //                 <Link to="/profile" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
// //                   <RiUserLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Profile
// //                 </Link>
// //                 <Link to="/wishlist" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
// //                   <RiHeartLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Wishlist
// //                 </Link>
// //                 <Link to="/myaccount" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
// //                   <RiAccountCircleLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Account Details
// //                 </Link>
// //                 {isAdmin && (
// //                   <Link to="/admin" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-[#8B1E2D] transition-colors border-b border-gray-100">
// //                     <RiDashboardLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Admin Dashboard
// //                     <span className="ml-auto text-[8px] bg-[#8B1E2D]/10 text-[#8B1E2D] px-1.5 py-0.5 rounded-full">ADMIN</span>
// //                   </Link>
// //                 )}
// //               </div>
// //               {user?.name && (
// //                 <div className="p-3 sm:p-4 border-t">
// //                   <button onClick={handleLogout} className="w-full bg-[#8B1E2D] text-white py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#6B1622] transition-colors font-medium text-sm">
// //                     <RiLogoutBoxRLine /> Sign Out
// //                   </button>
// //                 </div>
// //               )}
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* AUTH MODAL */}
// //       <AnimatePresence>
// //         {showAuthModal && (
// //           <AuthModal onClose={() => { setShowAuthModal(false); checkUserRole(); }} />
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import NotificationBell from './NotificationBell';
// import logo from "../assets/Images/LogoShoping1.jpeg";
// import {
//   RiShoppingBasketFill, RiSearchLine, RiCloseLine, RiMenu3Line,
//   RiUserLine, RiHeartLine, RiAccountCircleLine, RiLogoutBoxRLine,
//   RiDashboardLine, RiFilterLine, RiArrowDownSLine
// } from "react-icons/ri";
// import AuthModal from "./Auth/AuthModal";
// import API from "../utils/api";
// import LanguageSwitcher from "./LanguageSwitcher";

// const Navbar = ({ card = [], cartCount = 0 }) => {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchSuggestions, setSearchSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [allCategories, setAllCategories] = useState([]);
//   const [subcategoryMap, setSubcategoryMap] = useState({});
//   const [mobileExpandedNav, setMobileExpandedNav] = useState(null);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkUserRole();
//     fetchAllProductData();
//     window.addEventListener("storage", checkUserRole);
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       window.removeEventListener("storage", checkUserRole);
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const checkUserRole = () => {
//     try {
//       const userData = JSON.parse(localStorage.getItem("user") || "{}");
//       setUser(userData);
//       setIsAdmin(userData?.role === "admin");
//     } catch (err) {
//       setUser(null);
//       setIsAdmin(false);
//     }
//   };

//   const fetchAllProductData = async () => {
//     try {
//       const response = await API.get('/products/all');
//       let productsData = [];
//       if (Array.isArray(response.data)) {
//         productsData = response.data;
//       } else if (response.data?.products) {
//         productsData = response.data.products;
//       }

//       // Unique top-level categories
//       const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
//       setAllCategories(uniqueCategories);

//       // Build subcategory map: { "cookware": ["Frying Pans", "Kadhais", ...], "serveware": [...] }
//       const map = {};
//       productsData.forEach(p => {
//         if (p.category) {
//           const cat = p.category.toLowerCase().trim();
//           if (!map[cat]) map[cat] = new Set();
//           if (p.subcategory) map[cat].add(p.subcategory);
//         }
//       });
//       // Convert Sets to arrays
//       const finalMap = {};
//       Object.keys(map).forEach(cat => {
//         finalMap[cat] = [...map[cat]].slice(0, 10);
//       });
//       setSubcategoryMap(finalMap);
//     } catch (err) {
//       console.error("Failed to fetch product data:", err);
//     }
//   };

//   const handleSearchChange = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (!query.trim() || query.trim().length < 2) {
//       setSearchSuggestions([]);
//       setShowSuggestions(false);
//       setSearchLoading(false);
//       return;
//     }
//     setSearchLoading(true);
//     try {
//       const response = await API.get(`/products/all?keyword=${encodeURIComponent(query)}`);
//       let productsData = [];
//       if (Array.isArray(response.data)) {
//         productsData = response.data;
//       } else if (response.data?.products) {
//         productsData = response.data.products;
//       }
//       setSearchSuggestions(productsData.slice(0, 5));
//       setShowSuggestions(true);
//     } catch (err) {
//       setSearchSuggestions([]);
//       setShowSuggestions(true);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (searchRef.current && !searchRef.current.contains(event.target)) {
//       setShowSuggestions(false);
//     }
//   };

//   const handleSearch = (e) => {
//     if (e && e.preventDefault) e.preventDefault();
//     if (searchQuery.trim()) {
//       let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
//       if (selectedCategory) url += `&category=${selectedCategory}`;
//       if (sortBy) url += `&sort=${sortBy}`;
//       navigate(url);
//       setSearchQuery("");
//       setShowSuggestions(false);
//       setIsMobileMenuOpen(false);
//     }
//   };

//   const handleSuggestionClick = (product) => {
//     navigate(`/product/${product._id}`);
//     setSearchQuery("");
//     setShowSuggestions(false);
//   };

//   const handleSubcategoryClick = (subcategory) => {
//     navigate(`/products?subcategory=${encodeURIComponent(subcategory)}`);
//     setActiveDropdown(null);
//     setIsMobileMenuOpen(false);
//   };

//   const handleNavClick = (path) => {
//     navigate(path);
//     setActiveDropdown(null);
//     setIsMobileMenuOpen(false);
//   };

//   const clearFilters = () => {
//     setSelectedCategory("");
//     setSortBy("");
//     setShowFilters(false);
//     if (window.location.pathname === '/products') navigate('/products');
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     setIsAdmin(false);
//     navigate("/");
//     setIsCartOpen(false);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isActiveLink = (path, categoryKey) => {
//     if (path === "/") return location.pathname === "/";
//     if (categoryKey) {
//       return location.pathname.startsWith(path.split('?')[0]) ||
//         location.search.includes(`category=${categoryKey}`);
//     }
//     return location.pathname.startsWith(path);
//   };

//   const getSortDisplayText = () => {
//     if (sortBy === 'price-low') return 'Price: Low to High';
//     if (sortBy === 'price-high') return 'Price: High to Low';
//     if (sortBy === 'newest') return 'Newest First';
//     return '';
//   };

//   // navLinks — categoryKey must match what's stored in DB (lowercase)
//   const navLinks = [
//     { name: t('nav.home'), path: "/", hasDropdown: false },
//     { name: t('nav.cookware'), path: "/products?category=cookware", hasDropdown: true, categoryKey: "cookware" },
//     { name: t('nav.serveware'), path: "/products?category=serveware", hasDropdown: true, categoryKey: "serveware" },
//     { name: t('nav.essentials'), path: "/products?category=essentials", hasDropdown: true, categoryKey: "essentials" },
//     { name: t('nav.deals'), path: "/deals", hasDropdown: false },
//     { name: t('nav.gifting'), path: "/gifting", hasDropdown: false },
//   ];

//   return (
//     <>
//       <nav className="sticky top-0 w-full z-50 shadow-md">

//         {/* ─── MAIN HEADER ─────────────────────────────────────────── */}
//         <div className="bg-gray-100 px-3 sm:px-6 md:px-10 lg:px-12 py-1 flex items-center justify-between gap-2 sm:gap-4 shadow-sm">

//           {/* Left: Hamburger + Logo */}
//           <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="lg:hidden text-gray-700 hover:text-[#8B1E2D] transition-colors p-1 sm:p-2"
//             >
//               <RiMenu3Line className="text-2xl sm:text-3xl" />
//             </button>
//             <Link to="/" className="flex items-center">
//               <img
//                 src={logo}
//                 alt="logo"
//                 className="h-20 sm:h-24 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105"
//               />
//             </Link>
//           </div>

//           {/* Desktop Search Bar */}
//           <div ref={searchRef} className="hidden lg:flex relative w-full max-w-md xl:max-w-lg mx-2 xl:mx-4">
//             <form onSubmit={handleSearch} className="w-full">
//               <div className="relative">
//                 <input
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
//                   placeholder={t('common.search')}
//                   className="w-full bg-gray-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full outline-none shadow-sm text-sm sm:text-base border border-gray-200 focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
//                 />
//                 <button type="submit" className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8B1E2D] transition">
//                   <RiSearchLine className="text-lg sm:text-xl" />
//                 </button>
//                 {searchLoading && (
//                   <div className="absolute right-12 sm:right-14 top-1/2 -translate-y-1/2">
//                     <div className="w-4 h-4 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin"></div>
//                   </div>
//                 )}
//               </div>
//             </form>

//             {showSuggestions && (
//               <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
//                 {searchLoading && searchSuggestions.length === 0 ? (
//                   <div className="p-4 text-center">
//                     <div className="w-6 h-6 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-2"></div>
//                     <p className="text-sm text-gray-500">Searching...</p>
//                   </div>
//                 ) : searchSuggestions.length > 0 ? (
//                   searchSuggestions.map((product) => (
//                     <div
//                       key={product._id}
//                       onClick={() => handleSuggestionClick(product)}
//                       className="flex items-center gap-3 p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
//                     >
//                       <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded" />
//                       <div className="flex-1">
//                         <p className="text-xs sm:text-sm font-medium text-gray-800">{product.name}</p>
//                         <p className="text-[10px] sm:text-xs text-[#8B1E2D] font-semibold">₹{product.price}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : searchQuery.trim().length >= 2 && !searchLoading ? (
//                   <div className="p-4 text-center">
//                     <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
//                     <button onClick={handleSearch} className="mt-2 text-[#8B1E2D] hover:underline text-sm">Search all products</button>
//                   </div>
//                 ) : null}
//               </div>
//             )}
//           </div>

//           {/* Right Action Icons */}
//           <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
//             <div className="hidden sm:block"><LanguageSwitcher /></div>
//             <div className="hidden sm:block"><NotificationBell /></div>

//             <button onClick={() => setShowFilters(!showFilters)} className="hidden lg:flex flex-col items-center group relative">
//               <RiFilterLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
//               <span className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Filter</span>
//               {(selectedCategory || sortBy) && (
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B1E2D] rounded-full"></span>
//               )}
//             </button>

//             <button onClick={() => navigate('/wishlist')} className="flex flex-col items-center group">
//               <RiHeartLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
//               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Wishlist</span>
//             </button>

//             <div className="flex flex-col items-center group">
//               {user?.name ? (
//                 <div className="flex flex-col items-center relative">
//                   <span className="hidden sm:block text-[10px] sm:text-[11px] md:text-[12px] font-medium text-gray-700">{user.name?.split(" ")[0]}</span>
//                   <button onClick={handleLogout} className="text-gray-500 hover:text-[#8B1E2D] transition-colors mt-0.5">
//                     <RiLogoutBoxRLine className="text-lg sm:text-xl md:text-2xl" />
//                   </button>
//                 </div>
//               ) : (
//                 <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center group">
//                   <RiUserLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
//                   <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 uppercase font-medium">Sign In</span>
//                 </button>
//               )}
//             </div>

//             <button onClick={() => navigate('/cart')} className="relative flex flex-col items-center group">
//               <RiShoppingBasketFill className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
//               <span className="absolute -top-2 -right-2 bg-[#8B1E2D] text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
//                 {cartCount > 9 ? '9+' : cartCount}
//               </span>
//               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">{t('nav.cart')}</span>
//             </button>
//           </div>
//         </div>

//         {/* ─── FILTERS PANEL ───────────────────────────────────────── */}
//         {showFilters && (
//           <div className="bg-white border-t border-b border-gray-200 py-3 px-6 md:px-12">
//             <div className="flex flex-wrap items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700">Category:</span>
//                 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none">
//                   <option value="">All Categories</option>
//                   {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                 </select>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700">Sort by:</span>
//                 <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none">
//                   <option value="">Default</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>
//               <button onClick={handleSearch} className="px-4 py-1.5 bg-[#8B1E2D] text-white rounded-lg text-sm hover:bg-[#6B1622] transition-colors font-medium">Apply Filters</button>
//               {(selectedCategory || sortBy) && (
//                 <button onClick={clearFilters} className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium flex items-center gap-1">
//                   <RiCloseLine size={14} /> Clear Filters
//                 </button>
//               )}
//             </div>
//             {(selectedCategory || sortBy) && (
//               <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
//                 <span className="text-xs text-gray-500">Active filters:</span>
//                 {selectedCategory && (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs">
//                     Category: {selectedCategory}
//                     <button onClick={() => setSelectedCategory('')} className="hover:text-red-700"><RiCloseLine size={12} /></button>
//                   </span>
//                 )}
//                 {sortBy && (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs">
//                     Sort: {getSortDisplayText()}
//                     <button onClick={() => setSortBy('')} className="hover:text-red-700"><RiCloseLine size={12} /></button>
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ─── DESKTOP NAV — MAHARANI STYLE SIMPLE TEXT DROPDOWNS ──── */}
//         <div className="bg-[#8B1E2D] hidden lg:block">
//           <ul className="flex justify-center items-center gap-6 xl:gap-10 py-0">
//             {navLinks.map((link) => {
//               const subs = link.categoryKey ? (subcategoryMap[link.categoryKey] || []) : [];
//               const isActive = isActiveLink(link.path, link.categoryKey);

//               return (
//                 <li
//                   key={link.name}
//                   className="relative"
//                   onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
//                   onMouseLeave={() => setActiveDropdown(null)}
//                 >
//                   {/* Nav Link */}
//                   <Link
//                     to={link.path}
//                     className={`flex items-center gap-0.5 px-1 py-3 text-[12px] lg:text-[13px] xl:text-[14px] font-semibold tracking-wide uppercase transition-colors relative group ${
//                       isActive ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
//                     }`}
//                   >
//                     {link.name}
//                     {link.hasDropdown && subs.length > 0 && (
//                       <RiArrowDownSLine className={`text-sm transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
//                     )}
//                     {/* Active underline */}
//                     <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-200 ${
//                       isActive ? 'bg-yellow-300' : 'bg-transparent group-hover:bg-yellow-300/40'
//                     }`} />
//                   </Link>

//                   {/* ── SIMPLE TEXT DROPDOWN (Maharani style) ── */}
//                   <AnimatePresence>
//                     {link.hasDropdown && activeDropdown === link.name && subs.length > 0 && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -4 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -4 }}
//                         transition={{ duration: 0.15 }}
//                         className="absolute top-full left-0 bg-white shadow-xl z-50 py-2 rounded-b-md overflow-hidden"
//                         style={{ minWidth: '200px' }}
//                       >
//                         {/* Category header link */}
//                         <button
//                           onClick={() => handleNavClick(link.path)}
//                           className="block w-full text-left px-5 py-2 text-[12px] font-bold text-[#8B1E2D] uppercase tracking-widest border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                         >
//                           All {link.name}
//                         </button>
//                         {/* Subcategory items */}
//                         {subs.map((sub) => (
//                           <button
//                             key={sub}
//                             onClick={() => handleSubcategoryClick(sub)}
//                             className="block w-full text-left px-5 py-2.5 text-[13px] font-medium text-gray-700 hover:text-[#8B1E2D] hover:bg-gray-50 uppercase tracking-wide transition-colors border-b border-gray-50 last:border-0"
//                           >
//                             {sub}
//                           </button>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </nav>

//       {/* ─── MOBILE SIDEBAR ──────────────────────────────────────────── */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             <motion.div
//               onClick={() => setIsMobileMenuOpen(false)}
//               initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-[60]"
//             />
//             <motion.div
//               initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
//               className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col"
//             >
//               <div className="p-4 sm:p-5 bg-white border-b flex justify-between items-center">
//                 <img src={logo} className="h-14 sm:h-16" alt="Logo" />
//                 <RiCloseLine className="text-2xl sm:text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
//               </div>

//               {/* Mobile Search */}
//               <form onSubmit={handleSearch} className="p-3 sm:p-4 border-b">
//                 <div className="relative">
//                   <input value={searchQuery} onChange={handleSearchChange} placeholder={t('common.search')} className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 border rounded-lg outline-none text-sm focus:border-[#8B1E2D] focus:ring-1 focus:ring-[#8B1E2D]" />
//                   <button type="submit" className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B1E2D]">
//                     <RiSearchLine className="text-lg sm:text-xl" />
//                   </button>
//                 </div>
//               </form>

//               {/* Mobile Filters */}
//               <div className="p-3 sm:p-4 border-b">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-semibold text-sm">Filters</p>
//                   {(selectedCategory || sortBy) && (
//                     <button onClick={() => { setSelectedCategory(''); setSortBy(''); }} className="text-xs text-[#8B1E2D] hover:underline">Clear all</button>
//                   )}
//                 </div>
//                 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded-lg mb-2 text-sm focus:border-[#8B1E2D]">
//                   <option value="">All Categories</option>
//                   {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                 </select>
//                 <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2 border rounded-lg mb-2 text-sm focus:border-[#8B1E2D]">
//                   <option value="">Sort by</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//                 <div className="flex gap-2 mt-2">
//                   <button onClick={() => { handleSearch(); setIsMobileMenuOpen(false); }} className="flex-1 bg-[#8B1E2D] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#6B1622]">Apply</button>
//                   {(selectedCategory || sortBy) && (
//                     <button onClick={() => { clearFilters(); setIsMobileMenuOpen(false); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-300">Clear</button>
//                   )}
//                 </div>
//               </div>

//               {/* Mobile Nav Links with expandable subcategories */}
//               <div className="flex-1 overflow-y-auto">
//                 {navLinks.map(link => {
//                   const subs = link.categoryKey ? (subcategoryMap[link.categoryKey] || []) : [];
//                   const isExpanded = mobileExpandedNav === link.name;
//                   const isActive = isActiveLink(link.path, link.categoryKey);

//                   return (
//                     <div key={link.name} className="border-b">
//                       <div className="flex items-center justify-between">
//                         <Link
//                           to={link.path}
//                           onClick={() => { if (!link.hasDropdown || subs.length === 0) setIsMobileMenuOpen(false); }}
//                           className={`flex-1 block p-3 sm:p-4 font-semibold text-sm sm:text-base transition-colors uppercase tracking-wide ${
//                             isActive ? 'text-[#8B1E2D] bg-red-50' : 'text-gray-700 hover:text-[#8B1E2D]'
//                           }`}
//                         >
//                           {link.name}
//                         </Link>
//                         {link.hasDropdown && subs.length > 0 && (
//                           <button
//                             onClick={() => setMobileExpandedNav(isExpanded ? null : link.name)}
//                             className="px-4 py-3 text-gray-400 hover:text-[#8B1E2D]"
//                           >
//                             <RiArrowDownSLine className={`text-xl transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
//                           </button>
//                         )}
//                       </div>

//                       {/* Mobile subcategory list */}
//                       <AnimatePresence>
//                         {isExpanded && subs.length > 0 && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                             className="overflow-hidden bg-gray-50"
//                           >
//                             {subs.map(sub => (
//                               <button
//                                 key={sub}
//                                 onClick={() => handleSubcategoryClick(sub)}
//                                 className="block w-full text-left px-6 py-2.5 text-sm text-gray-600 hover:text-[#8B1E2D] hover:bg-gray-100 transition-colors uppercase tracking-wide border-b border-gray-100 last:border-0"
//                               >
//                                 {sub}
//                               </button>
//                             ))}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="p-3 sm:p-4 border-t">
//                 <LanguageSwitcher />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ─── USER ACCOUNT SIDEBAR ────────────────────────────────────── */}
//       <AnimatePresence>
//         {isCartOpen && (
//           <>
//             <motion.div onClick={() => setIsCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" />
//             <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col">
//               <div className="p-4 sm:p-5 bg-gray-900 text-white flex justify-between items-center">
//                 <div>
//                   <h2 className="text-base sm:text-lg font-bold">{user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}</h2>
//                   {isAdmin && <p className="text-[10px] sm:text-xs text-yellow-400">ADMIN ACCESS</p>}
//                 </div>
//                 <RiCloseLine className="text-xl sm:text-2xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
//               </div>
//               <div className="flex-1 p-3 sm:p-4">
//                 <Link to="/profile" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
//                   <RiUserLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Profile
//                 </Link>
//                 <Link to="/wishlist" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
//                   <RiHeartLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Wishlist
//                 </Link>
//                 <Link to="/myaccount" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
//                   <RiAccountCircleLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Account Details
//                 </Link>
//                 {isAdmin && (
//                   <Link to="/admin" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-[#8B1E2D] transition-colors border-b border-gray-100">
//                     <RiDashboardLine className="text-lg sm:text-xl text-[#8B1E2D]" /> Admin Dashboard
//                     <span className="ml-auto text-[8px] bg-[#8B1E2D]/10 text-[#8B1E2D] px-1.5 py-0.5 rounded-full">ADMIN</span>
//                   </Link>
//                 )}
//               </div>
//               {user?.name && (
//                 <div className="p-3 sm:p-4 border-t">
//                   <button onClick={handleLogout} className="w-full bg-[#8B1E2D] text-white py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#6B1622] transition-colors font-medium text-sm">
//                     <RiLogoutBoxRLine /> Sign Out
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* AUTH MODAL */}
//       <AnimatePresence>
//         {showAuthModal && (
//           <AuthModal onClose={() => { setShowAuthModal(false); checkUserRole(); }} />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import NotificationBell from './NotificationBell';
import logo from "../assets/Images/LogoShoping2.png";
import {
  RiShoppingBasketFill, RiSearchLine, RiCloseLine, RiMenu3Line,
  RiUserLine, RiHeartLine, RiAccountCircleLine, RiLogoutBoxRLine,
  RiDashboardLine, RiFilterLine, RiArrowDownSLine
} from "react-icons/ri";
import AuthModal from "./Auth/AuthModal";
import API from "../utils/api";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = ({ card = [], cartCount = 0 }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const [mobileExpandedNav, setMobileExpandedNav] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
    fetchAllProductData();
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

  const fetchAllProductData = async () => {
    try {
      const response = await API.get('/products/all');
      let productsData = [];
      if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data?.products) {
        productsData = response.data.products;
      }

      const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
      setAllCategories(uniqueCategories);

      const map = {};
      productsData.forEach(p => {
        if (p.category) {
          const cat = p.category.toLowerCase().trim();
          if (!map[cat]) map[cat] = new Set();
          if (p.subcategory) map[cat].add(p.subcategory);
        }
      });
      const finalMap = {};
      Object.keys(map).forEach(cat => {
        finalMap[cat] = [...map[cat]].slice(0, 10);
      });
      setSubcategoryMap(finalMap);
    } catch (err) {
      console.error("Failed to fetch product data:", err);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim() || query.trim().length < 2) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
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
      setSearchSuggestions([]);
      setShowSuggestions(true);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (searchQuery.trim()) {
      let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory) url += `&category=${selectedCategory}`;
      if (sortBy) url += `&sort=${sortBy}`;
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

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/products?subcategory=${encodeURIComponent(subcategory)}`);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSortBy("");
    setShowFilters(false);
    if (window.location.pathname === '/products') navigate('/products');
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

  const isActiveLink = (path, categoryKey) => {
    if (path === "/") return location.pathname === "/";
    if (categoryKey) {
      return location.pathname.startsWith(path.split('?')[0]) ||
        location.search.includes(`category=${categoryKey}`);
    }
    return location.pathname.startsWith(path);
  };

  const getSortDisplayText = () => {
    if (sortBy === 'price-low') return 'Price: Low to High';
    if (sortBy === 'price-high') return 'Price: High to Low';
    if (sortBy === 'newest') return 'Newest First';
    return '';
  };

  const navLinks = [
    { name: t('nav.home'), path: "/", hasDropdown: false },
    { name: t('nav.cookware'), path: "/products?category=cookware", hasDropdown: true, categoryKey: "cookware" },
    { name: t('nav.serveware'), path: "/products?category=serveware", hasDropdown: true, categoryKey: "serveware" },
    { name: t('nav.essentials'), path: "/products?category=essentials", hasDropdown: true, categoryKey: "essentials" },
    { name: t('nav.deals'), path: "/", hasDropdown: false },
    { name: t('nav.gifting'), path: "/", hasDropdown: false },
  ];

  return (
    <>
      <nav className="sticky top-0 w-full z-50 shadow-md">

        {/* MAIN HEADER - SIZE REDUCED */}
        <div className="bg-gray-100 px-3 sm:px-6 md:px-10 lg:px-12 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-4 shadow-sm">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-gray-700 hover:text-[#8B1E2D] transition-colors p-1"
            >
              <RiMenu3Line className="text-2xl sm:text-3xl" />
            </button>
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="h-14 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div ref={searchRef} className="hidden lg:flex relative w-full max-w-md xl:max-w-lg mx-2 xl:mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                  placeholder={t('common.search')}
                  className="w-full bg-gray-50 px-6 py-2 rounded-full outline-none shadow-sm text-sm border border-gray-200 focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/20 transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8B1E2D] transition">
                  <RiSearchLine className="text-lg" />
                </button>
                {searchLoading && (
                  <div className="absolute right-12 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </form>

            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
                {searchLoading && searchSuggestions.length === 0 ? (
                  <div className="p-4 text-center">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Searching...</p>
                  </div>
                ) : searchSuggestions.length > 0 ? (
                  searchSuggestions.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleSuggestionClick(product)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                    >
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-[#8B1E2D] font-semibold">₹{product.price}</p>
                      </div>
                    </div>
                  ))
                ) : searchQuery.trim().length >= 2 && !searchLoading ? (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
                    <button onClick={handleSearch} className="mt-2 text-[#8B1E2D] hover:underline text-sm">Search all products</button>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <div className="hidden sm:block"><LanguageSwitcher /></div>
            <div className="hidden sm:block"><NotificationBell /></div>

            <button onClick={() => setShowFilters(!showFilters)} className="hidden lg:flex flex-col items-center group relative">
              <RiFilterLine className="text-2xl text-black group-hover:text-[#8B1E2D] transition-colors" />
              <span className="text-[14px] text-black mt-0.5">Filter</span>
              {(selectedCategory || sortBy) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B1E2D] rounded-full"></span>
              )}
            </button>

            <button onClick={() => navigate('/wishlist')} className="flex flex-col items-center group">
              <RiHeartLine className="text-2xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
              <span className="hidden sm:block text-[13px] text-black mt-0.5">Wishlist</span>
            </button>

            <div className="flex flex-col items-center group">
              {user?.name ? (
                <div className="flex flex-col items-center relative">
                  <span className="hidden sm:block text-[10px] font-medium text-gray-700">{user.name?.split(" ")[0]}</span>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-[#8B1E2D] transition-colors mt-0.5">
                    <RiLogoutBoxRLine className="text-xl" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center group">
                  <RiUserLine className="text-2xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
                  <span className="hidden sm:block text-[14px] text-black mt-0.5 uppercase font-medium">Sign In</span>
                </button>
              )}
            </div>

            <button onClick={() => navigate('/cart')} className="relative flex flex-col items-center group">
              <RiShoppingBasketFill className="text-2xl text-gray-700 group-hover:text-[#8B1E2D] transition-colors" />
              <span className="absolute -top-2 -right-2 bg-[#8B1E2D] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
              <span className="hidden sm:block text-[14px] text-black mt-0.5">{t('nav.cart')}</span>
            </button>
          </div>
        </div>

        {/* FILTERS PANEL */}
        {showFilters && (
          <div className="bg-white border-t border-b border-gray-200 py-2 px-6 md:px-12">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none">
                  <option value="">All Categories</option>
                  {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D] outline-none">
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <button onClick={handleSearch} className="px-4 py-1 bg-[#8B1E2D] text-white rounded-lg text-sm hover:bg-[#6B1622] transition-colors font-medium">Apply Filters</button>
              {(selectedCategory || sortBy) && (
                <button onClick={clearFilters} className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium flex items-center gap-1">
                  <RiCloseLine size={14} /> Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* DESKTOP NAVIGATION */}
        <div className="bg-[#8B1E2D] hidden lg:block">
          <ul className="flex justify-center items-center gap-6 xl:gap-8 py-1">
            {navLinks.map((link) => {
              const subs = link.categoryKey ? (subcategoryMap[link.categoryKey] || []) : [];
              const isActive = isActiveLink(link.path, link.categoryKey);

              return (
                <li
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-0.5 px-1 py-2 text-[12px] lg:text-[13px] font-semibold tracking-wide uppercase transition-colors relative group ${
                      isActive ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && subs.length > 0 && (
                      <RiArrowDownSLine className={`text-sm transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    )}
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-200 ${
                      isActive ? 'bg-yellow-300' : 'bg-transparent group-hover:bg-yellow-300/40'
                    }`} />
                  </Link>

                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.name && subs.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 bg-white shadow-xl z-50 py-1 rounded-b-md overflow-hidden"
                        style={{ minWidth: '200px' }}
                      >
                        <button
                          onClick={() => handleNavClick(link.path)}
                          className="block w-full text-left px-5 py-2 text-[12px] font-bold text-[#8B1E2D] uppercase tracking-widest border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          All {link.name}
                        </button>
                        {subs.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleSubcategoryClick(sub)}
                            className="block w-full text-left px-5 py-2 text-[12px] font-medium text-gray-700 hover:text-[#8B1E2D] hover:bg-gray-50 uppercase tracking-wide transition-colors border-b border-gray-50 last:border-0"
                          >
                            {sub}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              className="fixed left-0 top-0 h-full w-72 bg-white z-[70] shadow-xl flex flex-col"
            >
              <div className="p-4 bg-white border-b flex justify-between items-center">
                <img src={logo} className="h-10" alt="Logo" />
                <RiCloseLine className="text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
              </div>

              <form onSubmit={handleSearch} className="p-3 border-b">
                <div className="relative">
                  <input value={searchQuery} onChange={handleSearchChange} placeholder={t('common.search')} className="w-full px-3 py-2 pr-8 border rounded-lg outline-none text-sm focus:border-[#8B1E2D] focus:ring-1 focus:ring-[#8B1E2D]" />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B1E2D]">
                    <RiSearchLine className="text-lg" />
                  </button>
                </div>
              </form>

              <div className="flex-1 overflow-y-auto">
                {navLinks.map(link => {
                  const subs = link.categoryKey ? (subcategoryMap[link.categoryKey] || []) : [];
                  const isExpanded = mobileExpandedNav === link.name;
                  const isActive = isActiveLink(link.path, link.categoryKey);

                  return (
                    <div key={link.name} className="border-b">
                      <div className="flex items-center justify-between">
                        <Link
                          to={link.path}
                          onClick={() => { if (!link.hasDropdown || subs.length === 0) setIsMobileMenuOpen(false); }}
                          className={`flex-1 block p-3 font-semibold text-sm transition-colors uppercase tracking-wide ${
                            isActive ? 'text-[#8B1E2D] bg-red-50' : 'text-gray-700 hover:text-[#8B1E2D]'
                          }`}
                        >
                          {link.name}
                        </Link>
                        {link.hasDropdown && subs.length > 0 && (
                          <button
                            onClick={() => setMobileExpandedNav(isExpanded ? null : link.name)}
                            className="px-4 py-3 text-gray-400 hover:text-[#8B1E2D]"
                          >
                            <RiArrowDownSLine className={`text-xl transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {isExpanded && subs.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-gray-50"
                          >
                            {subs.map(sub => (
                              <button
                                key={sub}
                                onClick={() => handleSubcategoryClick(sub)}
                                className="block w-full text-left px-6 py-2 text-xs text-gray-600 hover:text-[#8B1E2D] hover:bg-gray-100 transition-colors uppercase tracking-wide border-b border-gray-100 last:border-0"
                              >
                                {sub}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 border-t">
                <LanguageSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* USER ACCOUNT SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div onClick={() => setIsCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-72 bg-white z-[70] shadow-xl flex flex-col">
              <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold">{user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}</h2>
                  {isAdmin && <p className="text-[10px] text-yellow-400">ADMIN ACCESS</p>}
                </div>
                <RiCloseLine className="text-xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
              </div>
              <div className="flex-1 p-3">
                <Link to="/profile" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
                  <RiUserLine className="text-lg text-[#8B1E2D]" /> Profile
                </Link>
                <Link to="/wishlist" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
                  <RiHeartLine className="text-lg text-[#8B1E2D]" /> Wishlist
                </Link>
                <Link to="/myaccount" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100">
                  <RiAccountCircleLine className="text-lg text-[#8B1E2D]" /> Account Details
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setIsCartOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg font-medium text-[#8B1E2D] transition-colors border-b border-gray-100">
                    <RiDashboardLine className="text-lg text-[#8B1E2D]" /> Admin Dashboard
                    <span className="ml-auto text-[8px] bg-[#8B1E2D]/10 text-[#8B1E2D] px-1.5 py-0.5 rounded-full">ADMIN</span>
                  </Link>
                )}
              </div>
              {user?.name && (
                <div className="p-3 border-t">
                  <button onClick={handleLogout} className="w-full bg-[#8B1E2D] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#6B1622] transition-colors font-medium text-sm">
                    <RiLogoutBoxRLine /> Sign Out
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => { setShowAuthModal(false); checkUserRole(); }} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;