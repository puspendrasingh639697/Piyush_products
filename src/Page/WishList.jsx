// import React, { useEffect, useState } from "react";
// import {
//   MdDelete,
//   MdProductionQuantityLimits,
// } from "react-icons/md";
// import { FaShoppingCart, FaHeart, FaBolt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import API from "../utils/api";

// const WishList = () => {
//   const navigate = useNavigate();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user") || "{}");
//     setUser(userData);
    
//     if (userData._id) {
//       fetchWishlist();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const fetchWishlist = async () => {
//     try {
//       const response = await API.get('/user/wishlist');
//       console.log("Wishlist API Response:", response.data);
      
//       if (response.data.success && response.data.wishlist) {
//         setWishlistItems(response.data.wishlist);
//       } else {
//         setWishlistItems([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch wishlist:", err);
//       setWishlistItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveFromWishlist = async (productId) => {
//     if (!user?._id) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       const response = await API.post('/user/wishlist', { productId });
//       if (response.data.success || response.data.message) {
//         toast.success("Removed from wishlist");
//         fetchWishlist();
//       }
//     } catch (err) {
//       toast.error("Failed to remove from wishlist");
//     }
//   };

//   const handleAddToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
//     const existingItem = cart.find(item => item.id === product._id);
    
//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       cart.push({
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: 1
//       });
//     }
    
//     localStorage.setItem('shoppingCart', JSON.stringify(cart));
//     window.dispatchEvent(new Event('storage'));
//     toast.success(`${product.name} added to cart!`);
//   };

//   const handleBuyNow = (product) => {
//     handleAddToCart(product);
//     navigate('/checkout');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading wishlist...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user?._id) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <FaHeart className="text-6xl mx-auto mb-4" style={{ color: '#8B1E2D' }} />
//           <h2 className="text-2xl font-bold mb-4" style={{ color: '#8B1E2D' }}>Please Login</h2>
//           <p className="text-gray-600 mb-6">Login to view your wishlist</p>
//           <button 
//             onClick={() => navigate('/')}
//             className="px-6 py-2 rounded-lg text-white transition"
//             style={{ backgroundColor: '#8B1E2D' }}
//             onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1622'}
//             onMouseLeave={(e) => e.target.style.backgroundColor = '#8B1E2D'}
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!wishlistItems || wishlistItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <FaHeart className="text-6xl mx-auto mb-4" style={{ color: '#8B1E2D' }} />
//           <h2 className="text-2xl font-bold mb-4" style={{ color: '#8B1E2D' }}>Your Wishlist is Empty</h2>
//           <p className="text-gray-600 mb-6">Save your favorite items here</p>
//           <button 
//             onClick={() => navigate("/products")}
//             className="px-6 py-2 rounded-lg text-white transition"
//             style={{ backgroundColor: '#8B1E2D' }}
//             onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1622'}
//             onMouseLeave={(e) => e.target.style.backgroundColor = '#8B1E2D'}
//           >
//             Explore Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
//       <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-6 py-6 mb-6">
//         <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#8B1E2D' }}>
//           My Wishlist
//         </h1>
//         <p className="text-gray-500 mt-1 text-sm flex items-center gap-1">
//           <FaHeart style={{ color: '#8B1E2D' }} />
//           {wishlistItems.length} items saved for later
//         </p>
//       </div>

//       <div className="mt-6 space-y-4">
//         {wishlistItems.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white border border-gray-200 shadow-md rounded-xl p-5 lg:grid lg:grid-cols-[3fr_1fr_1fr_2fr] items-center"
//           >
//             <div className="flex items-center gap-4 w-full">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-[80px] h-[80px] rounded-lg border border-gray-200 object-contain"
//                 onError={(e) => e.target.src = "https://via.placeholder.com/80"}
//               />
//               <div>
//                 <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
//               </div>
//             </div>

//             <div className="text-center w-full">
//               <span className="text-xl font-bold" style={{ color: '#8B1E2D' }}>₹{item.price}</span>
//             </div>

//             <div className="text-center w-full flex justify-center gap-1">
//               <MdProductionQuantityLimits style={{ color: '#8B1E2D' }} />
//               <span className="font-semibold" style={{ color: '#8B1E2D' }}>In Stock</span>
//             </div>

//             <div className="flex gap-3 w-full justify-end">
//               {/* ADD TO CART BUTTON - Secondary Style */}
//               <button 
//                 onClick={() => handleAddToCart(item)} 
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium"
//                 style={{ 
//                   backgroundColor: 'white', 
//                   border: `2px solid ${'#8B1E2D'}`,
//                   color: '#8B1E2D'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = '#8B1E2D';
//                   e.currentTarget.style.color = 'white';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = 'white';
//                   e.currentTarget.style.color = '#8B1E2D';
//                 }}
//               >
//                 <FaShoppingCart /> Add to Cart
//               </button>
              
