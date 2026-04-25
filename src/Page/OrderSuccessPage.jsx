import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearOrderPlaced } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { FaCheckCircle, FaTruck, FaShoppingBag, FaPrint, FaShareAlt } from 'react-icons/fa';

const OrderSuccessPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { placedOrder, orderPlaced } = useSelector((state) => state.orders);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if (!orderPlaced && !placedOrder) {
            // Agar order placed nahi hai toh products page pe bhejo
            navigate('/products');
        }
        
        // Cart clear karo
        if (placedOrder) {
            dispatch(clearCart());
            localStorage.removeItem('checkoutCart');
        }
        
        return () => {
            dispatch(clearOrderPlaced());
        };
    }, [dispatch, navigate, orderPlaced, placedOrder]);

    if (!placedOrder) {
        return null;
    }

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Order Confirmation',
                text: `Order #${placedOrder._id} placed successfully!`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-0">
            <div className="max-w-3xl mx-auto px-4">
                {/* Success Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <FaCheckCircle className="text-green-600 text-5xl" />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully! 🎉</h1>
                    <p className="text-gray-600 mb-6">Thank you for your purchase, {userInfo?.name || 'Customer'}!</p>
                    
                    {/* Order ID Card */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p className="font-mono font-bold text-gray-900">{placedOrder._id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Order Date</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(placedOrder.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Payment Method</p>
                                <p className="font-medium text-gray-900">{placedOrder.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Payment Status</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${placedOrder.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {placedOrder.isPaid ? 'Paid' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div className="border-t border-b border-gray-200 py-4 mb-6">
                        <h3 className="font-semibold text-left mb-3">Order Summary</h3>
                        <div className="space-y-2">
                            {placedOrder.orderItems?.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.qty}</span>
                                    <span className="font-medium">₹{item.price * item.qty}</span>
                                </div>
                            ))}
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-bold">
                                    <span>Total Amount</span>
                                    <span className="text-red-600 text-xl">₹{placedOrder.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Shipping Address */}
                    {placedOrder.shippingAddress && (
                        <div className="text-left mb-6">
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <p className="text-gray-600 text-sm">
                                {placedOrder.shippingAddress.street}<br />
                                {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state}<br />
                                PIN: {placedOrder.shippingAddress.zipCode}
                            </p>
                        </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate(`/order/${placedOrder._id}`)}
                            className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                        >
                            <FaTruck /> Track Order
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                        >
                            <FaShoppingBag /> Continue Shopping
                        </button>
                        <button
                            onClick={handlePrint}
                            className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                        >
                            <FaPrint /> Print
                        </button>
                        <button
                            onClick={handleShare}
                            className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                        >
                            <FaShareAlt /> Share
                        </button>
                    </div>
                </div>
                
                {/* What's Next */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
                    <h3 className="font-bold text-lg mb-4">What's Next?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-yellow-600 text-xl">📦</span>
                            </div>
                            <p className="font-medium">Order Confirmed</p>
                            <p className="text-xs text-gray-500">Your order has been confirmed</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-blue-600 text-xl">🚚</span>
                            </div>
                            <p className="font-medium">Order Shipped</p>
                            <p className="text-xs text-gray-500">You'll receive tracking details</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-green-600 text-xl">✅</span>
                            </div>
                            <p className="font-medium">Order Delivered</p>
                            <p className="text-xs text-gray-500">Estimated delivery within 3-5 days</p>
                        </div>
                    </div>
                </div>
                
                {/* Help Section */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Need help? Contact our support at <a href="mailto:support@example.com" className="text-red-600">support@example.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;