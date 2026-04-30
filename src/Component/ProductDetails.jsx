// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaRupeeSign, FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar, FaPlus, FaMinus, FaShoppingCart, FaUser, FaCalendarAlt } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import API from '../utils/api';

// const ProductDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [quantity, setQuantity] = useState(1);
//     const [isInWishlist, setIsInWishlist] = useState(false);
//     const [isAddingToCart, setIsAddingToCart] = useState(false);
    
//     // ✅ Reviews State
//     const [reviews, setReviews] = useState([]);
//     const [averageRating, setAverageRating] = useState(0);
//     const [totalReviews, setTotalReviews] = useState(0);
//     const [userRating, setUserRating] = useState(0);
//     const [userReview, setUserReview] = useState('');
//     const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    
//     // ✅ Related Products State
//     const [relatedProducts, setRelatedProducts] = useState([]);
    
//     // ✅ Get current user
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         fetchProduct();
//         fetchReviews();
//         checkWishlist();
//     }, [id]);

//     const fetchProduct = async () => {
//         setIsLoading(true);
//         try {
//             const response = await API.get(`/products/${id}`);
//             setProduct(response.data);
            
//             // Fetch related products (same category)
//             if (response.data.category) {
//                 const allProductsRes = await API.get('/products/all');
//                 let allProducts = [];
//                 if (Array.isArray(allProductsRes.data)) {
//                     allProducts = allProductsRes.data;
//                 } else if (allProductsRes.data?.products) {
//                     allProducts = allProductsRes.data.products;
//                 }
//                 const related = allProducts
//                     .filter(p => p.category === response.data.category && p._id !== id)
//                     .slice(0, 4);
//                 setRelatedProducts(related);
//             }
//         } catch (error) {
//             console.error("Failed to fetch product:", error);
//             navigate('/products');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchReviews = async () => {
//         try {
//             const response = await API.get(`/products/${id}/reviews`);
//             console.log("Reviews response:", response.data);
            
//             if (response.data.reviews) {
//                 setReviews(response.data.reviews);
//                 setAverageRating(response.data.averageRating || 0);
//                 setTotalReviews(response.data.totalReviews || 0);
//             } else if (Array.isArray(response.data)) {
//                 setReviews(response.data);
//                 const avg = response.data.reduce((sum, r) => sum + r.rating, 0) / response.data.length;
//                 setAverageRating(avg || 0);
//                 setTotalReviews(response.data.length);
//             }
//         } catch (error) {
//             console.error("Failed to fetch reviews:", error);
//             setReviews([]);
//         }
//     };

//     const checkWishlist = async () => {
//         if (!token) return;

//         try {
//             const response = await API.get('/user/wishlist');
//             if (response.data && response.data.wishlist) {
//                 setIsInWishlist(response.data.wishlist.some(item => item._id === id));
//             }
//         } catch (error) {
//             console.error("Failed to check wishlist:", error);
//         }
//     };

//     const handleWishlistToggle = async () => {
//         if (!token) {
//             toast.error("Please login first");
//             navigate('/login');
//             return;
//         }

//         try {
//             const response = await API.post('/user/wishlist', { productId: id });
//             if (response.data.success) {
//                 setIsInWishlist(!isInWishlist);
//                 toast.success(response.data.message || (isInWishlist ? "Removed from wishlist" : "Added to wishlist"));
//             }
//         } catch (error) {
//             console.error("Wishlist toggle failed:", error);
//             toast.error("Failed to update wishlist");
//         }
//     };

//     const handleAddToCart = async () => {
//         if (!token) {
//             toast.error("Please login first");
//             navigate('/login');
//             return;
//         }

//         setIsAddingToCart(true);
//         try {
//             let cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
//             const existingItem = cart.find(item => item.id === id);

//             if (existingItem) {
//                 existingItem.quantity += quantity;
//             } else {
//                 cart.push({ 
//                     id: id, 
//                     name: product.name, 
//                     price: product.price, 
//                     image: product.image,
//                     quantity: quantity 
//                 });
//             }

//             localStorage.setItem('shoppingCart', JSON.stringify(cart));
//             window.dispatchEvent(new Event('storage'));
//             toast.success(`${product.name} added to cart!`);
//         } catch (error) {
//             console.error("Failed to add to cart:", error);
//             toast.error("Failed to add to cart");
//         } finally {
//             setIsAddingToCart(false);
//         }
//     };