//               {/* BUY NOW BUTTON - Primary Style */}
//               <button 
//                 onClick={() => handleBuyNow(item)} 
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition font-medium"
//                 style={{ backgroundColor: '#8B1E2D' }}
//                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B1622'}
//                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B1E2D'}
//               >
//                 <FaBolt /> Buy Now
//               </button>
              
//               {/* DELETE BUTTON */}
//               <button 
//                 onClick={() => handleRemoveFromWishlist(item._id)} 
//                 className="p-2 rounded-lg transition"
//                 style={{ backgroundColor: '#FEE2E2' }}
//                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FCE8E8'}
//                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
//               >
//                 <MdDelete style={{ color: '#8B1E2D' }} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WishList;


import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { FaShoppingCart, FaHeart, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

const WishList = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    
    if (userData._id) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await API.get('/user/wishlist');
      console.log("Wishlist API Response:", response.data);
      
      if (response.data.success && response.data.wishlist) {
        setWishlistItems(response.data.wishlist);
      } else {
        setWishlistItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (!user?._id) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await API.post('/user/wishlist', { productId });
      if (response.data.success || response.data.message) {
        toast.success("Removed from wishlist");
        fetchWishlist();
      }
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const existingItem = cart.find(item => item.id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
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
    window.dispatchEvent(new Event('storage'));
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (!user?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <FaHeart className="text-4xl sm:text-5xl md:text-6xl mx-auto mb-3 sm:mb-4" style={{ color: '#8B1E2D' }} />
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4" style={{ color: '#8B1E2D' }}>Please Login</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Login to view your wishlist</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-white transition text-sm sm:text-base"
            style={{ backgroundColor: '#8B1E2D' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1622'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8B1E2D'}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <FaHeart className="text-4xl sm:text-5xl md:text-6xl mx-auto mb-3 sm:mb-4" style={{ color: '#8B1E2D' }} />
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4" style={{ color: '#8B1E2D' }}>Your Wishlist is Empty</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Save your favorite items here</p>
          <button 
            onClick={() => navigate("/products")}
            className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-white transition text-sm sm:text-base"
            style={{ backgroundColor: '#8B1E2D' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1622'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8B1E2D'}
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-6 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#8B1E2D' }}>
          My Wishlist
        </h1>
        <p className="text-gray-500 mt-1 text-xs sm:text-sm flex items-center gap-1">
          <FaHeart style={{ color: '#8B1E2D' }} />
          {wishlistItems.length} items saved for later
        </p>
      </div>

      <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 shadow-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 flex flex-col gap-3 sm:gap-4"
          >
            {/* Mobile/Tablet Layout - Flex Column */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Product Image & Name */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] rounded-lg border border-gray-200 object-contain"
                  onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                />
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 break-words">{item.name}</h3>
                </div>
              </div>

              {/* Price & Stock Status - Row on mobile */}
              <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2 sm:gap-1">
                <div className="text-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#8B1E2D' }}>₹{item.price}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdProductionQuantityLimits style={{ color: '#8B1E2D' }} className="text-sm sm:text-base" />
                  <span className="font-semibold text-xs sm:text-sm" style={{ color: '#8B1E2D' }}>In Stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 mt-2 sm:mt-0">
                {/* ADD TO CART BUTTON */}
                <button 
                  onClick={() => handleAddToCart(item)} 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition font-medium text-xs sm:text-sm md:text-base"
                  style={{ 
                    backgroundColor: 'white', 
                    border: `2px solid ${'#8B1E2D'}`,
                    color: '#8B1E2D'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8B1E2D';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#8B1E2D';
                  }}
                >
                  <FaShoppingCart className="text-xs sm:text-sm" /> 
                  <span className="hidden xs:inline">Add to Cart</span>
                  <span className="xs:hidden">Cart</span>
                </button>
                
                {/* BUY NOW BUTTON */}
                <button 
                  onClick={() => handleBuyNow(item)} 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-white transition font-medium text-xs sm:text-sm md:text-base"
                  style={{ backgroundColor: '#8B1E2D' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B1622'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B1E2D'}
                >
                  <FaBolt className="text-xs sm:text-sm" /> 
                  <span className="hidden xs:inline">Buy Now</span>
                  <span className="xs:hidden">Buy</span>
                </button>
                
                {/* DELETE BUTTON */}
                <button 
                  onClick={() => handleRemoveFromWishlist(item._id)} 
                  className="p-1.5 sm:p-2 rounded-lg transition"
                  style={{ backgroundColor: '#FEE2E2' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FCE8E8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                >
                  <MdDelete className="text-sm sm:text-base md:text-lg" style={{ color: '#8B1E2D' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;