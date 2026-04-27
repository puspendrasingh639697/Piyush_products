// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import NotificationBell from './NotificationBell';
// import logo from "../assets/Images/LogoShoping.png";
// import {
//   RiShoppingBasketFill, RiSearchLine, RiCloseLine, RiMenu3Line,
//   RiUserLine, RiHeartLine, RiAccountCircleLine, RiLogoutBoxRLine,
//   RiDashboardLine, RiFilterLine
// } from "react-icons/ri";
// import AuthModal from "./Auth/AuthModal";
// import API from "../utils/api";
// import LanguageSwitcher from "./LanguageSwitcher";

// const Navbar = ({ card = [], cartCount = 0 }) => {
//   const { t } = useTranslation();
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchSuggestions, setSearchSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [categories, setCategories] = useState([]);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkUserRole();
//     fetchCategories();
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

//   const fetchCategories = async () => {
//     try {
//       const response = await API.get('/products/all');
//       let productsData = [];
//       if (Array.isArray(response.data)) {
//         productsData = response.data;
//       } else if (response.data?.products) {
//         productsData = response.data.products;
//       }
//       const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error("Failed to fetch categories:", err);
//     }
//   };

//   const handleSearchChange = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
    
//     if (query.trim().length > 0) {
//       try {
//         const response = await API.get(`/products/all?keyword=${encodeURIComponent(query)}`);
//         let productsData = [];
//         if (Array.isArray(response.data)) {
//           productsData = response.data;
//         } else if (response.data?.products) {
//           productsData = response.data.products;
//         }
//         setSearchSuggestions(productsData.slice(0, 5));
//         setShowSuggestions(true);
//       } catch (err) {
//         console.error("Failed to fetch suggestions:", err);
//       }
//     } else {
//       setSearchSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (searchRef.current && !searchRef.current.contains(event.target)) {
//       setShowSuggestions(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
//       if (selectedCategory) {
//         url += `&category=${selectedCategory}`;
//       }
//       if (sortBy) {
//         url += `&sort=${sortBy}`;
//       }
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

//   const clearFilters = () => {
//     setSelectedCategory("");
//     setSortBy("");
//     setShowFilters(false);
//     if (window.location.pathname === '/products') {
//       navigate('/products');
//     }
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

//   const navLinks = [
//     { name: t('nav.home'), path: "/" },
//     { name: t('nav.cookware'), path: "/", hasDropdown: true },
//     { name: t('nav.serveware'), path: "/serveware" },
//     { name: t('nav.essentials'), path: "/essentials" },
//     { name: t('nav.deals'), path: "/deals" },
//     { name: t('nav.gifting'), path: "/gifting" },
//   ];

//   const dropdownItems = [
//     "Triply cookware", "Thermoware", "Steel bottles", 
//     "Lunchbox", "Cookers", "Cookware sets", "Copper utensils"
//   ];

//   const sidebarItems = [
//     { name: t('nav.profile'), icon: RiUserLine, path: "/profile" },
//     { name: t('nav.wishlist'), icon: RiHeartLine, path: "/wishlist" },
//     { name: "Account Details", icon: RiAccountCircleLine, path: "/myaccount" },
//   ];

//   return (
//     <>
//       <nav className="sticky top-0 w-full z-50 shadow-md">
//         {/* TOP BAR */}
//         <div className="bg-[#ed9e0c] text-white text-center py-2 text-[12px] md:text-[14px]">
//           🚚 Free Shipping on all orders above ₹999! Standard for pan India
//         </div>

//         {/* MAIN HEADER */}
//         <div className="bg-[#f4c58f] px-4 md:px-12 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-black text-2xl">
//               <RiMenu3Line />
//             </button>
//        <Link to="/" className="flex items-center">
//   <img
//     src={logo}
//     alt="logo"
//     className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-24 object-contain transition-transform duration-300 hover:scale-110"
//   />
// </Link>
//           </div>

//           {/* SEARCH BAR */}
//           <div ref={searchRef} className="hidden lg:flex relative w-full max-w-lg mx-6">
//             <form onSubmit={handleSearch} className="w-full">
//               <div className="relative">
//                 <input 
//                   value={searchQuery} 
//                   onChange={handleSearchChange}
//                   onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
//                   placeholder={t('common.search')}
//                   className="w-full bg-white px-6 py-3 rounded-full outline-none shadow-sm pr-12"
//                 />
//                 <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-600 transition">
//                   <RiSearchLine className="text-xl" />
//                 </button>
//               </div>
//             </form>
            
