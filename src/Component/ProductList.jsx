


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { 
//   FaEye, FaHeart, FaRegHeart, FaShareAlt, FaShoppingCart, FaBolt, 
//   FaFilter, FaSort, FaTimes, FaStar
// } from "react-icons/fa";
// import ProductModals from "../Component/ProductModals";
// import { fetchProducts } from "../redux/slices/productSlice";
// import { toggleWishlist, fetchWishlist } from "../redux/slices/wishlistSlice";

// const ProductList = ({ onCartUpdate }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Redux State
//   const { items: products, loading, error } = useSelector((state) => state.products);
//   const { userInfo } = useSelector((state) => state.user);
//   const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
//   // Local State
//   const [category, setCategory] = useState([]);
//   const [show, setShow] = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);

//   // Get search from URL (from Navbar search)
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const search = params.get('search');
//     const category = params.get('category');
//     const sort = params.get('sort');
    
//     if (search) setSearchKeyword(search);
//     if (category) setSelectedCategory(category);
//     if (sort) setSortBy(sort);
//   }, [location.search]);

//   // Fetch wishlist when user is logged in
//   useEffect(() => {
//     if (userInfo) {
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, userInfo]);

//   // Fetch products when filters change
//   useEffect(() => {
//     dispatch(fetchProducts({ 
//       keyword: searchKeyword, 
//       category: selectedCategory, 
//       sort: sortBy 
//     }));
//   }, [dispatch, searchKeyword, selectedCategory, sortBy]);

//   // Extract categories from products
//   useEffect(() => {
//     if (products && products.length > 0) {
//       const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
//       setCategories(['all', ...uniqueCategories]);
//     }
//   }, [products]);

//   // Reset all filters
//   const resetFilters = () => {
//     setSearchKeyword("");
//     setSelectedCategory("");
//     setSortBy("");
//     setShowFilters(false);
//     navigate('/products');
//   };

//   // Navigate to product detail
//   const goToProductDetail = (id) => {
//     navigate(`/product/${id}`);
//   };

//   // Wishlist Toggle Handler
//   const handleWishlistToggle = (e, productId) => {
//     e.stopPropagation();
//     if (!userInfo) {
//       toast.error("Please login first");
//       navigate('/');
//       return;
//     }
//     dispatch(toggleWishlist(productId));
//   };

//   // Check if product is in wishlist
//   const isInWishlist = (productId) => {
//     return wishlistItems?.some(item => item._id === productId);
//   };

//   // Add to cart handler
//   const addToCart = (product) => {
//     console.log("Add to cart clicked:", product.name);
    
//     try {
//       let cart = localStorage.getItem('shoppingCart');
//       if (!cart) {
//         cart = [];
//       } else {
//         cart = JSON.parse(cart);
//       }
      
//       const existingIndex = cart.findIndex(item => item.id === product._id);
      
//       if (existingIndex !== -1) {
//         cart[existingIndex].quantity += 1;
//       } else {
//         cart.push({
//           id: product._id,
//           name: product.name,
//           price: product.price,
//           image: product.image,
//           quantity: 1
//         });
//       }
      
//       localStorage.setItem('shoppingCart', JSON.stringify(cart));
      
//       toast.success(`${product.name} added to cart!`, {
//         position: "top-right",
//         autoClose: 1500,
//         theme: "dark",
//       });
      
//       window.dispatchEvent(new Event('storage'));
      
//       if (onCartUpdate) {
//         onCartUpdate();
//       }
      
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error("Failed to add to cart");
//     }
//   };

//   // Buy now handler
//   const buyNow = (product) => {
//     addToCart(product);
//     setTimeout(() => {
//       navigate('/cart');
//     }, 500);
//   };

//   // Quick view modal
//   const addModals = (id) => {
//     const handle = products.filter((item) => item._id === id);
//     setCategory(handle);
//     setShow(true);
//   };

