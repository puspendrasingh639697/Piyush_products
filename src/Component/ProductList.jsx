// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { fetchProducts } from '../redux/slices/productSlice';
// // import { fetchWishlist ,toggleWishlist} from '../redux/slices/wishlistSlice';
// // import ProductCard from './ProductCard';
// // import CategoryFilter from './CategoryFilter';
// // import SearchBar from './SearchBar';

// // const ProductList = () => {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
    
// //     // Redux state
// //     const { items: products, loading, error } = useSelector((state) => state.products);
// //     const { items: wishlistItems } = useSelector((state) => state.wishlist);
    
// //     // Local state for filters
// //     const [selectedCategory, setSelectedCategory] = useState('All');
// //     const [sortOption, setSortOption] = useState('newest');
// //     const [filteredProducts, setFilteredProducts] = useState([]);
// //     const [categories, setCategories] = useState(['All']);

// //     // Initial load
// //     useEffect(() => {
// //         dispatch(fetchProducts({}));
// //         dispatch(fetchWishlist());
// //     }, [dispatch]);

// //     // Extract categories when products load
// //     useEffect(() => {
// //         if (products && products.length > 0) {
// //             const uniqueCats = ['All', ...new Set(products.map(p => p.category))];
// //             setCategories(uniqueCats);
// //             filterAndSortProducts();
// //         }
// //     }, [products]);

// //     // Filter and sort when filters change
// //     useEffect(() => {
// //         filterAndSortProducts();
// //     }, [products, selectedCategory, sortOption]);

// //     const filterAndSortProducts = () => {
// //         if (!products || products.length === 0) {
// //             setFilteredProducts([]);
// //             return;
// //         }
        
// //         let filtered = [...products];

// //         // Filter by category
// //         if (selectedCategory !== 'All') {
// //             filtered = filtered.filter(p => p.category === selectedCategory);
// //         }

// //         // Sort products
// //         if (sortOption === 'price-low') {
// //             filtered.sort((a, b) => a.price - b.price);
// //         } else if (sortOption === 'price-high') {
// //             filtered.sort((a, b) => b.price - a.price);
// //         } else if (sortOption === 'newest') {
// //             filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// //         }

// //         setFilteredProducts(filtered);
// //     };

// //     const handleSearch = (query) => {
// //         if (!query.trim()) {
// //             dispatch(fetchProducts({}));
// //             setSelectedCategory('All');
// //             return;
// //         }
// //         dispatch(fetchProducts({ keyword: query }));
// //         setSelectedCategory('All');
// //     };

// //     const handleCategoryChange = (category) => {
// //         setSelectedCategory(category);
// //         if (category === 'All') {
// //             dispatch(fetchProducts({}));
// //         } else {
// //             dispatch(fetchProducts({ category }));
// //         }
// //     };

// //     const handleSortChange = (sort) => {
// //         setSortOption(sort);
// //         dispatch(fetchProducts({ sort }));
// //     };

// //     const handleWishlistToggle = (productId) => {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //             navigate('/login');
// //             return;
// //         }
// //         dispatch(toggleWishlist(productId)).then(() => {
// //             dispatch(fetchWishlist());
// //         });
// //     };

// //     const isProductInWishlist = (productId) => {
// //         return wishlistItems.some(item => item._id === productId);
// //     };

// //     if (loading) {
// //         return (
// //             <div className="min-h-screen bg-gray-50 py-8">
// //                 <div className="max-w-7xl mx-auto px-4">
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //                         {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
// //                             <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
// //                                 <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
// //                                 <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
// //                                 <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
// //                                 <div className="h-6 bg-gray-200 rounded w-1/2"></div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                 <div className="text-center">
// //                     <div className="text-red-600 text-5xl mb-4">!</div>
// //                     <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
// //                     <p className="text-gray-600 mb-4">{error}</p>
// //                     <button 
// //                         onClick={() => dispatch(fetchProducts({}))}
// //                         className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
// //                     >
// //                         Try Again
// //                     </button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="min-h-screen bg-gray-50 py-8">
// //             <div className="max-w-7xl mx-auto px-4">
// //                 {/* Header */}
// //                 <div className="text-center mb-8">
// //                     <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
// //                     <p className="text-gray-600 mt-2">Discover our premium collection</p>
// //                 </div>

// //                 {/* Search Bar */}
// //                 <div className="mb-6">
// //                     <SearchBar onSearch={handleSearch} />
// //                 </div>

// //                 {/* Filters Section */}
// //                 <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
// //                     <CategoryFilter 
// //                         selectedCategory={selectedCategory} 
// //                         onCategoryChange={handleCategoryChange}
// //                         categories={categories}
// //                     />
                    
// //                     <select
// //                         value={sortOption}
// //                         onChange={(e) => handleSortChange(e.target.value)}
// //                         className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
// //                     >
// //                         <option value="newest">Newest First</option>
// //                         <option value="price-low">Price: Low to High</option>
// //                         <option value="price-high">Price: High to Low</option>
// //                     </select>
// //                 </div>

