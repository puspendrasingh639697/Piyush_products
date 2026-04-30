// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { FaRupeeSign, FaTrash, FaPlus, FaMinus, FaShoppingCart, FaTicketAlt, FaTags, FaCheckCircle, FaTimesCircle, FaCopy } from 'react-icons/fa';
// import { fetchCart, updateCartQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';
// import { applyCoupon, clearAppliedCoupon, fetchActiveCoupons, selectAppliedCoupon, selectActiveCoupons, selectCouponLoading } from '../redux/slices/couponSlice';
// import { toast } from 'react-toastify';

// const CartPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { items, totalAmount, totalItems, loading, error } = useSelector((state) => state.cart);
//     const appliedCoupon = useSelector(selectAppliedCoupon);
//     const activeCoupons = useSelector(selectActiveCoupons);
//     const couponLoading = useSelector(selectCouponLoading);
//     const [userId, setUserId] = useState(null);
    
//     // Coupon State
//     const [couponCode, setCouponCode] = useState("");
//     const [couponError, setCouponError] = useState("");
//     const [discount, setDiscount] = useState(0);
    
//     // Calculate final amount after discount
//     const finalAmount = totalAmount - discount;

//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const token = localStorage.getItem('token');
        
//         if (user && token) {
//             setUserId(user._id);
//             dispatch(fetchCart(user._id));
//             dispatch(fetchActiveCoupons());
//         }
        
//         // Check if coupon was applied from localStorage
//         const savedCoupon = localStorage.getItem('appliedCoupon');
//         if (savedCoupon) {
//             const coupon = JSON.parse(savedCoupon);
//             setDiscount(coupon.discountAmount || 0);
//         }
//     }, [dispatch]);

//     // Update discount when totalAmount or appliedCoupon changes
//     useEffect(() => {
//         if (appliedCoupon) {
//             let discountAmount = 0;
//             if (appliedCoupon.voucherType === 'discount') {
//                 discountAmount = (totalAmount * appliedCoupon.discountPercent) / 100;
//             } else {
//                 discountAmount = appliedCoupon.fixedAmount;
//             }
//             setDiscount(Math.min(discountAmount, totalAmount));
//         } else {
//             setDiscount(0);
//         }
//     }, [appliedCoupon, totalAmount]);

//     const handleUpdateQuantity = (productId, newQuantity) => {
//         if (newQuantity < 1) return;
//         dispatch(updateCartQuantity({ userId, productId, quantity: newQuantity }));
//         setTimeout(() => dispatch(fetchCart(userId)), 100);
//     };

//     const handleRemoveItem = (productId) => {
//         if (window.confirm('Remove this item from cart?')) {
//             dispatch(removeFromCart({ userId, productId }));
//             setTimeout(() => dispatch(fetchCart(userId)), 100);
//         }
//     };

//     const handleClearCart = () => {
//         if (window.confirm('Clear entire cart?')) {
//             dispatch(clearCart(userId));
//             setTimeout(() => dispatch(fetchCart(userId)), 100);
//         }
//     };

//     const handleCheckout = () => {
//         // Save applied coupon to localStorage for checkout
//         if (appliedCoupon) {
//             localStorage.setItem('appliedCoupon', JSON.stringify({
//                 code: appliedCoupon.code,
//                 discountAmount: discount,
//                 couponId: appliedCoupon._id
//             }));
//         }
//         navigate('/checkout');
//     };

//     // ✅ Handle Apply Coupon
//     const handleApplyCoupon = async () => {
//         if (!couponCode.trim()) {
//             setCouponError("Please enter coupon code");
//             return;
//         }

//         const result = await dispatch(applyCoupon({ 
//             code: couponCode, 
//             orderAmount: totalAmount 
//         }));

//         if (result.payload?.success) {
//             toast.success(`Coupon applied! ₹${result.payload.discountAmount} off`);
//             setCouponError("");
//             setCouponCode("");
//             localStorage.setItem('appliedCouponCode', couponCode);
//         } else {
//             setCouponError(result.payload || "Invalid coupon code");
//             toast.error(result.payload || "Invalid coupon code");
//         }
//     };