//             {showSuggestions && searchSuggestions.length > 0 && (
//               <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
//                 {searchSuggestions.map((product) => (
//                   <div
//                     key={product._id}
//                     onClick={() => handleSuggestionClick(product)}
//                     className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
//                   >
//                     <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-gray-800">{product.name}</p>
//                       <p className="text-xs text-gray-500">₹{product.price}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {showSuggestions && searchQuery.trim() && searchSuggestions.length === 0 && (
//               <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 p-4 text-center">
//                 <p className="text-gray-500">{t('common.noProducts')} "{searchQuery}"</p>
//                 <button onClick={handleSearch} className="mt-2 text-red-600 hover:underline">
//                   {t('common.search')}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ACTION ICONS */}
//           <div className="flex items-center gap-6 md:gap-10">
//             <LanguageSwitcher />
//             <NotificationBell />

//             {/* ✅ PROFILE ICON - DIRECT PROFILE ACCESS */}
//             <button 
//               onClick={() => navigate('/profile')}
//               className="flex flex-col items-center group"
//             >
//               <RiUserLine className="text-3xl text-black group-hover:text-red-700 transition" />
//               <span className="hidden sm:block text-[12px] mt-1">Profile</span>
//             </button>

//             {/* ✅ FILTER BUTTON */}
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className="hidden lg:flex flex-col items-center group relative"
//             >
//               <RiFilterLine className="text-3xl text-black group-hover:text-red-700 transition" />
//               <span className="text-[14px] mt-1">Filter</span>
//               {(selectedCategory || sortBy) && (
//                 <span className="absolute -top-1 -right-2 w-3 h-3 bg-red-600 rounded-full"></span>
//               )}
//             </button>

//             {/* ✅ WISHLIST BUTTON - FIXED WITH NAVIGATION */}
//             <button 
//               onClick={() => navigate('/wishlist')}
//               className="flex flex-col items-center group"
//             >
//               <RiHeartLine className="text-3xl text-black group-hover:text-red-700 transition" />
//               <span className="hidden sm:block text-[14px] mt-1">{t('nav.wishlist')}</span>
//             </button>

//             {/* ✅ USER LOGIN/LOGOUT */}
//             <div className="flex flex-col items-center group">
//               {user?.name ? (
//                 <div className="flex flex-col items-center relative">
//                   <div className="text-center">
//                     <span className="hidden sm:block text-[12px] font-bold text-black">
//                       {user.name?.split(" ")[0]}
//                     </span>
//                   </div>
//                   <button 
//                     onClick={handleLogout}
//                     className="text-red-500 hover:text-red-700 mt-1"
//                     title="Logout"
//                   >
//                     <RiLogoutBoxRLine className="text-xl" />
//                   </button>
//                 </div>
//               ) : (
//                 <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center">
//                   <RiUserLine className="text-3xl text-black" />
//                   <span className="hidden sm:block text-[14px] mt-1 uppercase font-bold">Sign In</span>
//                 </button>
//               )}
//             </div>

//             {/* ✅ CART BUTTON WITH CART COUNT */}
//             <button 
//               onClick={() => navigate('/cart')} 
//               className="relative flex flex-col items-center group"
//             >
//               <RiShoppingBasketFill className="text-3xl text-black group-hover:text-red-700 transition" />
//               <span className="absolute -top-1 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//               <span className="hidden sm:block text-[14px] mt-1">{t('nav.cart')}</span>
//             </button>
//           </div>
//         </div>

//         {/* ✅ FILTERS PANEL */}
//         {showFilters && (
//           <div className="bg-white border-t border-b border-gray-200 py-4 px-12 hidden lg:block">
//             <div className="flex flex-wrap items-center gap-6">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700">Category:</span>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="px-3 py-1 border rounded-lg text-sm focus:ring-red-500"
//                 >
//                   <option value="">All</option>
//                   {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700">Sort by:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-3 py-1 border rounded-lg text-sm focus:ring-red-500"
//                 >
//                   <option value="">Default</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>
              
//               <button
//                 onClick={handleSearch}
//                 className="px-4 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
//               >
//                 Apply Filters
//               </button>
              
//               {(selectedCategory || sortBy) && (
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ✅ NAVIGATION LINKS */}
//         <div className="bg-[#bc8a5f] hidden lg:block">
//           <ul className="flex justify-center items-center gap-10 py-3">
//             {navLinks.map((link) => (
//               <li
//                 key={link.name}
//                 className="relative"
//                 onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
//                 onMouseLeave={() => setActiveDropdown(null)}
//               >
//                 <Link to={link.path} className="text-black text-[15px] font-medium hover:text-white transition-colors uppercase">
//                   {link.name}
//                 </Link>
//                 <AnimatePresence>
//                   {activeDropdown === link.name && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       className="absolute top-full left-1/2 -translate-x-1/2 w-[500px] bg-white shadow-2xl z-50 p-6 rounded-b-lg"
//                     >
//                       <div className="grid grid-cols-2 gap-3">
//                         {dropdownItems.map((item) => (
//                           <Link 
//                             key={item} 
//                             to={`/products?search=${item}`} 
//                             onClick={() => setSearchQuery(item)}
//                             className="text-[13px] font-bold text-gray-700 hover:text-red-800 transition-all uppercase"
//                           >
//                             {item}
//                           </Link>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>