//   if (loading) {
//     return (
//       <div className="w-full py-12 bg-[#f8f8f8]">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full py-12 bg-[#f8f8f8]">
//         <div className="text-center">
//           <p className="text-red-600">Error loading products: {error}</p>
//           <button onClick={() => dispatch(fetchProducts({}))} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full py-12 bg-[#f8f8f8]">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl text-red-800 font-bold uppercase tracking-widest">
//             OUR PRODUCTS
//           </h1>
//           <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
//           <p className="text-gray-500 text-sm mt-2">Discover our amazing collection</p>
//         </div>

//         {/* Filter Button Only - No Search Bar */}
//         <div className="max-w-[1400px] mx-auto px-6 mb-6">
//           <div className="flex justify-end">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-6 py-3 bg-[#8B1E2D] rounded-lg hover:bg-gray-300 transition"
//             >
//               <FaFilter className="text-white"/> <span className="text-white">Filters</span>
//               {(selectedCategory || sortBy !== '') && (
//                 <span className="ml-1 px-2 py-0.5 bg-[#8B1E2D] text-white text-xs rounded-full">
//                   {[selectedCategory && '1', sortBy && '1'].filter(Boolean).length}
//                 </span>
//               )}
//             </button>
            
//             {(searchKeyword || selectedCategory || sortBy) && (
//               <button
//                 onClick={resetFilters}
//                 className="ml-4 px-6 py-3 bg-[#8B1E2D] text-white rounded-lg hover:bg-gray-600 transition"
//               >
//                 Clear All
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Filters Panel */}
//         <AnimatePresence>
//           {showFilters && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="max-w-[1400px] mx-auto px-6 mb-6 overflow-hidden"
//             >
//               <div className="bg-[#8B1E2D] rounded-lg shadow-md p-6 border border-gray-200">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
//                   {/* Category Filter */}
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                       <FaFilter className="text-white" /> <span className="text-white">Categories</span>
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map((cat) => (
//                         <button
//                           key={cat}
//                           onClick={() => setSelectedCategory(cat === 'all' ? '' : cat)}
//                           className={`px-4 py-2 rounded-full text-sm transition-all ${
//                             (cat === 'all' && !selectedCategory) || selectedCategory === cat
//                               ? 'bg-[#8B1E2D] text-white'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           {cat === 'all' ? 'All Products' : cat}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Sort Options */}
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                       <FaSort className="text-white" /> <span className="text-white">Sort By</span>
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         onClick={() => setSortBy('')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === '' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         Default
//                       </button>
//                       <button
//                         onClick={() => setSortBy('price-low')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === 'price-low' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         Price: Low to High
//                       </button>
//                       <button
//                         onClick={() => setSortBy('price-high')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === 'price-high' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         Price: High to Low
//                       </button>
//                       <button
//                         onClick={() => setSortBy('newest')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === 'newest' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         Newest First
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Results Count */}
//         <div className="max-w-[1400px] mx-auto px-6 mb-4">
//           <p className="text-sm text-gray-600">
//             Found {products?.length || 0} product{products?.length !== 1 ? 's' : ''}
//             {searchKeyword && ` for "${searchKeyword}"`}
//             {selectedCategory && ` in ${selectedCategory}`}
//           </p>
//         </div>

//         {/* Products Grid */}
//         {!products || products.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🔍</div>
//             <p className="text-gray-500 text-lg">No products found</p>
//             <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
//             <button onClick={resetFilters} className="mt-4 text-red-600 hover:underline">
//               Clear all filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-[1400px] mx-auto">
//             {products.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white group flex flex-col border-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden"
//                 style={{ borderColor: '#8B1E2D' }}
//               >
//                 <div 
//                   className="relative h-72 bg-[#fdfdfd] flex items-center justify-center overflow-hidden cursor-pointer"
//                   onClick={() => goToProductDetail(item._id)}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-700 group-hover:scale-110"
//                   />

//                   {/* Wishlist Button - Top Right */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleWishlistToggle(e, item._id);
//                     }}
//                     className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
//                     title={isInWishlist(item._id) ? "Remove from Wishlist" : "Add to Wishlist"}
//                   >
//                     {isInWishlist(item._id) ? (
//                       <FaHeart className="text-red-500 text-xl" />
//                     ) : (
//                       <FaRegHeart className="text-gray-600 text-xl hover:text-red-500" />
//                     )}
//                   </button>
//                 </div>

//                 <div className="p-5 flex-grow">
//                   <p className="text-[12px] text-gray-500 mb-1 font-semibold uppercase">{item.category || "General"}</p>
//                   <h2 className="text-sm text-gray-800 font-bold uppercase truncate">
//                     {item.name}
//                   </h2>
                  
//                   {/* ✅ RATING STARS - ADDED */}
//                   <div className="flex items-center gap-1 mt-1">
//                     <div className="flex gap-0.5">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <FaStar 
//                           key={star}
//                           className={`text-xs ${star <= (item.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs text-gray-500">({item.numReviews || 0})</span>
//                   </div>
                  
//                   <div className="flex items-center gap-2 mt-3">
//                     <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
//                     <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.3)}</span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                {/* ✅ Action Buttons - More Prominent */}
// <div className="p-5 pt-0 flex flex-row gap-3">
//     <button
//         onClick={() => addToCart(item)}
//         className="flex-1 bg-white border-2 border-[#8B1E2D] text-[#8B1E2D] py-3 text-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#8B1E2D] hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:scale-105"
//     >
//         <FaShoppingCart size={14} /> ADD TO CART
//     </button>

//     <button
//         onClick={() => buyNow(item)}
//         className="flex-1 bg-[#8B1E2D] text-white py-3 text-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#6B1622] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:scale-105"
//     >
//         <FaBolt size={14} /> BUY NOW
//     </button>
// </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Modal */}
//       <AnimatePresence>
//         {show && (
//           <ProductModals
//             onClose={() => setShow(false)}
//             category={category}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ProductList;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHeart, FaRegHeart, FaShoppingCart, FaBolt, FaStar,
  FaPlus, FaMinus, FaTh, FaList, FaTimes, FaFilter
} from "react-icons/fa";
import { RiHome2Line, RiArrowRightSLine } from "react-icons/ri";
import { fetchProducts } from "../redux/slices/productSlice";
import { toggleWishlist, fetchWishlist } from "../redux/slices/wishlistSlice";
import API from "../utils/api";

// ─── Skeleton ────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse border border-gray-100">
    <div className="bg-gray-200 h-52 w-full" />
    <div className="p-3 space-y-2">
      <div className="bg-gray-200 h-3 rounded w-1/3" />
      <div className="bg-gray-200 h-4 rounded w-3/4" />
      <div className="bg-gray-200 h-3 rounded w-1/2" />
    </div>
    <div className="p-3 pt-0 flex gap-2">
      <div className="bg-gray-200 h-9 rounded-lg flex-1" />
      <div className="bg-gray-200 h-9 rounded-lg flex-1" />
    </div>
  </div>
);

