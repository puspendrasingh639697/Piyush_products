import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { fetchCart,updateCartQuantity, removeFromCart, clearCart  } from '../redux/slices/cartSlice';
// import { fetchCart, } from '../store/slices/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalAmount, totalItems, loading, error } = useSelector((state) => state.cart);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (user && token) {
            setUserId(user._id);
            dispatch(fetchCart(user._id));
        }
    }, [dispatch]);

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
        navigate('/checkout');
    };

    if (loading && !items.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-600">
                    <p>Error: {error}</p>
                    <button onClick={() => dispatch(fetchCart(userId))} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded">
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
                            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
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
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

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
                                        {/* Product Info */}
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

                                        {/* Price */}
                                        <div className="col-span-2 text-center font-medium text-gray-900">
                                            ₹{item.productId?.price}
                                        </div>

                                        {/* Quantity */}
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

                                        {/* Total */}
                                        <div className="col-span-2 text-center font-bold text-gray-900">
                                            ₹{item.productId?.price * item.quantity}
                                        </div>

                                        {/* Remove Button - Small screens ke liye */}
                                        <div className="hidden sm:flex col-span-12 justify-end mt-2">
                                            <button
                                                onClick={() => handleRemoveItem(item.productId._id)}
                                                className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                            >
                                                <FaTrash size={12} /> Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove Button - Mobile */}
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

                            <div className="p-4 bg-gray-50">
                                <button
                                    onClick={handleClearCart}
                                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                >
                                    <FaTrash /> Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Total Items</span>
                                    <span className="font-medium">{totalItems}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
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