//       {/* ✅ MOBILE SIDEBAR */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             <motion.div 
//               onClick={() => setIsMobileMenuOpen(false)} 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 0.5 }} 
//               exit={{ opacity: 0 }} 
//               className="fixed inset-0 bg-black z-[60]" 
//             />
//             <motion.div 
//               initial={{ x: "-100%" }} 
//               animate={{ x: 0 }} 
//               exit={{ x: "-100%" }} 
//               className="fixed left-0 top-0 h-full w-72 bg-white z-[70] shadow-xl"
//             >
//               <div className="p-5 bg-[#f4c58f] flex justify-between items-center">
//                 <img src={logo} className="h-10" alt="Logo" />
//                 <RiCloseLine className="text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
//               </div>
              
//               <form onSubmit={handleSearch} className="p-4 border-b">
//                 <div className="relative">
//                   <input 
//                     value={searchQuery} 
//                     onChange={handleSearchChange}
//                     placeholder={t('common.search')}
//                     className="w-full px-4 py-2 pr-10 border rounded-lg outline-none"
//                   />
//                   <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//                     <RiSearchLine className="text-xl" />
//                   </button>
//                 </div>
//               </form>
              
//               <div className="p-4 border-b">
//                 <p className="font-bold mb-2">Filters</p>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full p-2 border rounded-lg mb-2"
//                 >
//                   <option value="">All Categories</option>
//                   {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full p-2 border rounded-lg mb-2"
//                 >
//                   <option value="">Sort by</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//                 <div className="flex gap-2">
//                   <button onClick={handleSearch} className="flex-1 bg-red-600 text-white py-1 rounded">Apply</button>
//                   {(selectedCategory || sortBy) && (
//                     <button onClick={clearFilters} className="flex-1 bg-gray-500 text-white py-1 rounded">Clear</button>
//                   )}
//                 </div>
//               </div>
              
//               <div className="flex flex-col p-2">
//                 {navLinks.map(link => (
//                   <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="p-4 font-bold border-b text-sm text-gray-800 uppercase">
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ✅ USER ACCOUNT SIDEBAR */}
//       <AnimatePresence>
//         {isCartOpen && (
//           <>
//             <motion.div 
//               onClick={() => setIsCartOpen(false)} 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 0.5 }} 
//               exit={{ opacity: 0 }} 
//               className="fixed inset-0 bg-black z-[60]" 
//             />
//             <motion.div 
//               initial={{ x: "100%" }} 
//               animate={{ x: 0 }} 
//               exit={{ x: "100%" }} 
//               className="fixed right-0 top-0 h-full w-72 bg-white z-[70] shadow-xl flex flex-col"
//             >
//               <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-bold uppercase tracking-widest">
//                     {user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}
//                   </h2>
//                   {isAdmin && <p className="text-xs text-red-400 font-bold">ADMIN ACCESS</p>}
//                 </div>
//                 <RiCloseLine className="text-2xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
//               </div>
              
//               <div className="flex-1 p-4">
//                 {sidebarItems.map((item) => (
//                   <Link 
//                     key={item.name} 
//                     to={item.path} 
//                     onClick={() => setIsCartOpen(false)} 
//                     className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-lg font-bold text-gray-700 transition-all border-b border-gray-50"
//                   >
//                     <item.icon className="text-xl text-amber-700" /> {item.name}
//                   </Link>
//                 ))}
                
//                 {isAdmin && (
//                   <Link 
//                     to="/admin" 
//                     onClick={() => setIsCartOpen(false)} 
//                     className="flex items-center gap-4 p-4 hover:bg-orange-50 rounded-lg font-bold text-red-600 transition-all border-b border-gray-50"
//                   >
//                     <RiDashboardLine className="text-xl text-red-600" /> 
//                     Admin Dashboard
//                     <span className="ml-auto text-[8px] bg-red-100 text-red-600 px-1 rounded">ADMIN</span>
//                   </Link>
//                 )}
//               </div>
              