// ─── Navbar category → DB category group mapping ─────────────
// Navbar sends: cookware / serveware / essentials
// DB has actual category values like "Steel bottles", "Copper utensils" etc.
// We group them here so navbar click shows correct products.
const NAV_TO_DB_CATEGORIES = {
  cookware:   ["Triply cookware", "Cookware sets", "Cookers (Aluminum, Steel, Triply)", "cookware"],
  serveware:  ["Copper utensils", "Steel bottles", "serveware"],
  essentials: ["Thermoware", "Lunchbox", "Casseroles", "essentials"],
};

// ─── Main Component ───────────────────────────────────────────
const ProductList = ({ onCartUpdate }) => {
  const dispatch    = useDispatch();
  const navigate    = useNavigate();
  const location    = useLocation();

  const { items: reduxProducts, loading, error } = useSelector(s => s.products);
  const { userInfo }        = useSelector(s => s.user);
  const { items: wishlistItems } = useSelector(s => s.wishlist);

  // Sidebar data (built dynamically from DB)
  const [allDbCategories, setAllDbCategories]   = useState([]); // actual DB category values
  const [subcategoryMap, setSubcategoryMap]     = useState({});
  const [expandedCats, setExpandedCats]         = useState({});

  // Active filters
  const [navCategory, setNavCategory]             = useState(""); // cookware / serveware / essentials
  const [activeDbCategory, setActiveDbCategory]   = useState(""); // exact DB category
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [sortBy, setSortBy]                       = useState("");
  const [viewMode, setViewMode]                   = useState("grid");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [products, setProducts]                   = useState([]);

  // ── 1. Read URL params ──────────────────────────────────────
  useEffect(() => {
    const p   = new URLSearchParams(location.search);
    const cat = p.get("category")?.toLowerCase() || "";
    const sub = p.get("subcategory") || "";
    const srt = p.get("sort") || "";
    const kw  = p.get("search") || "";

    setNavCategory(cat);
    setActiveDbCategory("");   // reset exact filter when nav changes
    setActiveSubcategory(sub);
    setSortBy(srt);

    if (cat) setExpandedCats(prev => ({ ...prev, [cat]: true }));

    dispatch(fetchProducts({ keyword: kw, category: "", sort: srt }));
  }, [location.search, dispatch]);

  // ── 2. Wishlist ─────────────────────────────────────────────
  useEffect(() => {
    if (userInfo) dispatch(fetchWishlist());
  }, [dispatch, userInfo]);

  // ── 3. Build sidebar from real DB data ──────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const res  = await API.get("/products/all");
        const data = Array.isArray(res.data) ? res.data : (res.data?.products || []);

        // Unique actual DB categories
        const dbCats = [...new Set(data.map(p => p.category).filter(Boolean))];
        setAllDbCategories(dbCats);

        // Build subcategory map per DB category
        const map = {};
        data.forEach(p => {
          if (p.category) {
            if (!map[p.category]) map[p.category] = new Set();
            if (p.subcategory) map[p.category].add(p.subcategory);
          }
        });
        const final = {};
        dbCats.forEach(c => { final[c] = [...(map[c] || [])]; });
        setSubcategoryMap(final);
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  // ── 4. Client-side filter ───────────────────────────────────
  useEffect(() => {
    if (!reduxProducts) return;
    let filtered = [...reduxProducts];
    const kw = new URLSearchParams(location.search).get("search") || "";

    // keyword
    if (kw) {
      const q = kw.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q)
      );
    }

    // If user clicked a specific DB category in sidebar
    if (activeDbCategory) {
      filtered = filtered.filter(p => p.category === activeDbCategory);
    } else if (navCategory) {
      // Navbar sent cookware/serveware/essentials — map to DB categories
      const dbCats = NAV_TO_DB_CATEGORIES[navCategory];
      if (dbCats) {
        filtered = filtered.filter(p =>
          dbCats.some(dc => p.category?.toLowerCase() === dc.toLowerCase())
        );
      }
    }

    // subcategory
    if (activeSubcategory) {
      filtered = filtered.filter(p => p.subcategory === activeSubcategory);
    }

    // sort
    if (sortBy === "price-low")  filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "newest")     filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setProducts(filtered);
  }, [reduxProducts, navCategory, activeDbCategory, activeSubcategory, sortBy, location.search]);

  // ── Handlers ────────────────────────────────────────────────
  const handleDbCategoryClick = (dbCat) => {
    const same = activeDbCategory === dbCat;
    setActiveDbCategory(same ? "" : dbCat);
    setActiveSubcategory("");
    setExpandedCats(prev => ({ ...prev, [dbCat]: !prev[dbCat] }));
  };

  const handleSubcatClick = (sub) => {
    setActiveSubcategory(sub);
    setMobileSidebarOpen(false);
  };

  const clearAll = () => {
    setNavCategory(""); setActiveDbCategory("");
    setActiveSubcategory(""); setSortBy("");
    navigate("/products");
  };

  const handleWishlistToggle = (e, id) => {
    e.stopPropagation();
    if (!userInfo) { toast.error("Please login first"); return; }
    dispatch(toggleWishlist(id));
  };

  const isInWishlist = (id) => wishlistItems?.some(i => i._id === id);

  const addToCart = (e, product) => {
    e.stopPropagation();
    try {
      let cart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
      const idx = cart.findIndex(i => i.id === product._id);
      if (idx !== -1) cart[idx].quantity += 1;
      else cart.push({ id: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 });
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      toast.success(`${product.name} added to cart!`, { position: "top-right", autoClose: 1500, theme: "dark" });
      window.dispatchEvent(new Event("storage"));
      if (onCartUpdate) onCartUpdate();
    } catch { toast.error("Failed to add to cart"); }
  };

  const buyNow = (e, product) => {
    addToCart(e, product);
    setTimeout(() => navigate("/cart"), 500);
  };

  // ── Helpers ─────────────────────────────────────────────────
  const getTitle = () => {
    if (activeSubcategory) return activeSubcategory;
    if (activeDbCategory)  return activeDbCategory;
    const kw = new URLSearchParams(location.search).get("search");
    if (kw) return `Search: "${kw}"`;
    if (navCategory) return navCategory.charAt(0).toUpperCase() + navCategory.slice(1);
    return "All Products";
  };

  const searchTerm = new URLSearchParams(location.search).get("search") || "";

  // Which DB categories to show in sidebar
  // If navCategory is set → show only matching DB cats; else show all
  const sidebarDbCategories = navCategory && NAV_TO_DB_CATEGORIES[navCategory]
    ? allDbCategories.filter(c =>
        NAV_TO_DB_CATEGORIES[navCategory].some(dc => c.toLowerCase() === dc.toLowerCase())
      )
    : allDbCategories;

  // ── SIDEBAR ──────────────────────────────────────────────────
  const SidebarContent = () => (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Categories</h3>
        {(navCategory || activeDbCategory || activeSubcategory) && (
          <button onClick={clearAll} className="text-[10px] text-[#8B1E2D] hover:underline font-semibold">Clear</button>
        )}
      </div>

      {sidebarDbCategories.length === 0 ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
      ) : (
        <ul className="space-y-0.5">
          {sidebarDbCategories.map(cat => {
            const subs    = subcategoryMap[cat] || [];
            const isActive = activeDbCategory === cat;
            const isOpen   = expandedCats[cat];

            return (
              <li key={cat}>
                <div className={`flex items-center justify-between rounded-lg transition-colors ${isActive ? "bg-[#8B1E2D]/10" : "hover:bg-gray-50"}`}>
                  <button
                    onClick={() => handleDbCategoryClick(cat)}
                    className={`flex-1 text-left px-3 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? "text-[#8B1E2D]" : "text-gray-700 hover:text-[#8B1E2D]"}`}
                  >
                    {cat}
                  </button>
                  {subs.length > 0 && (
                    <button
                      onClick={() => setExpandedCats(p => ({ ...p, [cat]: !p[cat] }))}
                      className="px-3 py-2.5 text-gray-400 hover:text-[#8B1E2D]"
                    >
                      {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                    </button>
                  )}
                </div>

                {isOpen && subs.length > 0 && (
                  <ul className="ml-3 border-l-2 border-gray-100 mt-0.5 mb-1">
                    {subs.map(sub => (
                      <li key={sub}>
                        <button
                          onClick={() => handleSubcatClick(sub)}
                          className={`block w-full text-left pl-4 pr-2 py-2 text-xs uppercase tracking-wide transition-colors font-medium ${
                            activeSubcategory === sub ? "text-[#8B1E2D] font-bold" : "text-gray-500 hover:text-[#8B1E2D]"
                          }`}
                        >
                          {activeSubcategory === sub && <span className="mr-1">›</span>}
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Sort By */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Sort By</h3>
        <ul className="space-y-1">
          {[
            { val: "",           label: "Best Match" },
            { val: "price-low",  label: "Price: Low → High" },
            { val: "price-high", label: "Price: High → Low" },
            { val: "newest",     label: "Newest First" },
          ].map(opt => (
            <li key={opt.val}>
              <button
                onClick={() => setSortBy(opt.val)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  sortBy === opt.val ? "bg-[#8B1E2D] text-white font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-[#8B1E2D]"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // ── RENDER ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
          <Link to="/" className="hover:text-[#8B1E2D] flex items-center gap-1 transition-colors">
            <RiHome2Line /> Home
          </Link>
          <RiArrowRightSLine />
          {navCategory && (
            <>
              <button onClick={() => { setActiveDbCategory(""); setActiveSubcategory(""); }} className="hover:text-[#8B1E2D] uppercase transition-colors">
                {navCategory}
              </button>
              {(activeDbCategory || activeSubcategory) && <RiArrowRightSLine />}
            </>
          )}
          {activeDbCategory && !activeSubcategory && (
            <span className="text-[#8B1E2D] font-semibold uppercase">{activeDbCategory}</span>
          )}
          {activeSubcategory && (
            <>
              {activeDbCategory && (
                <button onClick={() => setActiveSubcategory("")} className="hover:text-[#8B1E2D] uppercase transition-colors">{activeDbCategory}</button>
              )}
              {activeDbCategory && <RiArrowRightSLine />}
              <span className="text-[#8B1E2D] font-semibold uppercase">{activeSubcategory}</span>
            </>
          )}
          {!navCategory && !activeDbCategory && !activeSubcategory && (
            <span className="text-[#8B1E2D] font-semibold">{searchTerm ? `"${searchTerm}"` : "All Products"}</span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex gap-6">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-[80] flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative w-72 bg-white h-full shadow-xl overflow-y-auto p-5 z-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-800 uppercase tracking-wide text-sm">Filter & Sort</h2>
                <button onClick={() => setMobileSidebarOpen(false)}><FaTimes className="text-xl text-gray-500" /></button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800 uppercase tracking-wide">{getTitle()}</h1>
              {!loading && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {products.length > 0 ? `${products.length} product${products.length !== 1 ? "s" : ""} found` : "No products found"}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#8B1E2D] hover:text-[#8B1E2D] transition-colors bg-white"
              >
                <FaFilter className="text-xs" /> Filters
                {(navCategory || activeDbCategory || activeSubcategory || sortBy) && (
                  <span className="bg-[#8B1E2D] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {[navCategory || activeDbCategory, activeSubcategory, sortBy].filter(Boolean).length}
                  </span>
                )}
              </button>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#8B1E2D] text-white" : "text-gray-500 hover:bg-gray-50"}`}><FaTh className="text-sm" /></button>
                <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#8B1E2D] text-white" : "text-gray-500 hover:bg-gray-50"}`}><FaList className="text-sm" /></button>
              </div>
            </div>
          </div>

          {/* Filter chips */}
          {(navCategory || activeDbCategory || activeSubcategory || sortBy || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {navCategory && !activeDbCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs font-semibold capitalize">
                  {navCategory}
                  <button onClick={clearAll}><FaTimes className="text-[10px]" /></button>
                </span>
              )}
              {activeDbCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs font-semibold">
                  {activeDbCategory}
                  <button onClick={() => { setActiveDbCategory(""); setActiveSubcategory(""); }}><FaTimes className="text-[10px]" /></button>
                </span>
              )}
              {activeSubcategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs font-semibold">
                  {activeSubcategory}
                  <button onClick={() => setActiveSubcategory("")}><FaTimes className="text-[10px]" /></button>
                </span>
              )}
              {sortBy && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                  {sortBy === "price-low" ? "Price ↑" : sortBy === "price-high" ? "Price ↓" : "Newest"}
                  <button onClick={() => setSortBy("")}><FaTimes className="text-[10px]" /></button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                  "{searchTerm}"
                  <button onClick={() => navigate("/products")}><FaTimes className="text-[10px]" /></button>
                </span>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-sm text-red-700">
              Error loading products. <button onClick={() => dispatch(fetchProducts({}))} className="underline font-medium">Retry</button>
            </div>
          )}

          {/* Products */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-5xl mb-4">🍳</p>
              <h2 className="text-xl font-bold text-gray-700 mb-1">No products found</h2>
              <p className="text-sm text-gray-400 mb-5">Try a different category or clear filters</p>
              <button onClick={clearAll} className="px-5 py-2 bg-[#8B1E2D] text-white rounded-lg text-sm font-medium hover:bg-[#6B1622] transition-colors">
                View All Products
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(item => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 flex flex-col"
                >
                  <div className="relative overflow-hidden bg-gray-50 h-48 flex-shrink-0">
                    {item.discount && (
                      <span className="absolute top-2 left-2 z-10 bg-[#8B1E2D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{item.discount}%</span>
                    )}
                    <button
                      onClick={(e) => handleWishlistToggle(e, item._id)}
                      className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow hover:scale-110 transition-transform"
                    >
                      {isInWishlist(item._id) ? <FaHeart className="text-[#8B1E2D] text-base" /> : <FaRegHeart className="text-gray-400 text-base hover:text-[#8B1E2D]" />}
                    </button>
                    <img
                      src={item.image} alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=No+Image"; }}
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{item.subcategory || item.category}</p>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{item.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(s => <FaStar key={s} className={`text-[10px] ${s <= (item.rating||0) ? "text-yellow-400" : "text-gray-200"}`} />)}
                      <span className="text-[10px] text-gray-400 ml-0.5">({item.numReviews||0})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[#8B1E2D] font-bold text-sm">₹{item.price?.toLocaleString()}</span>
                      {item.originalPrice && <span className="text-gray-400 line-through text-xs">₹{item.originalPrice?.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div className="p-3 pt-0 flex gap-2">
                    <button onClick={(e) => addToCart(e, item)} className="flex-1 bg-white border border-[#8B1E2D] text-[#8B1E2D] py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#8B1E2D] hover:text-white transition-all duration-200">
                      <FaShoppingCart size={11} /> CART
                    </button>
                    <button onClick={(e) => buyNow(e, item)} className="flex-1 bg-[#8B1E2D] text-white py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#6B1622] transition-all duration-200">
                      <FaBolt size={11} /> BUY NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {products.map(item => (
                <div key={item._id} onClick={() => navigate(`/product/${item._id}`)}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 p-3 group"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{item.subcategory || item.category}</p>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mt-0.5">{item.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(s => <FaStar key={s} className={`text-[10px] ${s <= (item.rating||0) ? "text-yellow-400" : "text-gray-200"}`} />)}
                      <span className="text-[10px] text-gray-400 ml-1">({item.numReviews||0})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#8B1E2D] font-bold text-sm">₹{item.price?.toLocaleString()}</span>
                      {item.originalPrice && <span className="text-gray-400 line-through text-xs">₹{item.originalPrice?.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center flex-shrink-0">
                    <button onClick={(e) => addToCart(e, item)} className="px-3 py-1.5 border border-[#8B1E2D] text-[#8B1E2D] rounded-lg text-xs font-bold hover:bg-[#8B1E2D] hover:text-white transition-all"><FaShoppingCart className="inline mr-1" size={10} />Cart</button>
                    <button onClick={(e) => buyNow(e, item)} className="px-3 py-1.5 bg-[#8B1E2D] text-white rounded-lg text-xs font-bold hover:bg-[#6B1622] transition-all"><FaBolt className="inline mr-1" size={10} />Buy</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;