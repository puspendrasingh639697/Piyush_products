// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import API from "../utils/api";
// import { toast } from "react-toastify";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// // ✅ Import Review Actions
// import { addReview, getProductReviews, clearReviewState } from "../redux/slices/reviewSlice";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [product, setProduct] = useState(null);
//   const [selectedImg, setSelectedImg] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // ✅ Review States
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [hover, setHover] = useState(0);
  
//   const scrollRef = useRef(null);
  
//   // ✅ Redux States
//   const { userInfo } = useSelector((state) => state.user);
//   const { reviews, averageRating, totalReviews, isLoading: reviewLoading, success } = useSelector((state) => state.reviews);

//   useEffect(() => {
//     console.log("Product ID from URL:", id);
//     window.scrollTo(0, 0);
//     if (id) {
//       fetchProduct();
//       dispatch(getProductReviews(id));
//     }
//   }, [id, dispatch]);

//   // ✅ Clear review state on unmount
//   useEffect(() => {
//     return () => {
//       dispatch(clearReviewState());
//     };
//   }, [dispatch]);

//   // ✅ Show success message when review added
//   useEffect(() => {
//     if (success) {
//       toast.success("Review added successfully! ⭐");
//       setRating(0);
//       setComment("");
//       dispatch(getProductReviews(id));
//       dispatch(clearReviewState());
//     }
//   }, [success, dispatch, id]);

//   const fetchProduct = async () => {
//     setLoading(true);
//     try {
//       const response = await API.get(`/products/${id}`);
//       console.log("Product fetched:", response.data);
      
//       setProduct(response.data);
//       setSelectedImg(response.data.image);
      
//       const allProductsRes = await API.get('/products/all');
//       let allProducts = [];
//       if (Array.isArray(allProductsRes.data)) {
//         allProducts = allProductsRes.data;
//       } else if (allProductsRes.data?.products) {
//         allProducts = allProductsRes.data.products;
//       }
      
//       const related = allProducts
//         .filter(p => p.category === response.data.category && p._id !== id)
//         .slice(0, 4);
//       setRelatedProducts(related);
      
//     } catch (err) {
//       console.error("Failed to fetch product:", err);
//       toast.error("Product not found");
//       navigate('/');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addToCart = () => {
//     if (!product) return;
    
//     const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
//     const existingItem = cart.find(item => item.id === product._id);
    
//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.push({
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: quantity
//       });
//     }
    
//     localStorage.setItem('shoppingCart', JSON.stringify(cart));
//     toast.success(`${quantity} x ${product.name} added to cart!`);
//     setIsCartOpen(false);
//   };

//   const buyNow = () => {
//     addToCart();
//     navigate('/cart');
//   };

//   // ✅ Handle Review Submit
//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     if (!userInfo) {
//       toast.error("Please login to add review");
//       navigate('/');
//       return;
//     }
//     if (rating === 0) {
//       toast.error("Please select a rating");
//       return;
//     }
//     if (!comment.trim()) {
//       toast.error("Please write a review");
//       return;
//     }
//     dispatch(addReview({ productId: id, rating, comment }));
//   };

//   // ✅ Star Rating Component
//   const renderStars = (ratingValue) => {
//     return (
//       <div className="flex text-yellow-500">
//         {[...Array(5)].map((_, i) => (
//           <FaStar key={i} className={i < Math.floor(ratingValue) ? "fill-current" : "text-gray-300"} />
//         ))}
//         {ratingValue % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500" />}
//       </div>
//     );
//   };

//   if (loading) {
//     return <div className="pt-40 text-center font-light tracking-[5px]">LOADING...</div>;
//   }

//   if (!product) {
//     return <div className="pt-40 text-center font-light tracking-[5px]">PRODUCT NOT FOUND</div>;
//   }

//   return (
//     <div className="max-w-[1400px] mx-auto p-4 md:p-10 pt-28">
//       {/* Breadcrumb */}
//       <nav className="flex items-center gap-2 text-[14px] text-black mb-8">
//         <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
//         <span>/</span>
//         <Link to={`/category/${product.category}`} className="hover:text-red-600 transition-colors">
//           {product.category || "Collection"}
//         </Link>
//         <span>/</span>
//         <span className="text-gray-900 font-bold truncate max-w-[200px]">{product.name}</span>
//       </nav>