//     // ✅ Handle Remove Coupon
//     const handleRemoveCoupon = () => {
//         dispatch(clearAppliedCoupon());
//         setDiscount(0);
//         localStorage.removeItem('appliedCouponCode');
//         localStorage.removeItem('appliedCoupon');
//         toast.info("Coupon removed");
//     };

//     // ✅ Copy coupon code to clipboard
//     const copyToClipboard = (code) => {
//         navigator.clipboard.writeText(code);
//         toast.success(`Coupon ${code} copied!`);
//     };

//     if (loading && !items.length) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center text-red-600">
//                     <p>Error: {error}</p>
//                     <button onClick={() => dispatch(fetchCart(userId))} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     if (items.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="max-w-4xl mx-auto px-4">
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
//                         <div className="text-gray-400 text-6xl mb-4">🛒</div>
//                         <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
//                         <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
//                         <button
//                             onClick={() => navigate('/products')}
//                             className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                         >
//                             Continue Shopping
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="max-w-6xl mx-auto px-4">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

//                 <div className="grid lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                             <div className="p-4 border-b border-gray-200 bg-gray-50">
//                                 <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
//                                     <div className="col-span-6">Product</div>
//                                     <div className="col-span-2 text-center">Price</div>
//                                     <div className="col-span-2 text-center">Quantity</div>
//                                     <div className="col-span-2 text-center">Total</div>
//                                 </div>
//                             </div>

//                             {items.map((item) => (
//                                 <div key={item._id} className="p-4 border-b border-gray-200 hover:bg-gray-50 transition">
//                                     <div className="grid grid-cols-12 gap-4 items-center">
//                                         <div className="col-span-6 flex items-center gap-4">
//                                             <img 
//                                                 src={item.productId?.image} 
//                                                 alt={item.productId?.name}
//                                                 className="w-16 h-16 object-cover rounded-lg"
//                                             />
//                                             <div>
//                                                 <h3 className="font-semibold text-gray-900">{item.productId?.name}</h3>
//                                                 <p className="text-sm text-gray-500">{item.productId?.category}</p>
//                                             </div>
//                                         </div>

//                                         <div className="col-span-2 text-center font-medium text-gray-900">
//                                             ₹{item.productId?.price}
//                                         </div>

//                                         <div className="col-span-2 flex items-center justify-center gap-2">
//                                             <button
//                                                 onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
//                                                 className="p-1 rounded-full hover:bg-gray-100"
//                                             >
//                                                 <FaMinus size={12} className="text-gray-500" />
//                                             </button>
//                                             <span className="w-8 text-center font-medium">{item.quantity}</span>
//                                             <button
//                                                 onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
//                                                 className="p-1 rounded-full hover:bg-gray-100"
//                                             >
//                                                 <FaPlus size={12} className="text-gray-500" />
//                                             </button>
//                                         </div>

//                                         <div className="col-span-2 text-center font-bold text-gray-900">
//                                             ₹{item.productId?.price * item.quantity}
//                                         </div>
//                                     </div>

//                                     <div className="sm:hidden flex justify-end mt-3">
//                                         <button
//                                             onClick={() => handleRemoveItem(item.productId._id)}
//                                             className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
//                                         >
//                                             <FaTrash size={12} /> Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}

//                             <div className="p-4 bg-gray-50 flex justify-between items-center">
//                                 <button
//                                     onClick={handleClearCart}
//                                     className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
//                                 >
//                                     <FaTrash /> Clear Cart
//                                 </button>
//                                 <p className="text-sm text-gray-500">{items.length} items</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Order Summary with Coupon */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
//                             <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            
//                             {/* ✅ COUPON SECTION */}
//                             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <FaTicketAlt className="text-red-600" />
//                                     <span className="font-medium text-gray-700">Apply Coupon</span>
//                                 </div>
                                