//               {user?.name && (
//                 <div className="p-6 border-t">
//                   <button onClick={handleLogout} className="w-full bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-800 transition-all">
//                     <RiLogoutBoxRLine /> Sign Out
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ✅ AUTH MODAL */}
//       <AnimatePresence>
//         {showAuthModal && (
//           <AuthModal onClose={() => {
//             setShowAuthModal(false);
//             checkUserRole();
//           }} />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import NotificationBell from './NotificationBell';
// import logo from "../assets/Images/LogoShoping.png";
// import {
//   RiShoppingBasketFill, RiSearchLine, RiCloseLine, RiMenu3Line,
//   RiUserLine, RiHeartLine, RiAccountCircleLine, RiLogoutBoxRLine,
//   RiDashboardLine, RiFilterLine
// } from "react-icons/ri";
// import AuthModal from "./Auth/AuthModal";
// import API from "../utils/api";
// import LanguageSwitcher from "./LanguageSwitcher";

// const Navbar = ({ card = [], cartCount = 0 }) => {
//   const { t } = useTranslation();
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchSuggestions, setSearchSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [categories, setCategories] = useState([]);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkUserRole();
//     fetchCategories();
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

//   const fetchCategories = async () => {
//     try {
//       const response = await API.get('/products/all');
//       let productsData = [];
//       if (Array.isArray(response.data)) {
//         productsData = response.data;
//       } else if (response.data?.products) {
//         productsData = response.data.products;
//       }
//       const uniqueCategories = [...new Set(productsData.map(p => p.category).filter(Boolean))];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error("Failed to fetch categories:", err);
//     }
//   };

//   const handleSearchChange = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
    
//     if (query.trim().length > 0) {
//       try {
//         const response = await API.get(`/products/all?keyword=${encodeURIComponent(query)}`);
//         let productsData = [];
//         if (Array.isArray(response.data)) {
//           productsData = response.data;
//         } else if (response.data?.products) {
//           productsData = response.data.products;
//         }
//         setSearchSuggestions(productsData.slice(0, 5));
//         setShowSuggestions(true);
//       } catch (err) {
//         console.error("Failed to fetch suggestions:", err);
//       }
//     } else {
//       setSearchSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (searchRef.current && !searchRef.current.contains(event.target)) {
//       setShowSuggestions(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
//       if (selectedCategory) {
//         url += `&category=${selectedCategory}`;
//       }
//       if (sortBy) {
//         url += `&sort=${sortBy}`;
//       }
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

//   const clearFilters = () => {
//     setSelectedCategory("");
//     setSortBy("");
//     setShowFilters(false);
//     if (window.location.pathname === '/products') {
//       navigate('/products');
//     }
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

//   const navLinks = [
//     { name: t('nav.home'), path: "/" },
//     { name: t('nav.cookware'), path: "/", hasDropdown: true },
//     { name: t('nav.serveware'), path: "/serveware" },
//     { name: t('nav.essentials'), path: "/essentials" },
//     { name: t('nav.deals'), path: "/deals" },
//     { name: t('nav.gifting'), path: "/gifting" },
//   ];

//   const dropdownItems = [
//     "Triply cookware", "Thermoware", "Steel bottles", 
//     "Lunchbox", "Cookers", "Cookware sets", "Copper utensils"
//   ];

//   const sidebarItems = [
//     { name: t('nav.profile'), icon: RiUserLine, path: "/profile" },
//     { name: t('nav.wishlist'), icon: RiHeartLine, path: "/wishlist" },
//     { name: "Account Details", icon: RiAccountCircleLine, path: "/myaccount" },
//   ];

//   return (
//     <>
//       <nav className="sticky top-0 w-full z-50 shadow-md">
//         {/* TOP BAR - Fully Responsive */}
//         <div className="bg-[#ed9e0c] text-white text-center py-2 text-[11px] sm:text-[12px] md:text-[14px] font-medium">
//           🚚 Free Shipping on all orders above ₹999 | 24/7 Customer Support
//         </div>

//         {/* MAIN HEADER - Responsive Padding */}
//         <div className="bg-[#f4c58f] px-3 sm:px-6 md:px-10 lg:px-12 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
//           {/* Left Section - Menu + Logo */}
//           <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
//             <button 
//               onClick={() => setIsMobileMenuOpen(true)} 
//               className="lg:hidden text-black hover:text-red-600 transition-colors p-1 sm:p-2"
//             >
//               <RiMenu3Line className="text-2xl sm:text-3xl" />
//             </button>
            
//             {/* Logo - Responsive Size */}
//             <Link to="/" className="flex items-center">
//               <img
//                 src={logo}
//                 alt="logo"
//                 className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 hover:scale-105"
//               />
//             </Link>
//           </div>

//           {/* DESKTOP SEARCH BAR - Hidden on mobile */}
//           <div ref={searchRef} className="hidden lg:flex relative w-full max-w-md xl:max-w-lg mx-2 xl:mx-4">
//             <form onSubmit={handleSearch} className="w-full">
//               <div className="relative">
//                 <input 
//                   value={searchQuery} 
//                   onChange={handleSearchChange}
//                   onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
//                   placeholder={t('common.search')}
//                   className="w-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full outline-none shadow-sm text-sm sm:text-base border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
//                 />
//                 <button type="submit" className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition">
//                   <RiSearchLine className="text-lg sm:text-xl" />
//                 </button>
//               </div>
//             </form>
            
