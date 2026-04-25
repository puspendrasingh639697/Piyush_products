import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderDetails, cancelOrder, clearOrderState } from '../redux/slices/orderSlice';
import { toast } from 'react-toastify';
import { 
  FaBox, FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt, 
  FaCreditCard, FaTruck, FaCheckCircle, FaTimesCircle,
  FaSpinner, FaHourglassHalf
} from 'react-icons/fa';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder, isLoading, error, success } = useSelector((state) => state.orders);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    }
    return () => {
      dispatch(clearOrderState());
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    if (success) {
      toast.success('Order cancelled successfully');
      dispatch(fetchOrderDetails(orderId));
    }
  }, [success, dispatch, orderId]);

  // Add polling for order status updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (orderId) {
        dispatch(fetchOrderDetails(orderId));
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [dispatch, orderId]);

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setIsCancelling(true);
      await dispatch(cancelOrder(orderId));
      setIsCancelling(false);
    }
  };

  // Get status badge
  const getStatusBadge = (status, isCancelled) => {
    if (isCancelled) {
      return { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Cancelled' };
    }
    switch(status) {
      case 'Delivered':
        return { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Delivered' };
      case 'Shipped':
        return { color: 'bg-blue-100 text-blue-800', icon: FaTruck, text: 'Shipped' };
      case 'Processing':
        return { color: 'bg-yellow-100 text-yellow-800', icon: FaSpinner, text: 'Processing' };
      case 'Pending':
        return { color: 'bg-orange-100 text-orange-800', icon: FaHourglassHalf, text: 'Pending' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: FaBox, text: status || 'Placed' };
    }
  };

  if (isLoading && !currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-5xl mb-4">!</div>
          <p className="text-gray-600">{error}</p>
          <button onClick={() => navigate('/profile')} className="mt-4 text-red-600 hover:underline">
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  if (!currentOrder) return null;

  const statusInfo = getStatusBadge(currentOrder.status, currentOrder.isCancelled);
  const StatusIcon = statusInfo.icon;
  const canCancel = !currentOrder.isCancelled && 
                    currentOrder.status !== 'Delivered' && 
                    currentOrder.status !== 'Shipped';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/profile')}
            className="text-red-600 hover:text-red-700 mb-4 inline-flex items-center gap-1"
          >
            ← Back to Profile
          </button>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-gray-500 text-sm">Order ID: {currentOrder._id}</p>
        </div>

        {/* ✅ Order Status Update Messages */}
        {currentOrder.status === 'Shipped' && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">
            <p className="text-blue-600 text-sm flex items-center gap-2">
              <FaTruck /> Your order is on the way!
            </p>
          </div>
        )}
        
        {currentOrder.status === 'Delivered' && (
          <div className="bg-green-50 p-3 rounded-lg mb-4 border border-green-200">
            <p className="text-green-600 text-sm flex items-center gap-2">
              <FaCheckCircle /> Order delivered successfully!
            </p>
          </div>
        )}

        {/* Order Status Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${statusInfo.color}`}>
                <StatusIcon className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Status</p>
                <p className={`font-semibold ${statusInfo.color.replace('bg-', 'text-')}`}>
                  {statusInfo.text}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Placed on</p>
              <p className="font-medium">
                {new Date(currentOrder.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Cancel Button */}
          {canCancel && (
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Order Items</h2>
          </div>
          <div className="divide-y">
            {currentOrder.orderItems?.map((item, index) => (
              <div key={index} className="p-6 flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.qty}</p>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-600" /> Shipping Address
            </h2>
            <div className="space-y-1">
              <p className="font-medium">{currentOrder.shippingAddress?.street}</p>
              <p>{currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.state}</p>
              <p>PIN Code: {currentOrder.shippingAddress?.zipCode}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaCreditCard className="text-red-600" /> Payment Information
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{currentOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className={`font-medium ${currentOrder.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {currentOrder.isPaid ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white rounded-lg shadow mt-6 p-6">
          <h2 className="text-xl font-bold mb-4">Price Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{currentOrder.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-red-600">₹{currentOrder.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-lg shadow mt-6 p-6">
          <h2 className="text-xl font-bold mb-4">Order Timeline</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Order Placed</p>
                <p className="text-sm text-gray-500">
                  {new Date(currentOrder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            {currentOrder.status === 'Processing' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FaSpinner className="text-yellow-600" />
                </div>
              </div>
            )}
            
            {currentOrder.status === 'Shipped' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaTruck className="text-blue-600" />
                </div>
              </div>
            )}
            
            {currentOrder.status === 'Delivered' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircle className="text-green-600" />
                </div>
              </div>
            )}
            
            {currentOrder.isCancelled && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <FaTimesCircle className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Cancelled</p>
                  <p className="text-sm text-gray-500">
                    Cancelled on {new Date(currentOrder.cancelledAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;