//     const handleBuyNow = () => {
//         handleAddToCart();
//         setTimeout(() => {
//             navigate('/checkout');
//         }, 500);
//     };

//     // ✅ Submit Review
//     const handleSubmitReview = async (e) => {
//         e.preventDefault();
//         if (!token) {
//             toast.error("Please login to submit review");
//             navigate('/login');
//             return;
//         }
        
//         if (userRating === 0) {
//             toast.error("Please select a rating");
//             return;
//         }
        
//         if (!userReview.trim()) {
//             toast.error("Please write a review");
//             return;
//         }
        
//         setIsSubmittingReview(true);
//         try {
//             const response = await API.post(`/products/${id}/reviews`, {
//                 rating: userRating,
//                 comment: userReview
//             });
            
//             if (response.data.success) {
//                 toast.success("Review submitted successfully!");
//                 setUserRating(0);
//                 setUserReview('');
//                 fetchReviews(); // Refresh reviews
//             }
//         } catch (error) {
//             console.error("Failed to submit review:", error);
//             toast.error(error.response?.data?.message || "Failed to submit review");
//         } finally {
//             setIsSubmittingReview(false);
//         }
//     };

//     const renderStars = (rating, interactive = false, onStarClick = null) => {
//         const stars = [];
//         const displayRating = interactive ? userRating : rating;
        
//         for (let i = 1; i <= 5; i++) {
//             if (interactive) {
//                 stars.push(
//                     <button
//                         key={i}
//                         type="button"
//                         onClick={() => onStarClick(i)}
//                         className="focus:outline-none transition-transform hover:scale-110"
//                     >
//                         {i <= displayRating ? (
//                             <FaStar className="text-yellow-400 text-2xl" />
//                         ) : (
//                             <FaRegStar className="text-yellow-400 text-2xl" />
//                         )}
//                     </button>
//                 );
//             } else {
//                 if (i <= Math.floor(displayRating)) {
//                     stars.push(<FaStar key={i} className="text-yellow-400" />);
//                 } else if (i === Math.floor(displayRating) + 1 && displayRating % 1 >= 0.5) {
//                     stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//                 } else {
//                     stars.push(<FaRegStar key={i} className="text-yellow-400" />);
//                 }
//             }
//         }
//         return stars;
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return "Recently";
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-3"></div>
//                     <p className="text-gray-600">Loading product...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-gray-600">Product not found</p>
//                     <button onClick={() => navigate('/products')} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg">
//                         Back to Products
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="max-w-6xl mx-auto px-4">
//                 {/* Back Button */}
//                 <button 
//                     onClick={() => navigate(-1)}
//                     className="mb-6 text-gray-600 hover:text-gray-900 transition-colors"
//                 >
//                     ← Back
//                 </button>

//                 {/* Product Main Section */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//                     <div className="grid md:grid-cols-2 gap-8 p-6">
//                         {/* Product Image */}
//                         <div className="bg-gray-50 rounded-lg overflow-hidden">
//                             <img 
//                                 src={product.image} 
//                                 alt={product.name}
//                                 className="w-full h-auto object-cover"
//                                 onError={(e) => e.target.src = "https://via.placeholder.com/400"}
//                             />
//                         </div>

//                         {/* Product Info */}
//                         <div>
//                             <div className="flex justify-between items-start mb-4">
//                                 <div>
//                                     <p className="text-sm text-red-600 mb-1">{product.category}</p>
//                                     <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
//                                 </div>
//                                 <button 
//                                     onClick={handleWishlistToggle}
//                                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                                 >
//                                     {isInWishlist ? 
//                                         <FaHeart className="text-red-500 text-2xl" /> : 
//                                         <FaRegHeart className="text-gray-400 text-2xl hover:text-red-500" />
//                                     }
//                                 </button>
//                             </div>

//                             <div className="flex items-center gap-2 mb-4">
//                                 <div className="flex gap-1">
//                                     {renderStars(averageRating)}
//                                 </div>
//                                 <span className="text-gray-500 text-sm">
//                                     ({totalReviews} reviews)
//                                 </span>
//                             </div>

