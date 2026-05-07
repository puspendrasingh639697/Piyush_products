// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { 
//   FaEye, FaHeart, FaRegHeart, FaShoppingCart, FaBolt, 
//   FaFilter, FaStar
// } from "react-icons/fa";
// import ProductModals from "../Component/ProductModals";
// import { fetchProducts } from "../redux/slices/productSlice";
// import { toggleWishlist, fetchWishlist } from "../redux/slices/wishlistSlice";

// const Our_Product = ({ onCartUpdate }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const { items: products, loading, error } = useSelector((state) => state.products);
//   const { userInfo } = useSelector((state) => state.user);
//   const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
//   const [category, setCategory] = useState([]);
//   const [show, setShow] = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);

//   // Get filters from URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const search = params.get('search');
//     const category = params.get('category');
//     const sort = params.get('sort');
    
//     if (search) setSearchKeyword(search);
//     if (category) setSelectedCategory(category);
//     if (sort) setSortBy(sort);
//   }, [location.search]);

//   // Fetch wishlist if logged in
//   useEffect(() => {
//     if (userInfo) {
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, userInfo]);

//   // Fetch products with filters
//   useEffect(() => {
//     dispatch(fetchProducts({ 
//       keyword: searchKeyword, 
//       category: selectedCategory, 
//       sort: sortBy 
//     }));
//   }, [dispatch, searchKeyword, selectedCategory, sortBy]);

//   // Extract unique categories from products
//   useEffect(() => {
//     if (products && products.length > 0) {
//       const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
//       setCategories(['all', ...uniqueCategories]);
//     }
//   }, [products]);

//   const resetFilters = () => {
//     setSearchKeyword("");
//     setSelectedCategory("");
//     setSortBy("");
//     setShowFilters(false);
//     navigate('/products');
//   };

//   const goToProductDetail = (id) => {
//     navigate(`/product/${id}`);
//   };

//   const handleWishlistToggle = (e, productId) => {
//     e.stopPropagation();
//     if (!userInfo) {
//       toast.error("Please login first");
//       navigate('/');
//       return;
//     }
//     dispatch(toggleWishlist(productId));
//   };

//   const isInWishlist = (productId) => {
//     if (!wishlistItems) return false;
//     if (wishlistItems.length > 0 && wishlistItems[0]?._id) {
//       return wishlistItems.some(item => item._id === productId);
//     }
//     return wishlistItems.includes(productId);
//   };

//   const addToCart = (product) => {
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
//           price: Number(product.price),
//           image: product.image,
//           quantity: 1
//         });
//       }
      
//       localStorage.setItem('shoppingCart', JSON.stringify(cart));
      
//       toast.success(`${product.name} added to cart!`);
//       window.dispatchEvent(new Event('storage'));
      
//       if (onCartUpdate) onCartUpdate();
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error("Failed to add to cart");
//     }
//   };

//   const buyNow = (product) => {
//     addToCart(product);
//     setTimeout(() => {
//       navigate('/cart');
//     }, 500);
//   };

//   const addModals = (id) => {
//     const handle = products.filter((item) => item._id === id);
//     setCategory(handle);
//     setShow(true);
//   };

//   if (loading) {
//     return (
//       <div className="w-full py-12 bg-gray-50">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full py-12 bg-gray-50">
//         <div className="text-center">
//           <p className="text-red-600">Error loading products: {error}</p>
//           <button onClick={() => dispatch(fetchProducts({}))} className="mt-4 px-4 py-2 bg-[#8B1E2D] text-white rounded">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full py-12 bg-gray-50">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl text-[#8B1E2D] font-bold uppercase tracking-widest">
//             OUR PRODUCTS
//           </h1>
//           <div className="w-20 h-1 bg-[#8B1E2D] mx-auto mt-4"></div>
//           <p className="text-gray-500 text-sm mt-2">Discover our amazing collection</p>
//         </div>