//       {/* Main Product Section */}
//       <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
//         {/* Image Gallery */}
//         <div className="flex w-full lg:w-[55%] gap-4 h-[500px] md:h-[600px]">
//           <div className="hidden md:flex flex-col gap-3 w-20">
//             <div ref={scrollRef} className="flex flex-col gap-3 overflow-y-auto h-full no-scrollbar py-1">
//               {[product.image, product.image, product.image, product.image].map((img, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     setSelectedImg(img);
//                     setCurrentIndex(index);
//                     if (scrollRef.current) {
//                       scrollRef.current.scrollTo({ top: index * 100, behavior: "smooth" });
//                     }
//                   }}
//                   className={`cursor-pointer transition-all duration-300 p-1 flex-shrink-0 ${
//                     currentIndex === index ? "border border-red-600" : "opacity-60"
//                   }`}
//                 >
//                   <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex-1 border border-gray-100 relative flex items-center justify-center group overflow-hidden">
//             <img src={selectedImg} className="max-h-full object-contain transition-transform duration-700 group-hover:scale-110" alt={product.name} />
//             <div className="bg-red-600 absolute top-6 left-6 px-3 py-1 text-[12px] text-white tracking-[2px]">
//               Premium Quality
//             </div>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex-1 flex flex-col text-left">
//           <p className="text-red-600 text-[14px] mb-4 font-semibold">{product.category}</p>
//           <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-[1.3] mb-6 uppercase tracking-tight">
//             {product.name}
//           </h1>

//           <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 pb-8">
//             <span className="text-4xl font-serif text-gray-900">₹{product.price}</span>
//             <span className="text-gray-400 line-through text-lg font-light italic">₹{Math.round(product.price * 1.3)}</span>
//             <span className="text-green-600 text-[11px] font-bold uppercase tracking-widest ml-auto">
//               {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
//             </span>
//           </div>

//           <div className="space-y-8">
//             <p className="text-black text-sm leading-relaxed font-light">
//               {product.description}
//             </p>

//             <div className="flex items-center gap-10">
//               <span className="text-[16px] text-black">Quantity</span>
//               <div className="flex items-center border border-black h-12">
//                 <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-r border-black">-</button>
//                 <span className="px-10 font-bold">{quantity}</span>
//                 <button onClick={() => setQuantity(q => q + 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-l border-black">+</button>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-4">
//               <button 
//                 onClick={() => setIsCartOpen(true)} 
//                 className="w-full bg-red-800 text-white py-3 text-[14px] hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-lg"
//               >
//                 Add To Shopping Bag
//               </button>
//               <button 
//                 onClick={buyNow}
//                 className="w-full bg-black text-white py-3 text-[14px] hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Description Section */}
//       <div className="border-gray-200 mb-20">
//         <div className="flex justify-center mb-10">
//           <h2 className="text-xl pb-2 border-b-2 border-red-600">Description</h2>
//         </div>
//         <div className="max-w-[1000px] mx-auto text-center bg-gray-50 p-8 rounded-sm">
//           <p className="text-black leading-[1.8] text-[15px]">
//             {product.description}
//           </p>
//         </div>
//       </div>

//       {/* ✅ REVIEWS SECTION */}
//       <div className="border-gray-200 mb-20">
//         <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
//           <h2 className="text-xl pb-2 border-b-2 border-red-600">Customer Reviews</h2>
//           <div className="flex items-center gap-2">
//             <div className="flex text-yellow-500">
//               {renderStars(averageRating)}
//             </div>
//             <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
//             <span className="text-gray-500">({totalReviews} reviews)</span>
//           </div>
//         </div>

