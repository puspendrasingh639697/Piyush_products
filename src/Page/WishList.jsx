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
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">Loading wishlist...</div>
//       </div>
//     );
//   }

//   if (!user?._id) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <FaHeart className="text-6xl text-pink-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold mb-4">Please Login</h2>
//           <p className="text-gray-600 mb-6">Login to view your wishlist</p>
//           <button 
//             onClick={() => navigate('/')}
//             className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
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
//           <FaHeart className="text-6xl text-pink-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
//           <p className="text-gray-600 mb-6">Save your favorite items here</p>
//           <button 
//             onClick={() => navigate("/products")}
//             className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
//           >
//             Explore Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-white py-10 px-4 sm:px-6">
//       <div className="bg-white border border-gray-300 shadow-lg rounded-2xl px-6 py-6 mb-6">
//         <h1 className="text-3xl sm:text-4xl font-bold">
//           My Wishlist
//         </h1>
//         <p className="text-black mt-1 text-sm flex items-center gap-1">
//           <FaHeart className="text-pink-700" />
//           {wishlistItems.length} items saved for later
//         </p>
//       </div>

//       <div className="mt-6 space-y-4">
//         {wishlistItems.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white border border-gray-300 shadow-md rounded-xl p-5 lg:grid lg:grid-cols-[3fr_1fr_1fr_2fr] items-center"
//           >
//             <div className="flex items-center gap-4 w-full">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-[80px] h-[80px] rounded-lg border border-gray-400 object-contain"
//                 onError={(e) => e.target.src = "https://via.placeholder.com/80"}
//               />
//               <div>
//                 <h3 className="text-lg font-bold text-black">{item.name}</h3>
//               </div>
//             </div>

//             <div className="text-black font-bold text-center w-full">₹{item.price}</div>

//             <div className="text-green-600 font-semibold text-center w-full flex justify-center gap-1">
//               <MdProductionQuantityLimits className="text-green-600" /> In Stock
//             </div>

//             <div className="flex gap-3 w-full justify-end">
//               <button 
//                 onClick={() => handleAddToCart(item)} 
//                 className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
//               >
//                 <FaShoppingCart /> Add to Cart
//               </button>
              
//               <button 
//                 onClick={() => handleBuyNow(item)} 
//                 className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-pink-800 transition"
//               >
//                 <FaBolt /> Buy Now
//               </button>
              
//               <button 
//                 onClick={() => handleRemoveFromWishlist(item._id)} 
//                 className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
//               >
//                 <MdDelete className="text-red-700" />
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#8B1E2D] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (!user?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaHeart className="text-6xl mx-auto mb-4" style={{ color: '#8B1E2D' }} />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#8B1E2D' }}>Please Login</h2>
          <p className="text-gray-600 mb-6">Login to view your wishlist</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-lg text-white transition"
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaHeart className="text-6xl mx-auto mb-4" style={{ color: '#8B1E2D' }} />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#8B1E2D' }}>Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-6">Save your favorite items here</p>
          <button 
            onClick={() => navigate("/products")}
            className="px-6 py-2 rounded-lg text-white transition"
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
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-6 py-6 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#8B1E2D' }}>
          My Wishlist
        </h1>
        <p className="text-gray-500 mt-1 text-sm flex items-center gap-1">
          <FaHeart style={{ color: '#8B1E2D' }} />
          {wishlistItems.length} items saved for later
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 shadow-md rounded-xl p-5 lg:grid lg:grid-cols-[3fr_1fr_1fr_2fr] items-center"
          >
            <div className="flex items-center gap-4 w-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-[80px] h-[80px] rounded-lg border border-gray-200 object-contain"
                onError={(e) => e.target.src = "https://via.placeholder.com/80"}
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              </div>
            </div>

            <div className="text-center w-full">
              <span className="text-xl font-bold" style={{ color: '#8B1E2D' }}>₹{item.price}</span>
            </div>

            <div className="text-center w-full flex justify-center gap-1">
              <MdProductionQuantityLimits style={{ color: '#8B1E2D' }} />
              <span className="font-semibold" style={{ color: '#8B1E2D' }}>In Stock</span>
            </div>

            <div className="flex gap-3 w-full justify-end">
              {/* ADD TO CART BUTTON - Secondary Style */}
              <button 
                onClick={() => handleAddToCart(item)} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium"
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
                <FaShoppingCart /> Add to Cart
              </button>
              
              {/* BUY NOW BUTTON - Primary Style */}
              <button 
                onClick={() => handleBuyNow(item)} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition font-medium"
                style={{ backgroundColor: '#8B1E2D' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B1622'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B1E2D'}
              >
                <FaBolt /> Buy Now
              </button>
              
              {/* DELETE BUTTON */}
              <button 
                onClick={() => handleRemoveFromWishlist(item._id)} 
                className="p-2 rounded-lg transition"
                style={{ backgroundColor: '#FEE2E2' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FCE8E8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
              >
                <MdDelete style={{ color: '#8B1E2D' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;