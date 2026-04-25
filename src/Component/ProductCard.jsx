// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaRupeeSign, FaHeart, FaRegHeart } from 'react-icons/fa';

// const ProductCard = ({ product, onWishlistToggle, isWishlisted }) => {
//     const navigate = useNavigate();

//     return (
//         <div 
//             className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
//             onClick={() => navigate(`/product/${product._id}`)}
//         >
//             {/* Image */}
//             <div className="relative h-48 overflow-hidden bg-gray-100">
//                 <img 
//                     src={product.image} 
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 {product.stock === 0 && (
//                     <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
//                         Out of Stock
//                     </div>
//                 )}
//             </div>

//             {/* Content */}
//             <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
//                         {product.name}
//                     </h3>
//                     <button 
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             onWishlistToggle(product._id);
//                         }}
//                         className="text-gray-400 hover:text-red-500 transition-colors"
//                     >
//                         {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//                     </button>
//                 </div>

//                 <p className="text-gray-500 text-sm mb-3 line-clamp-2">
//                     {product.description}
//                 </p>

//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-1">
//                         <FaRupeeSign className="text-gray-600 text-sm" />
//                         <span className="font-bold text-gray-900 text-xl">
//                             {product.price.toLocaleString()}
//                         </span>
//                     </div>
//                     <div className="text-xs text-gray-500">
//                         {product.category}
//                     </div>
//                 </div>

//                 {product.stock > 0 && product.stock < 10 && (
//                     <p className="text-xs text-orange-600 mt-2">
//                         Only {product.stock} left in stock
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product, onWishlistToggle, isWishlisted }) => {
    const navigate = useNavigate();

    return (
        <div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.stock === 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        Out of Stock
                    </div>
                )}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onWishlistToggle(product._id);
                    }}
                    className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                    {isWishlisted ? 
                        <FaHeart className="text-red-500" /> : 
                        <FaRegHeart className="text-gray-600" />
                    }
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                        <FaRupeeSign className="text-gray-600 text-sm" />
                        <span className="font-bold text-gray-900 text-xl">
                            {product.price.toLocaleString()}
                        </span>
                    </div>
                    <div className="text-xs text-gray-500">
                        {product.category}
                    </div>
                </div>
                {product.stock > 0 && product.stock < 10 && (
                    <p className="text-xs text-orange-600 mt-2">
                        Only {product.stock} left
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;