//         {/* ✅ Review Form */}
//         {userInfo && (
//           <div className="bg-gray-50 p-6 rounded-lg mb-8">
//             <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
//             <form onSubmit={handleReviewSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Your Rating *</label>
//                 <div className="flex gap-1">
//                   {[...Array(5)].map((_, index) => {
//                     const ratingValue = index + 1;
//                     return (
//                       <button
//                         type="button"
//                         key={index}
//                         onClick={() => setRating(ratingValue)}
//                         onMouseEnter={() => setHover(ratingValue)}
//                         onMouseLeave={() => setHover(0)}
//                         className="text-2xl focus:outline-none transition-colors"
//                       >
//                         {ratingValue <= (hover || rating) ? (
//                           <FaStar className="text-yellow-500" />
//                         ) : (
//                           <FaRegStar className="text-gray-400" />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Your Review *</label>
//                 <textarea
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   rows="4"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   placeholder="Share your experience with this product..."
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={reviewLoading}
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
//               >
//                 {reviewLoading ? "Submitting..." : "Submit Review"}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* ✅ Reviews List */}
//         <div className="space-y-6">
//           {reviews.length === 0 ? (
//             <div className="text-center py-8 bg-gray-50 rounded-lg">
//               <p className="text-gray-500">No reviews yet.</p>
//               {!userInfo && (
//                 <p className="text-sm text-gray-400 mt-2">
//                   <button onClick={() => navigate('/')} className="text-red-600 hover:underline">
//                     Login
//                   </button> to be the first to review this product!
//                 </p>
//               )}
//             </div>
//           ) : (
//             reviews.map((review, index) => (
//               <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
//                 <div className="flex items-center gap-3 mb-2 flex-wrap">
//                   <div className="flex text-yellow-500">
//                     {renderStars(review.rating)}
//                   </div>
//                   <span className="font-semibold text-gray-800">
//                     {review.user?.name || 'Anonymous User'}
//                   </span>
//                   <span className="text-xs text-gray-400">
//                     {new Date(review.createdAt).toLocaleDateString('en-IN', {
//                       day: 'numeric',
//                       month: 'long',
//                       year: 'numeric'
//                     })}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 leading-relaxed">{review.comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Related Products Section */}
//       {relatedProducts.length > 0 && (
//         <div className="mb-20">
//           <div className="flex justify-center mb-12">
//             <h2 className="text-xl border-b-2 border-red-600 pb-2">Related Products</h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {relatedProducts.map((item) => (
//               <div 
//                 key={item._id} 
//                 className="group cursor-pointer"
//                 onClick={() => navigate(`/product/${item._id}`)}
//               >
//                 <div className="aspect-square mb-4 p-6 border border-gray-100 overflow-hidden relative bg-white">
//                   <img src={item.image} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500" alt={item.name} />
//                 </div>
//                 <h3 className="text-[14px] text-black line-clamp-1 hover:text-red-600 transition-colors">{item.name}</h3>
//                 <p className="text-red-800 font-bold mt-2">₹{item.price}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Cart Drawer */}
//       <AnimatePresence>
//         {isCartOpen && (
//           <div className="fixed inset-0 z-[1000] flex justify-end">
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsCartOpen(false)}
//               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//             />
//             <motion.div 
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//               className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col p-6"
//             >
//               <div className="flex justify-between items-center mb-6 border-b pb-4">
//                 <h2 className="text-xl font-bold uppercase tracking-tighter">Shopping Bag</h2>
//                 <button onClick={() => setIsCartOpen(false)} className="text-3xl font-light">&times;</button>
//               </div>

//               <div className="flex gap-4 border-b pb-6">
//                 <img src={product.image} className="w-24 h-24 object-contain border bg-white rounded" alt="cart item" />
//                 <div className="flex-1">
//                   <h3 className="text-[13px] font-bold uppercase leading-tight">{product.name}</h3>
//                   <p className="text-md font-bold mt-2 text-red-600">₹{product.price}</p>
//                   <p className="text-sm text-gray-500">Quantity: {quantity}</p>
//                 </div>
//               </div>

//               <div className="mt-auto pt-6 space-y-4">
//                 <div className="flex justify-between text-lg font-bold border-t pt-4">
//                   <span>Total:</span>
//                   <span>₹{product.price * quantity}</span>
//                 </div>
//                 <button 
//                   onClick={() => {
//                     addToCart();
//                     navigate('/checkout');
//                   }}
//                   className="w-full bg-black text-white py-4 text-xs font-black uppercase tracking-[2px] hover:bg-gray-800 transition-colors"
//                 >
//                   PROCEED TO CHECKOUT
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import API from "../utils/api";
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