//             {/* Search Suggestions */}
//             {showSuggestions && searchSuggestions.length > 0 && (
//               <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
//                 {searchSuggestions.map((product) => (
//                   <div
//                     key={product._id}
//                     onClick={() => handleSuggestionClick(product)}
//                     className="flex items-center gap-3 p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
//                   >
//                     <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded" />
//                     <div className="flex-1">
//                       <p className="text-xs sm:text-sm font-medium text-gray-800">{product.name}</p>
//                       <p className="text-[10px] sm:text-xs text-gray-500 font-semibold">₹{product.price}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {showSuggestions && searchQuery.trim() && searchSuggestions.length === 0 && (
//               <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 p-3 sm:p-4 text-center">
//                 <p className="text-xs sm:text-sm text-gray-500">No products found for "{searchQuery}"</p>
//                 <button onClick={handleSearch} className="mt-2 text-red-600 hover:underline text-xs sm:text-sm">
//                   Search all products
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* RIGHT ACTION ICONS - Fully Responsive */}
//           <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
//             {/* Language Switcher - Hidden on mobile, visible on sm+ */}
//             <div className="hidden sm:block">
//               <LanguageSwitcher />
//             </div>
            
//             {/* Notification Bell - Hidden on mobile, visible on sm+ */}
//             <div className="hidden sm:block">
//               <NotificationBell />
//             </div>

//             {/* Profile Icon */}
//             <button 
//               onClick={() => navigate('/profile')}
//               className="flex flex-col items-center group"
//             >
//               <RiUserLine className="text-xl sm:text-2xl md:text-3xl text-black group-hover:text-red-600 transition-colors" />
//               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-600 mt-0.5">Profile</span>
//             </button>

//             {/* Filter Button - Desktop only */}
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className="hidden lg:flex flex-col items-center group relative"
//             >
//               <RiFilterLine className="text-xl sm:text-2xl md:text-3xl text-black group-hover:text-red-600 transition-colors" />
//               <span className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-600 mt-0.5">Filter</span>
//               {(selectedCategory || sortBy) && (
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               )}
//             </button>

//             {/* Wishlist Button */}
//             <button 
//               onClick={() => navigate('/wishlist')}
//               className="flex flex-col items-center group"
//             >
//               <RiHeartLine className="text-xl sm:text-2xl md:text-3xl text-black group-hover:text-red-600 transition-colors" />
//               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-600 mt-0.5">Wishlist</span>
//             </button>

//             {/* User Login/Logout */}
//             <div className="flex flex-col items-center group">
//               {user?.name ? (
//                 <div className="flex flex-col items-center relative">
//                   <div className="text-center">
//                     <span className="hidden sm:block text-[10px] sm:text-[11px] md:text-[12px] font-medium text-black">
//                       {user.name?.split(" ")[0]}
//                     </span>
//                   </div>
//                   <button 
//                     onClick={handleLogout}
//                     className="text-gray-600 hover:text-red-500 transition-colors mt-0.5"
//                     title="Logout"
//                   >
//                     <RiLogoutBoxRLine className="text-lg sm:text-xl md:text-2xl" />
//                   </button>
//                 </div>
//               ) : (
//                 <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center group">
//                   <RiUserLine className="text-xl sm:text-2xl md:text-3xl text-black group-hover:text-red-600 transition-colors" />
//                   <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-600 mt-0.5 uppercase font-medium">Sign In</span>
//                 </button>
//               )}
//             </div>

//             {/* Cart Button */}
//             <button 
//               onClick={() => navigate('/cart')} 
//               className="relative flex flex-col items-center group"
//             >
//               <RiShoppingBasketFill className="text-xl sm:text-2xl md:text-3xl text-black group-hover:text-red-600 transition-colors" />
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
//                 {cartCount > 9 ? '9+' : cartCount}
//               </span>
//               <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-600 mt-0.5">{t('nav.cart')}</span>
//             </button>
//           </div>
//         </div>

//         {/* FILTERS PANEL - Desktop */}
//         {showFilters && (
//           <div className="bg-white border-t border-b border-gray-200 py-3 px-6 md:px-12 hidden lg:block">
//             <div className="flex flex-wrap items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700">Category:</span>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
//                 >
//                   <option value="">All Categories</option>
//                   {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700">Sort by:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
//                 >
//                   <option value="">Default</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>
              
//               <button
//                 onClick={handleSearch}
//                 className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors font-medium"
//               >
//                 Apply Filters
//               </button>
              