//         {/* Filter Button */}
//         <div className="max-w-[1400px] mx-auto px-6 mb-6">
//           <div className="flex justify-end gap-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-6 py-3 bg-[#8B1E2D] text-white rounded-lg hover:bg-[#6B1622] transition"
//             >
//               <FaFilter /> Filters
//             </button>
            
//             {(searchKeyword || selectedCategory || sortBy) && (
//               <button
//                 onClick={resetFilters}
//                 className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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
//               <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Categories */}
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
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
                  
//                   {/* Sort By */}
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
//                     <div className="flex flex-wrap gap-2">
//                       <button onClick={() => setSortBy('')} className={`px-4 py-2 rounded-full text-sm ${sortBy === '' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100'}`}>Default</button>
//                       <button onClick={() => setSortBy('price-low')} className={`px-4 py-2 rounded-full text-sm ${sortBy === 'price-low' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100'}`}>Price: Low to High</button>
//                       <button onClick={() => setSortBy('price-high')} className={`px-4 py-2 rounded-full text-sm ${sortBy === 'price-high' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100'}`}>Price: High to Low</button>
//                       <button onClick={() => setSortBy('newest')} className={`px-4 py-2 rounded-full text-sm ${sortBy === 'newest' ? 'bg-[#8B1E2D] text-white' : 'bg-gray-100'}`}>Newest First</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Results Count */}
//         <div className="max-w-[1400px] mx-auto px-6 mb-4">
//           <p className="text-sm text-gray-500">
//             Found {products?.length || 0} product{products?.length !== 1 ? 's' : ''}
//           </p>
//         </div>

//         {/* Products Grid */}
//         {!products || products.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🔍</div>
//             <p className="text-gray-500 text-lg">No products found</p>
//             <button onClick={resetFilters} className="mt-4 text-[#8B1E2D] hover:underline">Clear all filters</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-[1400px] mx-auto">
//             {products.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white group flex flex-col border border-gray-200 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
//               >
//                 <div 
//                   className="relative h-72 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer"
//                   onClick={() => goToProductDetail(item._id)}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-700 group-hover:scale-110"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
//                     }}
//                   />

//                   {/* Wishlist Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleWishlistToggle(e, item._id);
//                     }}
//                     className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
//                   >
//                     {isInWishlist(item._id) ? (
//                       <FaHeart className="text-red-500 text-lg" />
//                     ) : (
//                       <FaRegHeart className="text-gray-600 text-lg hover:text-red-500" />
//                     )}
//                   </button>

//                   {/* Quick View Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addModals(item._id);
//                     }}
//                     className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-[#8B1E2D] hover:text-white transition-colors z-10"
//                   >
//                     <FaEye size={14}/>
//                   </button>
//                 </div>

//                 <div className="p-4 flex-grow">
//                   <p className="text-xs text-gray-500 mb-1 font-medium uppercase">{item.category || "General"}</p>
//                   <h2 className="text-sm text-gray-800 font-semibold line-clamp-2 min-h-[40px]">
//                     {item.name}
//                   </h2>
                  
//                   {/* Rating Stars */}
//                   <div className="flex items-center gap-1 mt-2">
//                     <div className="flex gap-0.5">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <FaStar 
//                           key={star}
//                           className={`text-xs ${star <= (item.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs text-gray-500 ml-1">({item.numReviews || 0})</span>
//                   </div>
                  
//                   <div className="flex items-center gap-2 mt-3">
//                     <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
//                     <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.3)}</span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="p-4 pt-0 flex gap-2">
//                   <button
//                     onClick={() => addToCart(item)}
//                     className="flex-1 bg-white  border-[#8B1E2D] text-[#8B1E2D] py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-[#8B1E2D] hover:text-white transition-all duration-300"
//                   >
//                     <FaShoppingCart size={14} /> ADD
//                   </button>

