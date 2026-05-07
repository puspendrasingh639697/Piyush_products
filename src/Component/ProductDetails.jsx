import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import API from "../utils/api";
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart, FaBolt } from "react-icons/fa";

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
  const { reviews, averageRating: avgRating, totalReviews, isLoading: reviewLoading, success } = useSelector((state) => state.reviews);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const averageRating = typeof avgRating === 'number' ? avgRating : Number(avgRating) || 0;

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

  useEffect(() => {
    return () => {
      dispatch(clearReviewState());
    };
  }, [dispatch]);

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
      
      const productData = response.data.product || response.data;
      setProduct(productData);
      setSelectedImg(productData.image);
      
      const allProductsRes = await API.get('/products/all');
      let allProducts = [];
      if (Array.isArray(allProductsRes.data)) {
        allProducts = allProductsRes.data;
      } else if (allProductsRes.data?.products) {
        allProducts = allProductsRes.data.products;
      }
      
      const related = allProducts
        .filter(p => p.category === productData.category && p._id !== id)
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

  const handleWishlistToggle = () => {
    if (!userInfo) {
      toast.error("Please login to add to wishlist");
      navigate('/');
      return;
    }
    dispatch(toggleWishlist(id));
  };

  const isInWishlist = () => {
    if (!wishlistItems) return false;
    if (wishlistItems.length > 0 && wishlistItems[0]?._id) {
      return wishlistItems.some(item => item._id === id);
    }
    return wishlistItems.includes(id);
  };

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

  const renderStars = (ratingValue) => {
    const numRating = typeof ratingValue === 'number' ? ratingValue : Number(ratingValue) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex text-yellow-500 gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="fill-current text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i} className="text-gray-300" />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="pt-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B1E2D] border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 text-center">
        <p className="text-gray-500">Product not found</p>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-[#8B1E2D] text-white rounded-lg">Go Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-10 pt-28">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <Link to="/" className="hover:text-[#8B1E2D] transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category?.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#8B1E2D] transition-colors">
          {product.category || "Collection"}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <img 
              src={selectedImg} 
              className="w-full h-[400px] md:h-[500px] object-contain p-8" 
              alt={product.name} 
              onError={(e) => e.target.src = 'https://via.placeholder.com/500x500?text=No+Image'}
            />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {[product.image, product.image, product.image].map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedImg === img ? 'border-[#8B1E2D]' : 'border-gray-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <p className="text-[#8B1E2D] text-sm mb-2 font-semibold uppercase tracking-wider">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {renderStars(averageRating)}
            </div>
            <span className="text-sm text-gray-500">({totalReviews || 0} reviews)</span>
            {product.stock > 0 ? (
              <span className="text-green-600 text-sm font-medium ml-auto">In Stock</span>
            ) : (
              <span className="text-red-600 text-sm font-medium ml-auto">Out of Stock</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
            <span className="text-3xl font-bold text-[#8B1E2D]">₹{product.price}</span>
            <span className="text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
            <span className="text-green-600 text-sm font-semibold ml-auto">Save 30%</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-6 mb-8">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)} 
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleWishlistToggle}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                isInWishlist() 
                  ? 'bg-red-50 text-[#8B1E2D] border-2 border-[#8B1E2D]' 
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-[#8B1E2D] hover:text-[#8B1E2D]'
              }`}
            >
              {isInWishlist() ? <FaHeart className="text-[#8B1E2D]" /> : <FaRegHeart />}
              {isInWishlist() ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-[#8B1E2D] bg-white text-[#8B1E2D] hover:bg-[#8B1E2D] hover:text-white"
            >
              <FaShoppingCart /> ADD TO CART
            </button>
            
            <button 
              onClick={buyNow}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 bg-[#8B1E2D] text-white hover:bg-[#6B1622]"
            >
              <FaBolt /> BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#8B1E2D] pl-3">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(averageRating)}</div>
            <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({totalReviews || 0} reviews)</span>
          </div>
        </div>

        {/* Review Form */}
        {userInfo && (
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="text-2xl focus:outline-none"
                    >
                      {star <= (hover || rating) ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Review *</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E2D] focus:border-transparent"
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button
                type="submit"
                disabled={reviewLoading}
                className="px-6 py-2 bg-[#8B1E2D] text-white rounded-lg hover:bg-[#6B1622] transition disabled:opacity-50"
              >
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No reviews yet.</p>
              {!userInfo && (
                <button onClick={() => navigate('/')} className="mt-2 text-[#8B1E2D] hover:underline">
                  Login to write a review
                </button>
              )}
            </div>
          ) : (
            reviews.map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-5 last:border-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="font-semibold text-gray-800">{review.user?.name || 'Anonymous'}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#8B1E2D] pl-3 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div 
                key={item._id} 
                onClick={() => navigate(`/product/${item._id}`)}
                className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square p-4 bg-gray-50 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500" 
                    alt={item.name}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h3>
                  <p className="text-[#8B1E2D] font-bold mt-1">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/50"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Shopping Cart</h2>
                  <button onClick={() => setIsCartOpen(false)} className="text-2xl">&times;</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex gap-4">
                  <img src={product.image} className="w-24 h-24 object-cover rounded-lg" alt={product.name} />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-[#8B1E2D] font-bold mt-1">₹{product.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span className="text-[#8B1E2D]">₹{product.price * quantity}</span>
                </div>
                <button 
                  onClick={() => {
                    addToCart();
                    navigate('/checkout');
                  }}
                  className="w-full bg-[#8B1E2D] text-white py-3 rounded-lg font-semibold hover:bg-[#6B1622] transition"
                >
                  Proceed to Checkout
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