//               {(selectedCategory || sortBy) && (
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* NAVIGATION LINKS - Desktop */}
//         <div className="bg-[#bc8a5f] hidden lg:block">
//           <ul className="flex justify-center items-center gap-6 xl:gap-10 py-2">
//             {navLinks.map((link) => (
//               <li
//                 key={link.name}
//                 className="relative"
//                 onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
//                 onMouseLeave={() => setActiveDropdown(null)}
//               >
//                 <Link 
//                   to={link.path} 
//                   className="text-black text-[12px] lg:text-[13px] xl:text-[14px] font-medium hover:text-white transition-colors uppercase tracking-wide"
//                 >
//                   {link.name}
//                 </Link>
//                 <AnimatePresence>
//                   {activeDropdown === link.name && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       className="absolute top-full left-1/2 -translate-x-1/2 w-[450px] xl:w-[500px] bg-white shadow-2xl z-50 p-5 rounded-b-lg"
//                     >
//                       <div className="grid grid-cols-2 gap-2">
//                         {dropdownItems.map((item) => (
//                           <Link 
//                             key={item} 
//                             to={`/products?search=${item}`} 
//                             onClick={() => setSearchQuery(item)}
//                             className="text-[11px] xl:text-[12px] font-semibold text-gray-700 hover:text-red-600 transition-colors py-2 px-3 rounded hover:bg-gray-50"
//                           >
//                             {item}
//                           </Link>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>

//       {/* MOBILE SIDEBAR - Responsive */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             <motion.div 
//               onClick={() => setIsMobileMenuOpen(false)} 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 0.5 }} 
//               exit={{ opacity: 0 }} 
//               className="fixed inset-0 bg-black/50 z-[60]" 
//             />
//             <motion.div 
//               initial={{ x: "-100%" }} 
//               animate={{ x: 0 }} 
//               exit={{ x: "-100%" }} 
//               className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col"
//             >
//               <div className="p-4 sm:p-5 bg-[#f4c58f] flex justify-between items-center">
//                 <img src={logo} className="h-8 sm:h-10" alt="Logo" />
//                 <RiCloseLine className="text-2xl sm:text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
//               </div>
              
//               {/* Mobile Search */}
//               <form onSubmit={handleSearch} className="p-3 sm:p-4 border-b">
//                 <div className="relative">
//                   <input 
//                     value={searchQuery} 
//                     onChange={handleSearchChange}
//                     placeholder={t('common.search')}
//                     className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 border rounded-lg outline-none text-sm"
//                   />
//                   <button type="submit" className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                     <RiSearchLine className="text-lg sm:text-xl" />
//                   </button>
//                 </div>
//               </form>
              
//               {/* Mobile Filters */}
//               <div className="p-3 sm:p-4 border-b">
//                 <p className="font-semibold mb-2 text-sm">Filters</p>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full p-2 border rounded-lg mb-2 text-sm"
//                 >
//                   <option value="">All Categories</option>
//                   {categories.map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full p-2 border rounded-lg mb-2 text-sm"
//                 >
//                   <option value="">Sort by</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//                 <div className="flex gap-2 mt-2">
//                   <button onClick={() => { handleSearch(); setIsMobileMenuOpen(false); }} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-xs sm:text-sm font-medium">Apply</button>
//                   {(selectedCategory || sortBy) && (
//                     <button onClick={() => { clearFilters(); setIsMobileMenuOpen(false); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs sm:text-sm font-medium">Clear</button>
//                   )}
//                 </div>
//               </div>
              
//               {/* Mobile Navigation Links */}
//               <div className="flex-1 overflow-y-auto">
//                 {navLinks.map(link => (
//                   <Link 
//                     key={link.name} 
//                     to={link.path} 
//                     onClick={() => setIsMobileMenuOpen(false)} 
//                     className="block p-3 sm:p-4 font-medium border-b text-sm sm:text-base text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
              
//               {/* Mobile Language Switcher */}
//               <div className="p-3 sm:p-4 border-t">
//                 <LanguageSwitcher />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* USER ACCOUNT SIDEBAR */}
//       <AnimatePresence>
//         {isCartOpen && (
//           <>
//             <motion.div 
//               onClick={() => setIsCartOpen(false)} 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 0.5 }} 
//               exit={{ opacity: 0 }} 
//               className="fixed inset-0 bg-black/50 z-[60]" 
//             />
//             <motion.div 
//               initial={{ x: "100%" }} 
//               animate={{ x: 0 }} 
//               exit={{ x: "100%" }} 
//               className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col"
//             >
//               <div className="p-4 sm:p-5 bg-gray-900 text-white flex justify-between items-center">
//                 <div>
//                   <h2 className="text-base sm:text-lg font-bold">
//                     {user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}
//                   </h2>
//                   {isAdmin && <p className="text-[10px] sm:text-xs text-red-400">ADMIN ACCESS</p>}
//                 </div>
//                 <RiCloseLine className="text-xl sm:text-2xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
//               </div>
              