//                                 {appliedCoupon ? (
//                                     // ✅ Applied Coupon Display
//                                     <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                                         <div className="flex justify-between items-center">
//                                             <div className="flex items-center gap-2">
//                                                 <FaCheckCircle className="text-green-600" />
//                                                 <div>
//                                                     <p className="font-bold text-green-800">{appliedCoupon.code}</p>
//                                                     <p className="text-xs text-green-600">
//                                                         {appliedCoupon.voucherType === 'discount' 
//                                                             ? `${appliedCoupon.discountPercent}% OFF` 
//                                                             : `₹${appliedCoupon.fixedAmount} OFF`} applied
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <button
//                                                 onClick={handleRemoveCoupon}
//                                                 className="text-red-500 hover:text-red-700 text-xs"
//                                             >
//                                                 Remove
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     // ✅ Coupon Input
//                                     <div>
//                                         <div className="flex gap-2">
//                                             <div className="flex-1 relative">
//                                                 <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                                                 <input
//                                                     type="text"
//                                                     value={couponCode}
//                                                     onChange={(e) => {
//                                                         setCouponCode(e.target.value.toUpperCase());
//                                                         setCouponError("");
//                                                     }}
//                                                     placeholder="Enter coupon code"
//                                                     className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-sm"
//                                                 />
//                                             </div>
//                                             <button
//                                                 onClick={handleApplyCoupon}
//                                                 disabled={couponLoading || !couponCode}
//                                                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 text-sm"
//                                             >
//                                                 {couponLoading ? "..." : "Apply"}
//                                             </button>
//                                         </div>
//                                         {couponError && (
//                                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                                                 <FaTimesCircle size={10} /> {couponError}
//                                             </p>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* ✅ Available Coupons Banner */}
//                             {activeCoupons && activeCoupons.length > 0 && !appliedCoupon && (
//                                 <div className="mb-4 p-2 bg-gray-50 rounded-lg">
//                                     <p className="text-xs text-gray-500 mb-2">✨ Available Offers:</p>
//                                     <div className="flex flex-wrap gap-2">
//                                         {activeCoupons.slice(0, 2).map((coupon) => (
//                                             <div key={coupon._id} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1">
//                                                 <span className="text-xs font-mono font-bold text-gray-800">{coupon.code}</span>
//                                                 <span className="text-[10px] text-red-600">
//                                                     {coupon.voucherType === 'discount' ? `${coupon.discountPercent}%` : `₹${coupon.fixedAmount}`}
//                                                 </span>
//                                                 <button
//                                                     onClick={() => {
//                                                         setCouponCode(coupon.code);
//                                                         handleApplyCoupon();
//                                                     }}
//                                                     className="text-[10px] text-blue-500 hover:text-blue-700"
//                                                 >
//                                                     Apply
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Price Details */}
//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Subtotal ({totalItems} items)</span>
//                                     <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
//                                 </div>
                                
//                                 {discount > 0 && (
//                                     <div className="flex justify-between text-green-600">
//                                         <span>Discount {appliedCoupon?.code && `(${appliedCoupon.code})`}</span>
//                                         <span className="font-medium">-₹{discount.toLocaleString()}</span>
//                                     </div>
//                                 )}
                                
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Shipping</span>
//                                     <span className="font-medium">Free</span>
//                                 </div>
                                
//                                 <div className="border-t border-gray-200 pt-3 mt-3">
//                                     <div className="flex justify-between text-lg font-bold text-gray-900">
//                                         <span>Total</span>
//                                         <span className="text-red-600">₹{finalAmount.toLocaleString()}</span>
//                                     </div>
//                                     {discount > 0 && (
//                                         <p className="text-xs text-green-600 mt-1 text-right">
//                                             You saved ₹{discount.toLocaleString()}!
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
//                             >
//                                 <FaShoppingCart /> Proceed to Checkout
//                             </button>

