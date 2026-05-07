// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { FaRupeeSign, FaHeart, FaRegHeart } from 'react-icons/fa';

// // const ProductCard = ({ product, onWishlistToggle, isWishlisted }) => {
// //     const navigate = useNavigate();

// //     return (
// //         <div 
// //             className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
// //             onClick={() => navigate(`/product/${product._id}`)}
// //         >
// //             {/* Image */}
// //             <div className="relative h-48 overflow-hidden bg-gray-100">
// //                 <img 
// //                     src={product.image} 
// //                     alt={product.name}
// //                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                 />
// //                 {product.stock === 0 && (
// //                     <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
// //                         Out of Stock
// //                     </div>
// //                 )}
// //                 <button 
// //                     onClick={(e) => {
// //                         e.stopPropagation();
// //                         onWishlistToggle(product._id);
// //                     }}
// //                     className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
// //                 >
// //                     {isWishlisted ? 
// //                         <FaHeart className="text-red-500" /> : 
// //                         <FaRegHeart className="text-gray-600" />
// //                     }
// //                 </button>
// //             </div>

// //             {/* Content */}
// //             <div className="p-4">
// //                 <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
// //                     {product.name}
// //                 </h3>
// //                 <p className="text-gray-500 text-sm mt-1 line-clamp-2">
// //                     {product.description}
// //                 </p>
// //                 <div className="flex justify-between items-center mt-3">
// //                     <div className="flex items-center gap-1">
// //                         <FaRupeeSign className="text-gray-600 text-sm" />
// //                         <span className="font-bold text-gray-900 text-xl">
// //                             {product.price.toLocaleString()}
// //                         </span>
// //                     </div>
// //                     <div className="text-xs text-gray-500">
// //                         {product.category}
// //                     </div>
// //                 </div>
// //                 {product.stock > 0 && product.stock < 10 && (
// //                     <p className="text-xs text-orange-600 mt-2">
// //                         Only {product.stock} left
// //                     </p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductCard;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaRupeeSign, FaHeart, FaRegHeart, FaShoppingCart, FaBolt } from 'react-icons/fa';

// const ProductCard = ({ product, onWishlistToggle, isWishlisted, onAddToCart, onBuyNow }) => {
//     const navigate = useNavigate();

//     // Calculate discount percentage
//     const originalPrice = Math.round(product.price * 1.3);
//     const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

//     return (
//         <div 
//             className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full flex flex-col"
//             onClick={() => navigate(`/product/${product._id}`)}
//         >
//             {/* ✅ Image Container - Fixed Aspect Ratio (Square) */}
//             <div className="relative aspect-square bg-gray-50 overflow-hidden">
//                 <img 
//                     src={product.image} 
//                     alt={product.name}
//                     className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
//                     onError={(e) => e.target.src = "https://via.placeholder.com/300"}
//                 />
                
//                 {/* ✅ Discount Badge */}
//                 {discountPercent > 0 && (
//                     <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
//                         {discountPercent}% OFF
//                     </div>
//                 )}
                
//                 {/* ✅ Stock Status Badge */}
//                 {product.stock === 0 && (
//                     <div className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-md">
//                         Out of Stock
//                     </div>
//                 )}
//                 {product.stock > 0 && product.stock < 10 && (
//                     <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
//                         Low Stock
//                     </div>
//                 )}
                
//                 {/* ✅ Wishlist Button */}
//                 <button 
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onWishlistToggle(product._id);
//                     }}
//                     className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
//                 >
//                     {isWishlisted ? 
//                         <FaHeart className="text-red-600 text-lg" /> : 
//                         <FaRegHeart className="text-gray-600 text-lg hover:text-red-600" />
//                     }
//                 </button>
//             </div>

//             {/* ✅ Content - Flexible Height with Flex Column */}
//             <div className="p-4 flex flex-col flex-grow">
//                 {/* Category */}
//                 <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1 line-clamp-1">
//                     {product.category || "General"}
//                 </p>
                
//                 {/* Product Name - Fixed min height for alignment */}
//                 <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
//                     {product.name}
//                 </h3>
                
//                 {/* Description - Optional */}
//                 {product.description && (
//                     <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2rem]">
//                         {product.description}
//                     </p>
//                 )}
                