//               <div className="flex-1 p-3 sm:p-4">
//                 {sidebarItems.map((item) => (
//                   <Link 
//                     key={item.name} 
//                     to={item.path} 
//                     onClick={() => setIsCartOpen(false)} 
//                     className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100"
//                   >
//                     <item.icon className="text-lg sm:text-xl text-amber-600" /> {item.name}
//                   </Link>
//                 ))}
                
//                 {isAdmin && (
//                   <Link 
//                     to="/admin" 
//                     onClick={() => setIsCartOpen(false)} 
//                     className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-red-600 transition-colors border-b border-gray-100"
//                   >
//                     <RiDashboardLine className="text-lg sm:text-xl text-red-600" /> 
//                     Admin Dashboard
//                     <span className="ml-auto text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">ADMIN</span>
//                   </Link>
//                 )}
//               </div>
              
//               {user?.name && (
//                 <div className="p-3 sm:p-4 border-t">
//                   <button onClick={handleLogout} className="w-full bg-red-600 text-white py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors font-medium text-sm">
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
//           <AuthModal onClose={() => {
//             setShowAuthModal(false);
//             checkUserRole();
//           }} />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import NotificationBell from './NotificationBell';
import logo from "../assets/Images/LogoShoping.png";
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
        {/* ✅ TOP BAR - Dark Red Color (Changed from orange) */}
        <div className="bg-[#8B0000] text-white text-center py-2 text-[11px] sm:text-[12px] md:text-[14px] font-medium">
          🚚 Free Shipping on all orders above ₹999 | 24/7 Customer Support
        </div>

        {/* ✅ MAIN HEADER - White Background (Changed from beige) */}
        <div className="bg-gray-100 px-3 sm:px-6 md:px-10 lg:px-12 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 shadow-sm">
          {/* Left Section - Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden text-gray-700 hover:text-red-700 transition-colors p-1 sm:p-2"
            >
              <RiMenu3Line className="text-2xl sm:text-3xl" />
            </button>
            
            {/* Logo - Responsive Size */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="w-14 h-14 sm:w-12 sm:h-12 md:w-14 md:h-14   duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* DESKTOP SEARCH BAR - Hidden on mobile */}
          <div ref={searchRef} className="hidden lg:flex relative w-full max-w-md xl:max-w-lg mx-2 xl:mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input 
                  value={searchQuery} 
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  placeholder={t('common.search')}
                  className="w-full bg-gray-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full outline-none shadow-sm text-sm sm:text-base border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                />
                <button type="submit" className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition">
                  <RiSearchLine className="text-lg sm:text-xl" />
                </button>
              </div>
            </form>
            
            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center gap-3 p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  >
                    <img src={product.image} alt={product.name} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 font-semibold">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {showSuggestions && searchQuery.trim() && searchSuggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 p-3 sm:p-4 text-center">
                <p className="text-xs sm:text-sm text-gray-500">No products found for "{searchQuery}"</p>
                <button onClick={handleSearch} className="mt-2 text-red-600 hover:underline text-xs sm:text-sm">
                  Search all products
                </button>
              </div>
            )}
          </div>

          {/* RIGHT ACTION ICONS - Fully Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {/* Language Switcher - Hidden on mobile, visible on sm+ */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {/* Notification Bell - Hidden on mobile, visible on sm+ */}
            <div className="hidden sm:block">
              <NotificationBell />
            </div>

            {/* Profile Icon */}
            <button 
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center group"
            >
              <RiUserLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-red-600 transition-colors" />
              <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Profile</span>
            </button>

            {/* Filter Button - Desktop only */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex flex-col items-center group relative"
            >
              <RiFilterLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-red-600 transition-colors" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Filter</span>
              {(selectedCategory || sortBy) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => navigate('/wishlist')}
              className="flex flex-col items-center group"
            >
              <RiHeartLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-red-600 transition-colors" />
              <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">Wishlist</span>
            </button>

            {/* User Login/Logout */}
            <div className="flex flex-col items-center group">
              {user?.name ? (
                <div className="flex flex-col items-center relative">
                  <div className="text-center">
                    <span className="hidden sm:block text-[10px] sm:text-[11px] md:text-[12px] font-medium text-gray-700">
                      {user.name?.split(" ")[0]}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-500 transition-colors mt-0.5"
                    title="Logout"
                  >
                    <RiLogoutBoxRLine className="text-lg sm:text-xl md:text-2xl" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center group">
                  <RiUserLine className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-red-600 transition-colors" />
                  <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5 uppercase font-medium">Sign In</span>
                </button>
              )}
            </div>

            {/* Cart Button */}
            <button 
              onClick={() => navigate('/cart')} 
              className="relative flex flex-col items-center group"
            >
              <RiShoppingBasketFill className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-red-600 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-700 text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
              <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 mt-0.5">{t('nav.cart')}</span>
            </button>
          </div>
        </div>

        {/* FILTERS PANEL - Desktop */}
        {showFilters && (
          <div className="bg-white border-t border-b border-gray-200 py-3 px-6 md:px-12 hidden lg:block">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option value="">All Categories</option>
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
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              
              <button
                onClick={handleSearch}
                className="px-4 py-1.5 bg-red-700 text-white rounded-lg text-sm hover:bg-red-800 transition-colors font-medium"
              >
                Apply Filters
              </button>
              
              {(selectedCategory || sortBy) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* ✅ NAVIGATION LINKS - Dark Red Background */}
        <div className="bg-[#8B0000] hidden lg:block">
          <ul className="flex justify-center items-center gap-6 xl:gap-10 py-2">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={link.path} 
                  className="text-white text-[12px] lg:text-[13px] xl:text-[14px] font-medium hover:text-yellow-300 transition-colors uppercase tracking-wide"
                >
                  {link.name}
                </Link>
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[450px] xl:w-[500px] bg-white shadow-2xl z-50 p-5 rounded-b-lg"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {dropdownItems.map((item) => (
                          <Link 
                            key={item} 
                            to={`/products?search=${item}`} 
                            onClick={() => setSearchQuery(item)}
                            className="text-[11px] xl:text-[12px] font-semibold text-gray-700 hover:text-red-600 transition-colors py-2 px-3 rounded hover:bg-gray-50"
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

      {/* MOBILE SIDEBAR - Responsive */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              onClick={() => setIsMobileMenuOpen(false)} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/50 z-[60]" 
            />
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }} 
              className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col"
            >
              <div className="p-4 sm:p-5 bg-white border-b flex justify-between items-center">
                <img src={logo} className="h-8 sm:h-10" alt="Logo" />
                <RiCloseLine className="text-2xl sm:text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
              </div>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="p-3 sm:p-4 border-b">
                <div className="relative">
                  <input 
                    value={searchQuery} 
                    onChange={handleSearchChange}
                    placeholder={t('common.search')}
                    className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 border rounded-lg outline-none text-sm"
                  />
                  <button type="submit" className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <RiSearchLine className="text-lg sm:text-xl" />
                  </button>
                </div>
              </form>
              
              {/* Mobile Filters */}
              <div className="p-3 sm:p-4 border-b">
                <p className="font-semibold mb-2 text-sm">Filters</p>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2 text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2 text-sm"
                >
                  <option value="">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => { handleSearch(); setIsMobileMenuOpen(false); }} className="flex-1 bg-red-700 text-white py-2 rounded-lg text-xs sm:text-sm font-medium">Apply</button>
                  {(selectedCategory || sortBy) && (
                    <button onClick={() => { clearFilters(); setIsMobileMenuOpen(false); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs sm:text-sm font-medium">Clear</button>
                  )}
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="block p-3 sm:p-4 font-medium border-b text-sm sm:text-base text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Language Switcher */}
              <div className="p-3 sm:p-4 border-t">
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
            <motion.div 
              onClick={() => setIsCartOpen(false)} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/50 z-[60]" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white z-[70] shadow-xl flex flex-col"
            >
              <div className="p-4 sm:p-5 bg-gray-900 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-base sm:text-lg font-bold">
                    {user?.name ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}
                  </h2>
                  {isAdmin && <p className="text-[10px] sm:text-xs text-red-400">ADMIN ACCESS</p>}
                </div>
                <RiCloseLine className="text-xl sm:text-2xl cursor-pointer" onClick={() => setIsCartOpen(false)} />
              </div>
              
              <div className="flex-1 p-3 sm:p-4">
                {sidebarItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    onClick={() => setIsCartOpen(false)} 
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors border-b border-gray-100"
                  >
                    <item.icon className="text-lg sm:text-xl text-red-600" /> {item.name}
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsCartOpen(false)} 
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg font-medium text-red-600 transition-colors border-b border-gray-100"
                  >
                    <RiDashboardLine className="text-lg sm:text-xl text-red-600" /> 
                    Admin Dashboard
                    <span className="ml-auto text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">ADMIN</span>
                  </Link>
                )}
              </div>
              
              {user?.name && (
                <div className="p-3 sm:p-4 border-t">
                  <button onClick={handleLogout} className="w-full bg-red-700 text-white py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-800 transition-colors font-medium text-sm">
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