//                             <button
//                                 onClick={() => navigate('/products')}
//                                 className="w-full mt-3 py-2 text-gray-600 hover:text-gray-900 text-sm"
//                             >
//                                 Continue Shopping
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaTrash, FaPlus, FaMinus, FaShoppingCart, FaTicketAlt, FaTags, FaCheckCircle, FaTimesCircle, FaCopy } from 'react-icons/fa';
import { fetchCart, updateCartQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { applyCoupon, clearAppliedCoupon, fetchActiveCoupons, selectAppliedCoupon, selectActiveCoupons, selectCouponLoading } from '../redux/slices/couponSlice';
import { toast } from 'react-toastify';

const PRIMARY_COLOR = '#8B1E2D';
const PRIMARY_DARK = '#6B1622';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalAmount, totalItems, loading, error } = useSelector((state) => state.cart);
    const appliedCoupon = useSelector(selectAppliedCoupon);
    const activeCoupons = useSelector(selectActiveCoupons);
    const couponLoading = useSelector(selectCouponLoading);
    const [userId, setUserId] = useState(null);
    
    // Coupon State
    const [couponCode, setCouponCode] = useState("");
    const [couponError, setCouponError] = useState("");
    const [discount, setDiscount] = useState(0);
    
    // Calculate final amount after discount
    const finalAmount = totalAmount - discount;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (user && token) {
            setUserId(user._id);
            dispatch(fetchCart(user._id));
            dispatch(fetchActiveCoupons());
        }
        
        // Check if coupon was applied from localStorage
        const savedCoupon = localStorage.getItem('appliedCoupon');
        if (savedCoupon) {
            const coupon = JSON.parse(savedCoupon);
            setDiscount(coupon.discountAmount || 0);
        }
    }, [dispatch]);

    // Update discount when totalAmount or appliedCoupon changes
    useEffect(() => {
        if (appliedCoupon) {
            let discountAmount = 0;
            if (appliedCoupon.voucherType === 'discount') {
                discountAmount = (totalAmount * appliedCoupon.discountPercent) / 100;
            } else {
                discountAmount = appliedCoupon.fixedAmount;
            }
            setDiscount(Math.min(discountAmount, totalAmount));
        } else {
            setDiscount(0);
        }
    }, [appliedCoupon, totalAmount]);

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateCartQuantity({ userId, productId, quantity: newQuantity }));
        setTimeout(() => dispatch(fetchCart(userId)), 100);
    };

    const handleRemoveItem = (productId) => {
        if (window.confirm('Remove this item from cart?')) {
            dispatch(removeFromCart({ userId, productId }));
            setTimeout(() => dispatch(fetchCart(userId)), 100);
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Clear entire cart?')) {
            dispatch(clearCart(userId));
            setTimeout(() => dispatch(fetchCart(userId)), 100);
        }
    };

    const handleCheckout = () => {
        // Save applied coupon to localStorage for checkout
        if (appliedCoupon) {
            localStorage.setItem('appliedCoupon', JSON.stringify({
                code: appliedCoupon.code,
                discountAmount: discount,
                couponId: appliedCoupon._id
            }));
        }
        navigate('/checkout');
    };

    // ✅ Handle Apply Coupon
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter coupon code");
            toast.error('Please enter coupon code');
            return;
        }
        
        setCouponError("");
        
        try {
            const result = await dispatch(applyCoupon({ 
                code: couponCode, 
                orderAmount: totalAmount 
            })).unwrap();
            
            setDiscount(result.discountAmount);
            setCouponCode('');
            toast.success(`Coupon applied! You saved ₹${result.discountAmount}`);
            
            localStorage.setItem('appliedCoupon', JSON.stringify({
                code: couponCode,
                discountAmount: result.discountAmount
            }));
            
        } catch (err) {
            setCouponError(err);
            toast.error(err);
        }
    };

    // ✅ Handle Remove Coupon
    const handleRemoveCoupon = () => {
        dispatch(clearAppliedCoupon());
        setDiscount(0);
        localStorage.removeItem('appliedCouponCode');
        localStorage.removeItem('appliedCoupon');
        toast.info("Coupon removed");
    };

    // ✅ Copy coupon code to clipboard
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        toast.success(`Coupon ${code} copied!`);
    };

    if (loading && !items.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4" style={{ borderTopColor: PRIMARY_COLOR }}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-600">
                    <p>Error: {error}</p>
                    <button onClick={() => dispatch(fetchCart(userId))} className="mt-4 px-4 py-2 text-white rounded" style={{ backgroundColor: PRIMARY_COLOR }}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="text-gray-400 text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-6 py-3 text-white rounded-lg transition"
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                            onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8" style={{ color: PRIMARY_COLOR }}>Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-200 bg-gray-50">
                                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-2 text-center">Price</div>
                                    <div className="col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 text-center">Total</div>
                                </div>
                            </div>

                            {items.map((item) => (
                                <div key={item._id} className="p-4 border-b border-gray-200 hover:bg-gray-50 transition">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-6 flex items-center gap-4">
                                            <img 
                                                src={item.productId?.image} 
                                                alt={item.productId?.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.productId?.name}</h3>
                                                <p className="text-sm text-gray-500">{item.productId?.category}</p>
                                            </div>
                                        </div>

                                        <div className="col-span-2 text-center font-medium text-gray-900">
                                            ₹{item.productId?.price}
                                        </div>

                                        <div className="col-span-2 flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                                                className="p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <FaMinus size={12} className="text-gray-500" />
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                                                className="p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <FaPlus size={12} className="text-gray-500" />
                                            </button>
                                        </div>

                                        <div className="col-span-2 text-center font-bold text-gray-900">
                                            ₹{item.productId?.price * item.quantity}
                                        </div>
                                    </div>

                                    <div className="sm:hidden flex justify-end mt-3">
                                        <button
                                            onClick={() => handleRemoveItem(item.productId._id)}
                                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                        >
                                            <FaTrash size={12} /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 bg-gray-50 flex justify-between items-center">
                                <button
                                    onClick={handleClearCart}
                                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                >
                                    <FaTrash /> Clear Cart
                                </button>
                                <p className="text-sm text-gray-500">{items.length} items</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary with Coupon */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>Order Summary</h2>
                            
                            {/* ✅ COUPON SECTION - FIXED */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaTicketAlt style={{ color: PRIMARY_COLOR }} />
                                    <span className="font-medium text-gray-700">Apply Coupon</span>
                                </div>
                                
                                {appliedCoupon ? (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <FaCheckCircle className="text-green-600" />
                                                <div>
                                                    <p className="font-bold text-green-800">{appliedCoupon.code}</p>
                                                    <p className="text-xs text-green-600">
                                                        {appliedCoupon.voucherType === 'discount' 
                                                            ? `${appliedCoupon.discountPercent}% OFF` 
                                                            : `₹${appliedCoupon.fixedAmount} OFF`} applied
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleRemoveCoupon}
                                                className="text-sm hover:underline"
                                                style={{ color: PRIMARY_COLOR }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex gap-2">
                                            <div className="flex-1 relative">
                                                <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={couponCode}
                                                    onChange={(e) => {
  console.log("Input value:", e.target.value);  // ✅ Add this
  const value = e.target.value || '';
  setCouponCode(value.toUpperCase());
  setCouponError("");
}}

                                                    placeholder="Enter coupon code"
                                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                                                    style={{ focusRingColor: PRIMARY_COLOR }}
                                                />
                                            </div>
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={couponLoading || !couponCode}
                                                className="px-4 py-2 rounded-lg text-white text-sm transition disabled:opacity-50"
                                                style={{ backgroundColor: PRIMARY_COLOR }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
                                            >
                                                {couponLoading ? "..." : "Apply"}
                                            </button>
                                        </div>
                                        {couponError && (
                                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                <FaTimesCircle size={10} /> {couponError}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Available Offers */}
                            {activeCoupons && activeCoupons.length > 0 && !appliedCoupon && (
                                <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-2">✨ Available Offers:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {activeCoupons.slice(0, 2).map((coupon) => (
                                            <div key={coupon._id} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1">
                                                <span className="text-xs font-mono font-bold text-gray-800">{coupon.code}</span>
                                                <span className="text-[10px]" style={{ color: PRIMARY_COLOR }}>
                                                    {coupon.voucherType === 'discount' ? `${coupon.discountPercent}%` : `₹${coupon.fixedAmount}`}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        setCouponCode(coupon.code);
                                                        handleApplyCoupon();
                                                    }}
                                                    className="text-[10px] text-blue-500 hover:text-blue-700"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Details */}
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                                </div>
                                
                                {discount > 0 && (
                                    <div className="flex justify-between" style={{ color: PRIMARY_COLOR }}>
                                        <span>Discount {appliedCoupon?.code && `(${appliedCoupon.code})`}</span>
                                        <span className="font-medium">-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span style={{ color: PRIMARY_COLOR }}>₹{finalAmount.toLocaleString()}</span>
                                    </div>
                                    {discount > 0 && (
                                        <p className="text-xs mt-1 text-right" style={{ color: PRIMARY_COLOR }}>
                                            You saved ₹{discount.toLocaleString()}!
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full py-3 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                style={{ backgroundColor: PRIMARY_COLOR }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                                onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
                            >
                                <FaShoppingCart /> Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/products')}
                                className="w-full mt-3 py-2 text-gray-600 hover:text-gray-900 text-sm"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;