//                 {/* ✅ Price Section - Margin Top Auto for alignment */}
//                 <div className="mt-auto pt-3">
//                     <div className="flex items-center gap-2 flex-wrap">
//                         <div className="flex items-center gap-1">
//                             <FaRupeeSign className="text-gray-600 text-sm" />
//                             <span className="font-bold text-gray-900 text-lg sm:text-xl">
//                                 {product.price.toLocaleString()}
//                             </span>
//                         </div>
//                         {originalPrice > product.price && (
//                             <>
//                                 <span className="text-xs text-gray-400 line-through">
//                                     ₹{originalPrice.toLocaleString()}
//                                 </span>
//                                 <span className="text-xs text-green-600 font-medium">
//                                     Save {discountPercent}%
//                                 </span>
//                             </>
//                         )}
//                     </div>
                    
//                     {/* Stock Warning */}
//                     {product.stock > 0 && product.stock < 10 && (
//                         <p className="text-xs text-orange-600 mt-1">
//                             ⚡ Only {product.stock} left
//                         </p>
//                     )}
                    
//                     {/* ✅ Action Buttons - Fixed Height, Equal Width */}
//                     <div className="flex gap-2 mt-3">
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 onAddToCart(product);
//                             }}
//                             disabled={product.stock === 0}
//                             className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
//                                 product.stock === 0 
//                                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                                     : 'bg-white border-2 border-[#8B1E2D] text-[#8B1E2D] hover:bg-[#8B1E2D] hover:text-white'
//                             }`}
//                         >
//                             <FaShoppingCart size={12} /> ADD
//                         </button>
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 onBuyNow(product);
//                             }}
//                             disabled={product.stock === 0}
//                             className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
//                                 product.stock === 0 
//                                     ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
//                                     : 'bg-[#8B1E2D] text-white hover:bg-[#6B1622]'
//                             }`}
//                         >
//                             <FaBolt size={12} /> BUY
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaHeart, FaRegHeart, FaShoppingCart, FaBolt, FaStar } from 'react-icons/fa';

const ProductCard = ({ product, onWishlistToggle, isWishlisted, onAddToCart, onBuyNow }) => {
    const navigate = useNavigate();

    // Calculate discount percentage
    const originalPrice = Math.round(product.price * 1.3);
    const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

    return (
        <div 
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full flex flex-col"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => e.target.src = "https://via.placeholder.com/300"}
                />
                
                {/* Discount Badge */}
                {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        {discountPercent}% OFF
                    </div>
                )}
                
                {/* Stock Status Badge */}
                {product.stock === 0 && (
                    <div className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Out of Stock
                    </div>
                )}
                {product.stock > 0 && product.stock < 10 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Low Stock
                    </div>
                )}
                
                {/* Wishlist Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onWishlistToggle(product._id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                    {isWishlisted ? 
                        <FaHeart className="text-red-600 text-lg" /> : 
                        <FaRegHeart className="text-gray-600 text-lg hover:text-red-600" />
                    }
                </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Category */}
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1 line-clamp-1">
                    {product.category || "General"}
                </p>
                
                {/* Product Name */}
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {product.name}
                </h3>
                
                {/* ✅ Rating Stars - DYNAMIC DATA */}
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar 
                                key={star}
                                className={`text-xs ${star <= (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.numReviews || 0})</span>
                </div>
                
                {/* Description */}
                {product.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2rem]">
                        {product.description}
                    </p>
                )}
                
                {/* Price Section */}
                <div className="mt-auto pt-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                            <FaRupeeSign className="text-gray-600 text-sm" />
                            <span className="font-bold text-gray-900 text-lg sm:text-xl">
                                {product.price.toLocaleString()}
                            </span>
                        </div>
                        {originalPrice > product.price && (
                            <>
                                <span className="text-xs text-gray-400 line-through">
                                    ₹{originalPrice.toLocaleString()}
                                </span>
                                <span className="text-xs text-green-600 font-medium">
                                    Save {discountPercent}%
                                </span>
                            </>
                        )}
                    </div>
                    
                    {/* Stock Warning */}
                    {product.stock > 0 && product.stock < 10 && (
                        <p className="text-xs text-orange-600 mt-1">
                            ⚡ Only {product.stock} left
                        </p>
                    )}
                    
                   {/* ✅ Action Buttons - More Prominent */}
<div className="flex gap-3 mt-4">
    <button
        onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
        }}
        disabled={product.stock === 0}
        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
            product.stock === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-white border-2 border-[#8B1E2D] text-[#8B1E2D] hover:bg-[#8B1E2D] hover:text-white hover:scale-105'
        }`}
    >
        <FaShoppingCart size={14} /> ADD TO CART
    </button>
    <button
        onClick={(e) => {
            e.stopPropagation();
            onBuyNow(product);
        }}
        disabled={product.stock === 0}
        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
            product.stock === 0 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-[#8B1E2D] text-white hover:bg-[#6B1622] hover:scale-105'
        }`}
    >
        <FaBolt size={14} /> BUY NOW
    </button>
</div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;