//                   <button
//                     onClick={() => buyNow(item)}
//                     className="flex-1 bg-[#8B1E2D] text-white py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-[#6B1622] transition-all duration-300"
//                   >
//                     <FaBolt size={14} /> BUY
//                   </button>
//                 </div>
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

// export default Our_Product;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FaEye, FaHeart, FaRegHeart, FaShoppingCart, FaBolt, 
  FaFilter, FaStar, FaArrowRight, FaTags
} from "react-icons/fa";
import ProductModals from "../Component/ProductModals";
import { fetchProducts } from "../redux/slices/productSlice";
import { toggleWishlist, fetchWishlist } from "../redux/slices/wishlistSlice";

const Our_Product = ({ onCartUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { items: products, loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.user);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Get filters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const category = params.get('category');
    const sort = params.get('sort');
    
    if (search) setSearchKeyword(search);
    if (category) setSelectedCategory(category);
    if (sort) setSortBy(sort);
  }, [location.search]);

  // Fetch wishlist if logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, userInfo]);

  // Fetch products with filters
  useEffect(() => {
    dispatch(fetchProducts({ 
      keyword: searchKeyword, 
      category: selectedCategory, 
      sort: sortBy 
    }));
  }, [dispatch, searchKeyword, selectedCategory, sortBy]);

  // Extract unique categories from products
  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
      setCategories(['all', ...uniqueCategories]);
    }
  }, [products]);

  const resetFilters = () => {
    setSearchKeyword("");
    setSelectedCategory("");
    setSortBy("");
    setShowFilters(false);
    navigate('/products');
  };

  const goToProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const handleWishlistToggle = (e, productId) => {
    e.stopPropagation();
    if (!userInfo) {
      toast.error("Please login first");
      navigate('/');
      return;
    }
    dispatch(toggleWishlist(productId));
  };

  const isInWishlist = (productId) => {
    if (!wishlistItems) return false;
    if (wishlistItems.length > 0 && wishlistItems[0]?._id) {
      return wishlistItems.some(item => item._id === productId);
    }
    return wishlistItems.includes(productId);
  };

  const addToCart = (product) => {
    try {
      let cart = localStorage.getItem('shoppingCart');
      if (!cart) {
        cart = [];
      } else {
        cart = JSON.parse(cart);
      }
      
      const existingIndex = cart.findIndex(item => item.id === product._id);
      
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          id: product._id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          quantity: 1
        });
      }
      
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      window.dispatchEvent(new Event('storage'));
      if (onCartUpdate) onCartUpdate();
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  const buyNow = (product) => {
    addToCart(product);
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const addModals = (id) => {
    const handle = products.filter((item) => item._id === id);
    setCategory(handle);
    setShow(true);
  };

  if (loading) {
    return (
      <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm tracking-wide">LOADING PRODUCTS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-500 mb-4">Error loading products: {error}</p>
          <button onClick={() => dispatch(fetchProducts({}))} className="px-6 py-2 bg-[#8B1E2D] text-white rounded-lg hover:bg-[#6B1622] transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
        {/* Header Section - Enhanced */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-12 h-px bg-[#8B1E2D]"></div>
              <span className="text-[#8B1E2D] text-sm font-semibold tracking-wider">PREMIUM COLLECTION</span>
              <div className="w-12 h-px bg-[#8B1E2D]"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-wider mb-4">
            OUR <span className="text-[#8B1E2D]">PRODUCTS</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#8B1E2D] to-transparent mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm max-w-md mx-auto">Discover our amazing collection of premium quality products</p>
        </div>

        {/* Filter Bar - Enhanced */}
        <div className="max-w-[1400px] mx-auto px-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#8B1E2D]/10 rounded-full px-3 py-1">
                <span className="text-xs font-medium text-[#8B1E2D]">{products?.length || 0} Products</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#8B1E2D] text-white rounded-full hover:bg-[#6B1622] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaFilter size={14} /> 
                <span className="text-sm font-medium">Filters</span>
                {(selectedCategory || sortBy) && (
                  <span className="ml-1 w-5 h-5 bg-white text-[#8B1E2D] rounded-full text-xs flex items-center justify-center font-bold">
                    {[selectedCategory && '1', sortBy && '1'].filter(Boolean).length}
                  </span>
                )}
              </button>
              
              {(searchKeyword || selectedCategory || sortBy) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters Panel - Enhanced Animation */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-[1400px] mx-auto px-6 mb-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Categories Section */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaTags className="text-[#8B1E2D]" size={16} />
                      Shop by Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat === 'all' ? '' : cat)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            (cat === 'all' && !selectedCategory) || selectedCategory === cat
                              ? 'bg-[#8B1E2D] text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {cat === 'all' ? 'All Products' : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort Section */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      Sort By
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSortBy('')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          sortBy === '' ? 'bg-[#8B1E2D] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Default
                      </button>
                      <button
                        onClick={() => setSortBy('price-low')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          sortBy === 'price-low' ? 'bg-[#8B1E2D] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Price: Low to High
                      </button>
                      <button
                        onClick={() => setSortBy('price-high')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          sortBy === 'price-high' ? 'bg-[#8B1E2D] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Price: High to Low
                      </button>
                      <button
                        onClick={() => setSortBy('newest')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          sortBy === 'newest' ? 'bg-[#8B1E2D] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Newest First
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count - Enhanced */}
        <div className="max-w-[1400px] mx-auto px-6 mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#8B1E2D]">{products?.length || 0}</span> products
            {searchKeyword && ` for "${searchKeyword}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid - Enhanced Cards */}
        {!products || products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg font-medium">No products found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            <button onClick={resetFilters} className="mt-6 text-[#8B1E2D] hover:underline inline-flex items-center gap-1">
              Clear all filters <FaArrowRight size={12} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-[1400px] mx-auto">
            {products.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredProduct(item._id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="bg-white group flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-gray-100"
                onClick={() => goToProductDetail(item._id)}
              >
                {/* Image Section */}
                <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-[80%] max-w-[80%] object-contain transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    SAVE 30%
                  </div>

                  {/* Wishlist Button - Enhanced */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(e, item._id);
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 z-10 ${
                      isInWishlist(item._id) 
                        ? 'bg-[#8B1E2D] text-white' 
                        : 'bg-white text-gray-600 hover:bg-[#8B1E2D] hover:text-white'
                    }`}
                  >
                    <FaHeart size={16} />
                  </button>

                  {/* Quick View Button - Appears on Hover */}
                  <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 ${hoveredProduct === item._id ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addModals(item._id);
                      }}
                      className="px-6 py-2.5 bg-white text-gray-800 rounded-full font-medium text-sm hover:bg-[#8B1E2D] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-lg"
                    >
                      <FaEye size={14} /> Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-grow">
                  <p className="text-xs text-[#8B1E2D] mb-1 font-semibold uppercase tracking-wider">{item.category || "Premium"}</p>
                  <h2 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-[#8B1E2D] transition-colors">
                    {item.name}
                  </h2>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                          key={star}
                          className={`text-xs ${star <= (item.rating || 0) ? 'text-yellow-400' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-1">({item.numReviews || 0})</span>
                  </div>
                  
                  {/* Price Section */}
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-xl font-bold text-[#8B1E2D]">₹{item.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.3)}</span>
                  </div>
                </div>

                {/* Action Buttons - Enhanced */}
                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="flex-1 bg-white border-2 border-[#8B1E2D] text-[#8B1E2D] py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#8B1E2D] hover:text-white transition-all duration-300"
                  >
                    <FaShoppingCart size={14} /> ADD
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      buyNow(item);
                    }}
                    className="flex-1 bg-[#8B1E2D] text-white py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#6B1622] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaBolt size={14} /> BUY
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {show && (
          <ProductModals
            onClose={() => setShow(false)}
            category={category}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Our_Product;