//                             <div className="mb-6">
//                                 <div className="flex items-center gap-1 mb-2">
//                                     <FaRupeeSign className="text-gray-600" />
//                                     <span className="text-3xl font-bold text-gray-900">
//                                         {product.price.toLocaleString()}
//                                     </span>
//                                     <span className="text-gray-400 line-through ml-2">
//                                         ₹{Math.round(product.price * 1.3).toLocaleString()}
//                                     </span>
//                                 </div>
                                
//                                 <div className="flex items-center gap-2">
//                                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                                         product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                                     }`}>
//                                         {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
//                                 <p className="text-gray-600 leading-relaxed">{product.description}</p>
//                             </div>

//                             {product.stock > 0 && (
//                                 <>
//                                     <div className="flex items-center gap-4 mb-6">
//                                         <label className="text-gray-700">Quantity:</label>
//                                         <div className="flex items-center border border-gray-300 rounded-lg">
//                                             <button
//                                                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                                                 className="px-3 py-2 hover:bg-gray-100 transition-colors"
//                                             >
//                                                 <FaMinus size={12} />
//                                             </button>
//                                             <span className="w-12 text-center font-medium">{quantity}</span>
//                                             <button
//                                                 onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//                                                 className="px-3 py-2 hover:bg-gray-100 transition-colors"
//                                             >
//                                                 <FaPlus size={12} />
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <div className="flex gap-3">
//                                         <button
//                                             onClick={handleAddToCart}
//                                             disabled={isAddingToCart}
//                                             className="flex-1 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-medium"
//                                         >
//                                             <FaShoppingCart />
//                                             {isAddingToCart ? 'Adding...' : 'Add to Cart'}
//                                         </button>
//                                         <button
//                                             onClick={handleBuyNow}
//                                             className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
//                                         >
//                                             Buy Now
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* ✅ Reviews Section */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
//                         <div className="flex items-center gap-2">
//                             <div className="flex gap-1">
//                                 {renderStars(averageRating)}
//                             </div>
//                             <span className="text-gray-600 text-sm">{averageRating.toFixed(1)} out of 5</span>
//                         </div>
//                     </div>

//                     {/* Write Review Form */}
//                     {token && (
//                         <div className="bg-gray-50 rounded-lg p-6 mb-8">
//                             <h3 className="font-semibold text-gray-900 mb-4">Write a Review</h3>
//                             <form onSubmit={handleSubmitReview}>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
//                                     <div className="flex gap-2">
//                                         {renderStars(0, true, (rating) => setUserRating(rating))}
//                                     </div>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
//                                     <textarea
//                                         value={userReview}
//                                         onChange={(e) => setUserReview(e.target.value)}
//                                         rows="4"
//                                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                                         placeholder="Share your experience with this product..."
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     disabled={isSubmittingReview}
//                                     className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
//                                 >
//                                     {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
//                                 </button>
//                             </form>
//                         </div>
//                     )}