// //                 {/* Products Count */}
// //                 <div className="mb-4 text-sm text-gray-500">
// //                     Showing {filteredProducts.length} products
// //                 </div>

// //                 {/* Products Grid */}
// //                 {filteredProducts.length === 0 ? (
// //                     <div className="text-center py-12 bg-white rounded-xl shadow-sm">
// //                         <div className="text-gray-400 text-6xl mb-4">🛒</div>
// //                         <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
// //                         <p className="text-gray-500">Try adjusting your search or filter</p>
// //                         <button
// //                             onClick={() => {
// //                                 dispatch(fetchProducts({}));
// //                                 setSelectedCategory('All');
// //                                 setSortOption('newest');
// //                             }}
// //                             className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
// //                         >
// //                             Clear Filters
// //                         </button>
// //                     </div>
// //                 ) : (
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //                         {filteredProducts.map((product) => (
// //                             <ProductCard
// //                                 key={product._id}
// //                                 product={product}
// //                                 onWishlistToggle={handleWishlistToggle}
// //                                 isWishlisted={isProductInWishlist(product._id)}
// //                             />
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductList;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { 
//   FaEye, FaHeart, FaRegHeart, FaShareAlt, FaShoppingCart, FaBolt, 
//   FaFilter, FaSort, FaTimes
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
//               className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//             >
//               <FaFilter /> Filters
//               {(selectedCategory || sortBy !== '') && (
//                 <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
//                   {[selectedCategory && '1', sortBy && '1'].filter(Boolean).length}
//                 </span>
//               )}
//             </button>
            
//             {(searchKeyword || selectedCategory || sortBy) && (
//               <button
//                 onClick={resetFilters}
//                 className="ml-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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
                  
//                   {/* Category Filter */}
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                       <FaFilter className="text-red-500" /> Categories
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map((cat) => (
//                         <button
//                           key={cat}
//                           onClick={() => setSelectedCategory(cat === 'all' ? '' : cat)}
//                           className={`px-4 py-2 rounded-full text-sm transition-all ${
//                             (cat === 'all' && !selectedCategory) || selectedCategory === cat
//                               ? 'bg-red-600 text-white'
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
//                       <FaSort className="text-red-500" /> Sort By
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         onClick={() => setSortBy('')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === '' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         Default
//                       </button>
//                       <button
//                         onClick={() => setSortBy('price-low')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === 'price-low' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         Price: Low to High
//                       </button>
//                       <button
//                         onClick={() => setSortBy('price-high')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === 'price-high' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                       >
//                         Price: High to Low
//                       </button>
//                       <button
//                         onClick={() => setSortBy('newest')}
//                         className={`px-4 py-2 rounded-full text-sm transition-all ${
//                           sortBy === 'newest' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
//           <p className="text-sm text-white">
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
//                 className="bg-white group flex flex-col border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
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

//                   {/* Quick View Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addModals(item._id);
//                     }}
//                     className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-black hover:text-white transition-colors z-10"
//                   >
//                     <FaEye size={14}/>
//                   </button>
//                 </div>

//                 <div className="p-5 flex-grow">
//                   <p className="text-[12px] text-black mb-1 font-semibold uppercase">{item.category || "General"}</p>
//                   <h2 className="text-sm text-black font-bold uppercase truncate">
//                     {item.name}
//                   </h2>
//                   <div className="flex items-center gap-2 mt-3">
//                     <span className="text-xl font-bold text-black">₹{item.price}</span>
//                     <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.3)}</span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="p-5 pt-0 flex flex-row gap-2">
//                   <button
//                     onClick={() => addToCart(item)}
//                     className="flex-1 bg-[#8B1E2D] text-white py-3 text-[12px] font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
//                   >
//                     <FaShoppingCart size={12} /> ADD
//                   </button>

//                   <button
//                     onClick={() => buyNow(item)}
//                     className="flex-1 bg-black text-white py-3 text-[12px] font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-gray-800 transition-all duration-300 cursor-pointer"
//                   >
//                     <FaBolt size={12} /> BUY
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

// export default ProductList;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FaEye, FaHeart, FaRegHeart, FaShareAlt, FaShoppingCart, FaBolt, 
  FaFilter, FaSort, FaTimes
} from "react-icons/fa";
import ProductModals from "../Component/ProductModals";
import { fetchProducts } from "../redux/slices/productSlice";
import { toggleWishlist, fetchWishlist } from "../redux/slices/wishlistSlice";

const ProductList = ({ onCartUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redux State
  const { items: products, loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.user);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  // Local State
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get search from URL (from Navbar search)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const category = params.get('category');
    const sort = params.get('sort');
    
    if (search) setSearchKeyword(search);
    if (category) setSelectedCategory(category);
    if (sort) setSortBy(sort);
  }, [location.search]);

  // Fetch wishlist when user is logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, userInfo]);

  // Fetch products when filters change
  useEffect(() => {
    dispatch(fetchProducts({ 
      keyword: searchKeyword, 
      category: selectedCategory, 
      sort: sortBy 
    }));
  }, [dispatch, searchKeyword, selectedCategory, sortBy]);

  // Extract categories from products
  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
      setCategories(['all', ...uniqueCategories]);
    }
  }, [products]);

  // Reset all filters
  const resetFilters = () => {
    setSearchKeyword("");
    setSelectedCategory("");
    setSortBy("");
    setShowFilters(false);
    navigate('/products');
  };

  // Navigate to product detail
  const goToProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  // Wishlist Toggle Handler
  const handleWishlistToggle = (e, productId) => {
    e.stopPropagation();
    if (!userInfo) {
      toast.error("Please login first");
      navigate('/');
      return;
    }
    dispatch(toggleWishlist(productId));
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems?.some(item => item._id === productId);
  };

  // Add to cart handler
  const addToCart = (product) => {
    console.log("Add to cart clicked:", product.name);
    
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
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
      
      window.dispatchEvent(new Event('storage'));
      
      if (onCartUpdate) {
        onCartUpdate();
      }
      
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  // Buy now handler
  const buyNow = (product) => {
    addToCart(product);
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  // Quick view modal
  const addModals = (id) => {
    const handle = products.filter((item) => item._id === id);
    setCategory(handle);
    setShow(true);
  };

  if (loading) {
    return (
      <div className="w-full py-12 bg-[#f8f8f8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 bg-[#f8f8f8]">
        <div className="text-center">
          <p className="text-red-600">Error loading products: {error}</p>
          <button onClick={() => dispatch(fetchProducts({}))} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-12 bg-[#f8f8f8]">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-red-800 font-bold uppercase tracking-widest">
            OUR PRODUCTS
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
          <p className="text-gray-500 text-sm mt-2">Discover our amazing collection</p>
        </div>

        {/* Filter Button Only - No Search Bar */}
        <div className="max-w-[1400px] mx-auto px-6 mb-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-[#8B1E2D] rounded-lg hover:bg-gray-300 transition"
            >
              <FaFilter className="text-white"/> <span className="text-white">Filters</span>
              {(selectedCategory || sortBy !== '') && (
                <span className="ml-1 px-2 py-0.5 bg-[#8B1E2D] text-white text-xs rounded-full">
                  {[selectedCategory && '1', sortBy && '1'].filter(Boolean).length}
                </span>
              )}
            </button>
            
            {(searchKeyword || selectedCategory || sortBy) && (
              <button
                onClick={resetFilters}
                className="ml-4 px-6 py-3 bg-[#8B1E2D] text-white rounded-lg hover:bg-gray-600 transition"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-[1400px] mx-auto px-6 mb-6 overflow-hidden"
            >
              <div className="bg-[#8B1E2D] rounded-lg shadow-md p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FaFilter className="text-white" /> <span className="text-white">Categories</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat === 'all' ? '' : cat)}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            (cat === 'all' && !selectedCategory) || selectedCategory === cat
                              ? 'bg-[] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat === 'all' ? 'All Products' : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort Options */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FaSort className="text-white" /> <span className="text-white">Sort By</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSortBy('')}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          sortBy === '' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Default
                      </button>
                      <button
                        onClick={() => setSortBy('price-low')}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          sortBy === 'price-low' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Price: Low to High
                      </button>
                      <button
                        onClick={() => setSortBy('price-high')}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          sortBy === 'price-high' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Price: High to Low
                      </button>
                      <button
                        onClick={() => setSortBy('newest')}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          sortBy === 'newest' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

        {/* Results Count */}
        <div className="max-w-[1400px] mx-auto px-6 mb-4">
          <p className="text-sm text-gray-600">
            Found {products?.length || 0} product{products?.length !== 1 ? 's' : ''}
            {searchKeyword && ` for "${searchKeyword}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        {!products || products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            <button onClick={resetFilters} className="mt-4 text-red-600 hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-[1400px] mx-auto">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white group flex flex-col border transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden"
                style={{ borderColor: '#8B1E2D' }}
              >
                <div 
                  className="relative h-72 bg-[#fdfdfd] flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => goToProductDetail(item._id)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Wishlist Button - Top Right */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(e, item._id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
                    title={isInWishlist(item._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {isInWishlist(item._id) ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-xl hover:text-red-500" />
                    )}
                  </button>

                  
                  
                </div>

                <div className="p-5 flex-grow">
                  <p className="text-[12px] text-gray-500 mb-1 font-semibold uppercase">{item.category || "General"}</p>
                  <h2 className="text-sm text-gray-800 font-bold uppercase truncate">
                    {item.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.3)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 pt-0 flex flex-row gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-[#8B1E2D] text-white py-3 text-[12px] font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <FaShoppingCart size={12} /> ADD
                  </button>

                  <button
                    onClick={() => buyNow(item)}
                    className="flex-1 bg-black text-white py-3 text-[12px] font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                  >
                    <FaBolt size={12} /> BUY
                  </button>
                </div>
              </div>
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

export default ProductList;