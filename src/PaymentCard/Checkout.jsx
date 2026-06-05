

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { placeOrder } from '../redux/slices/orderSlice';
import { fetchAddresses } from '../redux/slices/userSlice';
import { applyCoupon, clearAppliedCoupon } from '../redux/slices/paymentSlice';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { 
  FaMapMarkerAlt, FaCreditCard, FaTag, FaMoneyBillWave,
  FaPlus, FaTicketAlt, FaCheckCircle, FaTimesCircle, FaTrash, FaEdit,
  FaShoppingBag, FaTruck, FaShieldAlt
} from 'react-icons/fa';

const PRIMARY_COLOR = '#8B1E2D';
const PRIMARY_DARK = '#6B1622';
const PRIMARY_LIGHT = '#FEE2E2';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux State
  const { items: reduxItems, totalAmount: reduxTotal, totalItems: reduxTotalItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { addresses } = useSelector((state) => state.user);
  const couponLoading = useSelector((state) => state.payment?.couponLoading || false);
  
  // Local state
  const [localCartItems, setLocalCartItems] = useState([]);
  const [localTotalAmount, setLocalTotalAmount] = useState(0);
  const [localTotalItems, setLocalTotalItems] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const items = reduxItems?.length > 0 ? reduxItems : localCartItems;
  const totalAmount = reduxTotal > 0 ? reduxTotal : localTotalAmount;
  const totalItems = reduxTotalItems > 0 ? reduxTotalItems : localTotalItems;
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [addressError, setAddressError] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [editingAddress, setEditingAddress] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    const savedCoupon = localStorage.getItem('appliedCoupon');
    const savedCouponCode = localStorage.getItem('appliedCouponCode');
    
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setLocalCartItems(parsedCart);
      const amount = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const count = parsedCart.reduce((sum, item) => sum + item.quantity, 0);
      setLocalTotalAmount(amount);
      setLocalTotalItems(count);
      setFinalAmount(amount);
    }
    
    if (savedCoupon) {
      const coupon = JSON.parse(savedCoupon);
      setDiscount(coupon.discountAmount || 0);
      setFinalAmount((savedCart ? JSON.parse(savedCart).reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0) - (coupon.discountAmount || 0));
      setAppliedCouponCode(savedCouponCode || '');
    }
    
    setIsDataLoaded(true);
  }, []);

  // Update final amount
  useEffect(() => {
    setFinalAmount(Math.max(0, totalAmount - discount));
  }, [totalAmount, discount]);

  // Fetch addresses when logged in
  useEffect(() => {
    if (!userInfo) {
      toast.error('Please login to checkout');
      navigate('/');
      return;
    }
    
    if (isDataLoaded && items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }
    
    if (isDataLoaded && items.length > 0) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, userInfo, navigate, isDataLoaded, items.length]);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [addresses, selectedAddress]);

  const validateAddress = (address) => {
    if (!address) {
      setAddressError("Please select a shipping address");
      return false;
    }
    if (!address.street?.trim()) {
      setAddressError("Street address is required");
      return false;
    }
    if (!address.city?.trim()) {
      setAddressError("City is required");
      return false;
    }
    if (!address.state?.trim()) {
      setAddressError("State is required");
      return false;
    }
    if (!address.zipCode?.trim()) {
      setAddressError("Zip code is required");
      return false;
    }
    if (address.zipCode.length < 5) {
      setAddressError("Zip code must be at least 5 characters");
      return false;
    }
    setAddressError('');
    return true;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter coupon code");
      toast.error('Please enter coupon code');
      return;
    }
    
    setCouponError("");
    
    try {
      const result = await dispatch(applyCoupon({ 
        couponCode: couponCode.toUpperCase(), 
        totalAmount: totalAmount 
      })).unwrap();
      
      if (result && result.success) {
        setDiscount(result.discountAmount);
        setFinalAmount(result.finalAmount);
        setAppliedCouponCode(couponCode.toUpperCase());
        setCouponCode('');
        toast.success(`Coupon applied! You saved ₹${result.discountAmount}`);
        
        localStorage.setItem('appliedCoupon', JSON.stringify({
          code: couponCode.toUpperCase(),
          discountAmount: result.discountAmount
        }));
        localStorage.setItem('appliedCouponCode', couponCode.toUpperCase());
      } else {
        setCouponError(result?.message || "Invalid coupon code");
        toast.error(result?.message || "Invalid coupon code");
      }
    } catch (err) {
      console.error("Coupon error:", err);
      setCouponError(err?.message || "Failed to apply coupon");
      toast.error(err?.message || "Failed to apply coupon");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(clearAppliedCoupon());
    setDiscount(0);
    setFinalAmount(totalAmount);
    setAppliedCouponCode('');
    localStorage.removeItem('appliedCoupon');
    localStorage.removeItem('appliedCouponCode');
    toast.info("Coupon removed");
  };

  const validateNewAddress = () => {
    if (!newAddress.street.trim()) {
      toast.error("Street address is required");
      return false;
    }
    if (!newAddress.city.trim()) {
      toast.error("City is required");
      return false;
    }
    if (!newAddress.state.trim()) {
      toast.error("State is required");
      return false;
    }
    if (!newAddress.zipCode.trim()) {
      toast.error("Zip code is required");
      return false;
    }
    if (newAddress.zipCode.length < 5) {
      toast.error("Zip code must be at least 5 digits");
      return false;
    }
    return true;
  };

  const handleAddAddress = async () => {
    if (!validateNewAddress()) return;
    
    try {
      await API.post('/user/address', newAddress);
      toast.success('Address added successfully');
      setShowAddressForm(false);
      setNewAddress({ street: '', city: '', state: '', zipCode: '' });
      dispatch(fetchAddresses());
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode
    });
    setShowAddressForm(true);
  };

  const handleUpdateAddress = async () => {
    if (!validateNewAddress()) return;
    
    try {
      await API.put(`/user/address/${editingAddress._id}`, newAddress);
      toast.success('Address updated successfully');
      setShowAddressForm(false);
      setEditingAddress(null);
      setNewAddress({ street: '', city: '', state: '', zipCode: '' });
      dispatch(fetchAddresses());
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await API.delete(`/user/address/${addressId}`);
      toast.success('Address deleted successfully');
      setShowDeleteConfirm(null);
      if (selectedAddress?._id === addressId) {
        setSelectedAddress(null);
      }
      dispatch(fetchAddresses());
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete address');
    }
  };

  const processCODOrder = async () => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          productId: item.id || item.productId?._id
        })),
        shippingAddress: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode
        },
        paymentMethod: 'COD',
        totalPrice: finalAmount,
        discountAmount: discount,
        couponCode: appliedCouponCode
      };
      
      const result = await dispatch(placeOrder(orderData));
      
      if (result.payload?.order) {
        localStorage.removeItem('shoppingCart');
        localStorage.removeItem('appliedCoupon');
        localStorage.removeItem('appliedCouponCode');
        toast.success('🎉 Order placed successfully!');
        navigate('/order-success');
      } else {
        toast.error(result.payload?.message || 'Failed to place order');
      }
    } catch (err) {
      console.error("COD Error:", err);
      toast.error(err.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  const processRazorpayPayment = async () => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          productId: item.id || item.productId?._id
        })),
        shippingAddress: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode
        },
        paymentMethod: 'Razorpay',
        totalPrice: finalAmount,
        discountAmount: discount,
        couponCode: appliedCouponCode
      };
      
      const orderResponse = await API.post('/orders/place', orderData);
      const createdOrder = orderResponse.data.order;
      
      if (!createdOrder) {
        throw new Error('Failed to create order');
      }
      
      const paymentResponse = await API.post('/payment/checkout', {
        amount: finalAmount,
        orderId: createdOrder._id
      });
      
      const { order } = paymentResponse.data;
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
      script.onload = () => {
        const options = {
          key: 'rzp_live_KRi62Ox52cJBa5',
          amount: order.amount,
          currency: order.currency,
          name: 'The Loot Bazaar',
          description: `Order Payment`,
          order_id: order.id,
          handler: async (paymentResponse) => {
            try {
              const verifyResponse = await API.post('/payment/verify', {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature
              });
              
              if (verifyResponse.data.success) {
                await API.put(`/orders/${createdOrder._id}/payment`, {
                  isPaid: true,
                  paidAt: new Date(),
                  paymentId: paymentResponse.razorpay_payment_id
                });
                
                localStorage.removeItem('shoppingCart');
                localStorage.removeItem('appliedCoupon');
                localStorage.removeItem('appliedCouponCode');
                toast.success('✅ Payment successful! Order placed! 🎉');
                navigate('/order-success');
              } else {
                toast.error('Payment verification failed');
              }
            } catch (err) {
              toast.error('Payment verification failed');
            }
            setIsProcessing(false);
          },
          prefill: {
            name: userInfo.name,
            email: userInfo.email,
            contact: userInfo.phone || ''
          },
          theme: { color: PRIMARY_COLOR },
          modal: {
            ondismiss: () => {
              toast.info('Payment cancelled');
              setIsProcessing(false);
            }
          }
        };
        
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      
      script.onerror = () => {
        toast.error('Failed to load payment gateway');
        setIsProcessing(false);
      };
      
      document.body.appendChild(script);
      
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try COD.');
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!validateAddress(selectedAddress)) {
      toast.error(addressError || 'Please select a shipping address');
      return;
    }
    
    if (paymentMethod === 'razorpay') {
      processRazorpayPayment();
    } else if (paymentMethod === 'cod') {
      processCODOrder();
    } else {
      toast.error('Please select a payment method');
    }
  };

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin mx-auto mb-4" style={{ borderTopColor: PRIMARY_COLOR }}></div>
          <p className="text-gray-500">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
          <button 
            onClick={() => navigate("/products")}
            className="px-6 py-2 rounded-lg text-white transition"
            style={{ backgroundColor: PRIMARY_COLOR }}
            onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
            onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: PRIMARY_COLOR }}>Checkout</h1>
          <div className="w-20 h-1 bg-[#8B1E2D] mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-500 text-sm mt-2">Complete your purchase securely</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Left Section */}
          <div className="lg:w-2/3 space-y-5 sm:space-y-6">
            
            {/* Shipping Address Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt style={{ color: PRIMARY_COLOR }} />
                <span>Shipping Address</span>
              </h2>
              
              {addresses && addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div key={addr._id} className={`flex items-start justify-between p-3 border rounded-lg transition ${selectedAddress?._id === addr._id ? 'border-[#8B1E2D] bg-red-50' : 'border-gray-200'}`}>
                      <label className="flex items-start gap-3 flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress?._id === addr._id}
                          onChange={() => setSelectedAddress(addr)}
                          className="mt-1"
                          style={{ accentColor: PRIMARY_COLOR }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{addr.street}</p>
                          <p className="text-sm text-gray-500">{addr.city}, {addr.state} - {addr.zipCode}</p>
                          {addr.isDefault && (
                            <span className="text-xs px-2 py-0.5 rounded inline-block mt-1" style={{ backgroundColor: PRIMARY_LIGHT, color: PRIMARY_COLOR }}>Default</span>
                          )}
                        </div>
                      </label>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditAddress(addr)} className="p-1 text-gray-400 hover:text-blue-500 transition">
                          <FaEdit size={14} />
                        </button>
                        <button onClick={() => setShowDeleteConfirm(addr._id)} className="p-1 text-gray-400 hover:text-red-500 transition">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No addresses found. Please add an address.</p>
                </div>
              )}
              
              {addressError && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaTimesCircle size={12} /> {addressError}
                </p>
              )}
              
              <button
                onClick={() => {
                  setEditingAddress(null);
                  setNewAddress({ street: '', city: '', state: '', zipCode: '' });
                  setShowAddressForm(!showAddressForm);
                }}
                className="mt-4 text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: PRIMARY_COLOR }}
              >
                <FaPlus /> {showAddressForm ? 'Cancel' : 'Add New Address'}
              </button>
              
              {showAddressForm && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3 text-gray-800">{editingAddress ? 'Edit Address' : 'New Address'}</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Street Address *"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City *"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                      />
                      <input
                        type="text"
                        placeholder="State *"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Zip Code *"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                    />
                    <button
                      onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                      className="w-full text-white py-2 rounded-lg transition"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                      onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
                    >
                      {editingAddress ? 'Update Address' : 'Save Address'}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <FaCreditCard style={{ color: PRIMARY_COLOR }} />
                <span>Payment Methods</span>
              </h2>
              
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${paymentMethod === 'razorpay' ? 'border-[#8B1E2D] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ accentColor: PRIMARY_COLOR }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FaCreditCard style={{ color: PRIMARY_COLOR }} />
                      <span className="font-medium text-gray-700">Razorpay</span>
                    </div>
                    <p className="text-xs text-gray-400">Card, UPI, Net Banking, Wallet</p>
                  </div>
                </label>
                
                <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${paymentMethod === 'cod' ? 'border-[#8B1E2D] bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ accentColor: PRIMARY_COLOR }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave style={{ color: PRIMARY_COLOR }} />
                      <span className="font-medium text-gray-700">Cash on Delivery</span>
                    </div>
                    <p className="text-xs text-gray-400">Pay when you receive</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Order Summary - Right Side */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 sticky top-20">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: PRIMARY_COLOR }}>
                <FaShoppingBag /> Order Summary
              </h2>
              
              <div className="max-h-48 overflow-y-auto mb-4 space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 py-2 border-b border-gray-100">
                    <img src={item.image} className="w-12 h-12 object-cover rounded-lg" alt={item.name} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-800">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              {/* Coupon Section */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaTicketAlt style={{ color: PRIMARY_COLOR }} />
                  <span className="font-medium text-gray-700">Apply Coupon</span>
                </div>
                
                {discount > 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" />
                        <div>
                          <p className="font-bold text-green-800">{appliedCouponCode} Applied</p>
                          <p className="text-xs text-green-600">You saved ₹{discount}!</p>
                        </div>
                      </div>
                      <button onClick={handleRemoveCoupon} className="text-sm hover:underline" style={{ color: PRIMARY_COLOR }}>
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase());
                            setCouponError("");
                          }}
                          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] text-sm"
                        />
                      </div>
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                        className="px-4 py-2 rounded-lg text-white text-sm transition disabled:opacity-50"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                        onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
                      >
                        Apply
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
              
              {/* Price Details */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between" style={{ color: PRIMARY_COLOR }}>
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>You Saved</span>
                    <span>₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span style={{ color: PRIMARY_COLOR }}>₹{finalAmount}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full text-white py-3 rounded-lg mt-6 transition disabled:opacity-50 text-sm sm:text-base font-medium"
                style={{ backgroundColor: PRIMARY_COLOR }}
                onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Place Order • ₹${finalAmount}`
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <FaShieldAlt size={12} />
                <span>Secure Payment</span>
                <FaTruck size={12} className="ml-2" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Delete Address</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this address? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteAddress(showDeleteConfirm)}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;