//                     {/* Reviews List */}
//                     {reviews.length === 0 ? (
//                         <div className="text-center py-8">
//                             <p className="text-gray-500">No reviews yet. Be the first to review!</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-6">
//                             {reviews.map((review, index) => (
//                                 <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <div className="flex items-center gap-2">
//                                             <FaUser className="text-gray-400" />
//                                             <span className="font-medium text-gray-900">
//                                                 {review.user?.name || 'Anonymous User'}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             {renderStars(review.rating)}
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
//                                         <span className="flex items-center gap-1">
//                                             <FaCalendarAlt /> {formatDate(review.createdAt)}
//                                         </span>
//                                     </div>
//                                     <p className="text-gray-600">{review.comment}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* ✅ Related Products Section */}
//                 {relatedProducts.length > 0 && (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                         <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                             {relatedProducts.map((item) => (
//                                 <div
//                                     key={item._id}
//                                     className="group cursor-pointer"
//                                     onClick={() => navigate(`/product/${item._id}`)}
//                                 >
//                                     <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
//                                         <img
//                                             src={item.image}
//                                             alt={item.name}
//                                             className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
//                                             onError={(e) => e.target.src = "https://via.placeholder.com/200"}
//                                         />
//                                     </div>
//                                     <h3 className="text-sm font-medium text-gray-900 truncate hover:text-red-600">
//                                         {item.name}
//                                     </h3>
//                                     <p className="text-red-600 font-bold mt-1">₹{item.price}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar, FaPlus, FaMinus, FaShoppingCart, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import API from '../utils/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    
    // ✅ Reviews State
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    
    // ✅ Related Products State
    const [relatedProducts, setRelatedProducts] = useState([]);
    
    // ✅ Get current user
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProduct();
        fetchReviews();
        checkWishlist();
    }, [id]);

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const response = await API.get(`/products/${id}`);
            setProduct(response.data);
            
            // Fetch related products (same category)
            if (response.data.category) {
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
            }
        } catch (error) {
            console.error("Failed to fetch product:", error);
            navigate('/products');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await API.get(`/products/${id}/reviews`);
            console.log("Reviews response:", response.data);
            
            if (response.data.reviews) {
                setReviews(response.data.reviews);
                setAverageRating(response.data.averageRating || 0);
                setTotalReviews(response.data.totalReviews || 0);
            } else if (Array.isArray(response.data)) {
                setReviews(response.data);
                const avg = response.data.reduce((sum, r) => sum + r.rating, 0) / response.data.length;
                setAverageRating(avg || 0);
                setTotalReviews(response.data.length);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            setReviews([]);
        }
    };

    const checkWishlist = async () => {
        if (!token) return;

        try {
            const response = await API.get('/user/wishlist');
            if (response.data && response.data.wishlist) {
                setIsInWishlist(response.data.wishlist.some(item => item._id === id));
            }
        } catch (error) {
            console.error("Failed to check wishlist:", error);
        }
    };

    const handleWishlistToggle = async () => {
        if (!token) {
            toast.error("Please login first");
            navigate('/login');
            return;
        }

        try {
            const response = await API.post('/user/wishlist', { productId: id });
            if (response.data.success) {
                setIsInWishlist(!isInWishlist);
                toast.success(response.data.message || (isInWishlist ? "Removed from wishlist" : "Added to wishlist"));
            }
        } catch (error) {
            console.error("Wishlist toggle failed:", error);
            toast.error("Failed to update wishlist");
        }
    };

    const handleAddToCart = async () => {
        if (!token) {
            toast.error("Please login first");
            navigate('/login');
            return;
        }

        setIsAddingToCart(true);
        try {
            let cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ 
                    id: id, 
                    name: product.name, 
                    price: product.price, 
                    image: product.image,
                    quantity: quantity 
                });
            }

            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
            toast.success(`${product.name} added to cart!`);
        } catch (error) {
            console.error("Failed to add to cart:", error);
            toast.error("Failed to add to cart");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        setTimeout(() => {
            navigate('/checkout');
        }, 500);
    };

    // ✅ Submit Review
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Please login to submit review");
            navigate('/login');
            return;
        }
        
        if (userRating === 0) {
            toast.error("Please select a rating");
            return;
        }
        
        if (!userReview.trim()) {
            toast.error("Please write a review");
            return;
        }
        
        setIsSubmittingReview(true);
        try {
            const response = await API.post(`/products/${id}/reviews`, {
                rating: userRating,
                comment: userReview
            });
            
            if (response.data.success) {
                toast.success("Review submitted successfully!");
                setUserRating(0);
                setUserReview('');
                fetchReviews(); // Refresh reviews
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error(error.response?.data?.message || "Failed to submit review");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const renderStars = (rating, interactive = false, onStarClick = null) => {
        const stars = [];
        const displayRating = interactive ? userRating : rating;
        
        for (let i = 1; i <= 5; i++) {
            if (interactive) {
                stars.push(
                    <button
                        key={i}
                        type="button"
                        onClick={() => onStarClick(i)}
                        className="focus:outline-none transition-transform hover:scale-110"
                    >
                        {i <= displayRating ? (
                            <FaStar className="text-yellow-400 text-xl sm:text-2xl" />
                        ) : (
                            <FaRegStar className="text-yellow-400 text-xl sm:text-2xl" />
                        )}
                    </button>
                );
            } else {
                if (i <= Math.floor(displayRating)) {
                    stars.push(<FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />);
                } else if (i === Math.floor(displayRating) + 1 && displayRating % 1 >= 0.5) {
                    stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-sm sm:text-base" />);
                } else {
                    stars.push(<FaRegStar key={i} className="text-yellow-400 text-sm sm:text-base" />);
                }
            }
        }
        return stars;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Recently";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-gray-600 text-sm sm:text-base">Product not found</p>
                    <button onClick={() => navigate('/products')} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm sm:text-base">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
                >
                    ← Back
                </button>

                {/* Product Main Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6">
                        {/* Product Image */}
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-auto object-cover"
                                onError={(e) => e.target.src = "https://via.placeholder.com/400"}
                            />
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <div className="flex-1">
                                    <p className="text-xs sm:text-sm text-red-600 mb-1">{product.category}</p>
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                                </div>
                                <button 
                                    onClick={handleWishlistToggle}
                                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
                                >
                                    {isInWishlist ? 
                                        <FaHeart className="text-red-500 text-xl sm:text-2xl" /> : 
                                        <FaRegHeart className="text-gray-400 text-xl sm:text-2xl hover:text-red-500" />
                                    }
                                </button>
                            </div>

                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <div className="flex gap-0.5 sm:gap-1">
                                    {renderStars(averageRating)}
                                </div>
                                <span className="text-gray-500 text-xs sm:text-sm">
                                    ({totalReviews} reviews)
                                </span>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center gap-1 mb-2">
                                    <FaRupeeSign className="text-gray-600 text-sm sm:text-base" />
                                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        {product.price.toLocaleString()}
                                    </span>
                                    <span className="text-gray-400 line-through ml-2 text-sm sm:text-base">
                                        ₹{Math.round(product.price * 1.3).toLocaleString()}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Description</h3>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
                            </div>

                            {product.stock > 0 && (
                                <>
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <label className="text-gray-700 text-sm sm:text-base">Quantity:</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 transition-colors"
                                            >
                                                <FaMinus size={10} className="sm:w-3 sm:h-3" />
                                            </button>
                                            <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 transition-colors"
                                            >
                                                <FaPlus size={10} className="sm:w-3 sm:h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={isAddingToCart}
                                            className="flex-1 py-2.5 sm:py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-medium text-sm sm:text-base"
                                        >
                                            <FaShoppingCart className="text-sm sm:text-base" />
                                            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                        </button>
                                        <button
                                            onClick={handleBuyNow}
                                            className="flex-1 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* ✅ Reviews Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Customer Reviews</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5 sm:gap-1">
                                {renderStars(averageRating)}
                            </div>
                            <span className="text-gray-600 text-xs sm:text-sm">{averageRating.toFixed(1)} out of 5</span>
                        </div>
                    </div>

                    {/* Write Review Form */}
                    {token && (
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Write a Review</h3>
                            <form onSubmit={handleSubmitReview}>
                                <div className="mb-3 sm:mb-4">
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Your Rating</label>
                                    <div className="flex gap-1 sm:gap-2">
                                        {renderStars(0, true, (rating) => setUserRating(rating))}
                                    </div>
                                </div>
                                <div className="mb-3 sm:mb-4">
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Your Review</label>
                                    <textarea
                                        value={userReview}
                                        onChange={(e) => setUserReview(e.target.value)}
                                        rows="4"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm sm:text-base"
                                        placeholder="Share your experience with this product..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmittingReview}
                                    className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 text-sm sm:text-base"
                                >
                                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Reviews List */}
                    {reviews.length === 0 ? (
                        <div className="text-center py-6 sm:py-8">
                            <p className="text-gray-500 text-sm sm:text-base">No reviews yet. Be the first to review!</p>
                        </div>
                    ) : (
                        <div className="space-y-4 sm:space-y-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                        <div className="flex items-center gap-2">
                                            <FaUser className="text-gray-400 text-xs sm:text-sm" />
                                            <span className="font-medium text-gray-900 text-sm sm:text-base">
                                                {review.user?.name || 'Anonymous User'}
                                            </span>
                                        </div>
                                        <div className="flex gap-0.5 sm:gap-1">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                                            <FaCalendarAlt className="text-xs" /> {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm sm:text-base">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ✅ Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-6">Related Products</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {relatedProducts.map((item) => (
                                <div
                                    key={item._id}
                                    className="group cursor-pointer"
                                    onClick={() => navigate(`/product/${item._id}`)}
                                >
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 sm:mb-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/200"}
                                        />
                                    </div>
                                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate hover:text-red-600">
                                        {item.name}
                                    </h3>
                                    <p className="text-red-600 font-bold mt-0.5 sm:mt-1 text-sm sm:text-base">₹{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;