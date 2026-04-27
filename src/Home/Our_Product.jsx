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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const category = params.get('category');
    const sort = params.get('sort');
    
    if (search) setSearchKeyword(search);
    if (category) setSelectedCategory(category);
    if (sort) setSortBy(sort);
  }, [location.search]);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(fetchProducts({ 
      keyword: searchKeyword, 
      category: selectedCategory, 
      sort: sortBy 
    }));
  }, [dispatch, searchKeyword, selectedCategory, sortBy]);

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
    return wishlistItems?.includes(productId);
  };

  // ✅ FIXED: ADD TO CART WITH TOAST
  const addToCart = (product) => {
    console.log("Add to cart clicked:", product.name);
    
    try {
      // Get existing cart
      let cart = localStorage.getItem('shoppingCart');
      if (!cart) {
        cart = [];
      } else {
        cart = JSON.parse(cart);
      }
      
      // Check if product already exists
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
      
      // Save back to localStorage
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      
      // ✅ Show toast notification
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      
      // ✅ Update cart count in Navbar
      window.dispatchEvent(new Event('storage'));
      
      // ✅ Call parent callback if provided
      if (onCartUpdate) {
        onCartUpdate();
      }
      
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  // ✅ BUY NOW FUNCTION
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

        {/* Filter Button */}
        <div className="max-w-[1400px] mx-auto px-6 mb-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <FaFilter /> Filters
            </button>
            
            {(searchKeyword || selectedCategory || sortBy) && (
              <button
                onClick={resetFilters}
                className="ml-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat === 'all' ? '' : cat)}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            (cat === 'all' && !selectedCategory) || selectedCategory === cat
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat === 'all' ? 'All Products' : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setSortBy('')} className={`px-4 py-2 rounded-full text-sm ${sortBy === '' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>Default</button>
                      <button onClick={() => setSortBy('price-low')} className={`px-4 py-2 rounded-full text-sm ${sortBy === 'price-low' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>Price: Low to High</button>
                      <button onClick={() => setSortBy('price-high')} className={`px-4 py-2 rounded-full text-sm ${sortBy === 'price-high' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>Price: High to Low</button>
                      <button onClick={() => setSortBy('newest')} className={`px-4 py-2 rounded-full text-sm ${sortBy === 'newest' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>Newest First</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="max-w-[1400px] mx-auto px-6 mb-4">
          <p className="text-sm text-gray-500">
            Found {products?.length || 0} product{products?.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {!products || products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No products found</p>
            <button onClick={resetFilters} className="mt-4 text-red-600 hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-[1400px] mx-auto">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white group flex flex-col border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
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

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(e, item._id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
                  >
                    {isInWishlist(item._id) ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-xl hover:text-red-500" />
                    )}
                  </button>

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addModals(item._id);
                    }}
                    className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-black hover:text-white transition-colors z-10"
                  >
                    <FaEye size={14}/>
                  </button>
                </div>

                <div className="p-5 flex-grow">
                  <p className="text-[12px] text-gray-400 mb-1 font-semibold uppercase">{item.category || "General"}</p>
                  <h2 className="text-sm text-gray-800 font-bold uppercase truncate">
                    {item.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xl font-bold text-black">₹{item.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.3)}</span>
                  </div>
                </div>

                {/* ✅ BUTTONS */}
                <div className="p-5 pt-0 flex flex-row gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-[#8B1E2D] text-black py-3 text-[12px] font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
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

export default Our_Product;