// Import Actions
import { addReview, getProductReviews, clearReviewState } from "../redux/slices/reviewSlice";
import { toggleWishlist, fetchWishlist } from "../redux/slices/wishlistSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review States
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  
  const scrollRef = useRef(null);
  
  // Redux States
  const { userInfo } = useSelector((state) => state.user);
  const { reviews, averageRating, totalReviews, isLoading: reviewLoading, success } = useSelector((state) => state.reviews);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    console.log("Product ID from URL:", id);
    window.scrollTo(0, 0);
    if (id) {
      fetchProduct();
      dispatch(getProductReviews(id));
    }
    if (userInfo) {
      dispatch(fetchWishlist());
    }
  }, [id, dispatch, userInfo]);

  // Clear review state on unmount
  useEffect(() => {
    return () => {
      dispatch(clearReviewState());
    };
  }, [dispatch]);

  // Show success message when review added
  useEffect(() => {
    if (success) {
      toast.success("Review added successfully! ⭐");
      setRating(0);
      setComment("");
      dispatch(getProductReviews(id));
      dispatch(clearReviewState());
    }
  }, [success, dispatch, id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/products/${id}`);
      console.log("Product fetched:", response.data);
      
      setProduct(response.data);
      setSelectedImg(response.data.image);
      
      const allProductsRes = await API.get('/products/all');
      let allProducts = [];
      if (Array.isArray(allProductsRes.data)) {
        allProducts = allProductsRes.data;
      } else if (allProductsRes.data?.products) {
        allProducts = allProductsRes.data.products;
      }
      
      const related = allProducts
        .filter(p => p.category === response.data.category && p._id !== id)
        .slice(0, 4);
      setRelatedProducts(related);
      
    } catch (err) {
      console.error("Failed to fetch product:", err);
      toast.error("Product not found");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const existingItem = cart.find(item => item.id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    toast.success(`${quantity} x ${product.name} added to cart!`);
    setIsCartOpen(false);
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  // ✅ Wishlist Toggle Handler
  const handleWishlistToggle = () => {
    if (!userInfo) {
      toast.error("Please login to add to wishlist");
      navigate('/');
      return;
    }
    dispatch(toggleWishlist(id));
  };

  // Check if product is in wishlist
  const isInWishlist = () => {
    return wishlistItems?.includes(id);
  };

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error("Please login to add review");
      navigate('/');
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }
    dispatch(addReview({ productId: id, rating, comment }));
  };

  // Star Rating Component
  const renderStars = (ratingValue) => {
    return (
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < Math.floor(ratingValue) ? "fill-current" : "text-gray-300"} />
        ))}
        {ratingValue % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500" />}
      </div>
    );
  };

  if (loading) {
    return <div className="pt-40 text-center font-light tracking-[5px]">LOADING...</div>;
  }

  if (!product) {
    return <div className="pt-40 text-center font-light tracking-[5px]">PRODUCT NOT FOUND</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-10 pt-28">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[14px] text-black mb-8">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-red-600 transition-colors">
          {product.category || "Collection"}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
        {/* Image Gallery */}
        <div className="flex w-full lg:w-[55%] gap-4 h-[500px] md:h-[600px]">
          <div className="hidden md:flex flex-col gap-3 w-20">
            <div ref={scrollRef} className="flex flex-col gap-3 overflow-y-auto h-full no-scrollbar py-1">
              {[product.image, product.image, product.image, product.image].map((img, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedImg(img);
                    setCurrentIndex(index);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({ top: index * 100, behavior: "smooth" });
                    }
                  }}
                  className={`cursor-pointer transition-all duration-300 p-1 flex-shrink-0 ${
                    currentIndex === index ? "border border-red-600" : "opacity-60"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 border border-gray-100 relative flex items-center justify-center group overflow-hidden">
            <img src={selectedImg} className="max-h-full object-contain transition-transform duration-700 group-hover:scale-110" alt={product.name} />
            <div className="bg-red-600 absolute top-6 left-6 px-3 py-1 text-[12px] text-white tracking-[2px]">
              Premium Quality
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col text-left">
          <p className="text-red-600 text-[14px] mb-4 font-semibold">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-[1.3] mb-6 uppercase tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 pb-8">
            <span className="text-4xl font-serif text-gray-900">₹{product.price}</span>
            <span className="text-gray-400 line-through text-lg font-light italic">₹{Math.round(product.price * 1.3)}</span>
            <span className="text-green-600 text-[11px] font-bold uppercase tracking-widest ml-auto">
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </span>
          </div>

          <div className="space-y-8">
            <p className="text-black text-sm leading-relaxed font-light">
              {product.description}
            </p>

            <div className="flex items-center gap-10">
              <span className="text-[16px] text-black">Quantity</span>
              <div className="flex items-center border border-black h-12">
                <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-r border-black">-</button>
                <span className="px-10 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-l border-black">+</button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {/* ✅ Wishlist Button */}
              <button 
                onClick={handleWishlistToggle}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  isInWishlist() 
                    ? 'bg-red-50 text-red-600 border border-red-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isInWishlist() ? (
                  <><FaHeart className="text-red-500" /> Added to Wishlist</>
                ) : (
                  <><FaRegHeart /> Add to Wishlist</>
                )}
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="flex-1 bg-red-800 text-white py-3 text-[14px] hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-lg rounded-lg"
              >
                Add To Shopping Bag
              </button>
              <button 
                onClick={buyNow}
                className="flex-1 bg-black text-white py-3 text-[14px] hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg rounded-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="border-gray-200 mb-20">
        <div className="flex justify-center mb-10">
          <h2 className="text-xl pb-2 border-b-2 border-red-600">Description</h2>
        </div>
        <div className="max-w-[1000px] mx-auto text-center bg-gray-50 p-8 rounded-sm">
          <p className="text-black leading-[1.8] text-[15px]">
            {product.description}
          </p>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="border-gray-200 mb-20">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <h2 className="text-xl pb-2 border-b-2 border-red-600">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
              {renderStars(averageRating)}
            </div>
            <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
        </div>

        {/* Review Form */}
        {userInfo && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Rating *</label>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        className="text-2xl focus:outline-none transition-colors"
                      >
                        {ratingValue <= (hover || rating) ? (
                          <FaStar className="text-yellow-500" />
                        ) : (
                          <FaRegStar className="text-gray-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Review *</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Share your experience with this product..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={reviewLoading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No reviews yet.</p>
              {!userInfo && (
                <p className="text-sm text-gray-400 mt-2">
                  <button onClick={() => navigate('/')} className="text-red-600 hover:underline">
                    Login
                  </button> to be the first to review this product!
                </p>
              )}
            </div>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="flex text-yellow-500">
                    {renderStars(review.rating)}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {review.user?.name || 'Anonymous User'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mb-20">
          <div className="flex justify-center mb-12">
            <h2 className="text-xl border-b-2 border-red-600 pb-2">Related Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div 
                key={item._id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <div className="aspect-square mb-4 p-6 border border-gray-100 overflow-hidden relative bg-white">
                  <img src={item.image} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500" alt={item.name} />
                </div>
                <h3 className="text-[14px] text-black line-clamp-1 hover:text-red-600 transition-colors">{item.name}</h3>
                <p className="text-red-800 font-bold mt-2">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold uppercase tracking-tighter">Shopping Bag</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-3xl font-light">&times;</button>
              </div>

              <div className="flex gap-4 border-b pb-6">
                <img src={product.image} className="w-24 h-24 object-contain border bg-white rounded" alt="cart item" />
                <div className="flex-1">
                  <h3 className="text-[13px] font-bold uppercase leading-tight">{product.name}</h3>
                  <p className="text-md font-bold mt-2 text-red-600">₹{product.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                </div>
              </div>

              <div className="mt-auto pt-6 space-y-4">
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Total:</span>
                  <span>₹{product.price * quantity}</span>
                </div>
                <button 
                  onClick={() => {
                    addToCart();
                    navigate('/checkout');
                  }}
                  className="w-full bg-black text-white py-4 text-xs font-black uppercase tracking-[2px] hover:bg-gray-800 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;