// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchCart, clearCart } from '../redux/slices/cartSlice';
// import { placeOrder, clearOrderPlaced } from '../redux/slices/orderSlice';
// import { fetchAddresses } from '../redux/slices/userSlice';
// import { applyCoupon, clearCoupon, createRazorpayOrder } from '../redux/slices/paymentSlice';
// import API from '../utils/api';
// import { addNotification } from '../redux/slices/notificationSlice';
// import { toast } from 'react-toastify';
// import { 
//   FaMapMarkerAlt, FaCreditCard, FaTag, FaRupeeSign, 
//   FaWallet, FaMobileAlt, FaUniversity, FaMoneyBillWave,
//   FaPlus
// } from 'react-icons/fa';

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Redux State
//   const { items: reduxItems, totalAmount: reduxTotal, totalItems: reduxTotalItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.user);
//   const { addresses } = useSelector((state) => state.user);
  
//   // Local state
//   const [localCartItems, setLocalCartItems] = useState([]);
//   const [localTotalAmount, setLocalTotalAmount] = useState(0);
//   const [localTotalItems, setLocalTotalItems] = useState(0);
//   const [isDataLoaded, setIsDataLoaded] = useState(false);
  
//   const items = reduxItems?.length > 0 ? reduxItems : localCartItems;
//   const totalAmount = reduxTotal > 0 ? reduxTotal : localTotalAmount;
//   const totalItems = reduxTotalItems > 0 ? reduxTotalItems : localTotalItems;
  
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [couponCode, setCouponCode] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [discount, setDiscount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);
//   const [newAddress, setNewAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zipCode: ''
//   });

//   // Load cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem('checkoutCart');
//     if (savedCart) {
//       const parsedCart = JSON.parse(savedCart);
//       setLocalCartItems(parsedCart);
//       const amount = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//       const count = parsedCart.reduce((sum, item) => sum + item.quantity, 0);
//       setLocalTotalAmount(amount);
//       setLocalTotalItems(count);
//       setFinalAmount(amount);
//     }
//     setIsDataLoaded(true);
//   }, []);

//   // Check for empty cart
//   useEffect(() => {
//     if (!userInfo) {
//       toast.error('Please login to checkout');
//       navigate('/');
//       return;
//     }
    
//     if (isDataLoaded && items.length === 0) {
//       toast.error('Your cart is empty');
//       navigate('/cart');
//       return;
//     }
    
//     if (isDataLoaded && items.length > 0) {
//       dispatch(fetchAddresses());
//       if (reduxItems?.length === 0) {
//         dispatch(fetchCart(userInfo._id));
//       }
//     }
//   }, [dispatch, userInfo, navigate, isDataLoaded, items.length]);

//   useEffect(() => {
//     if (addresses && addresses.length > 0 && !selectedAddress) {
//       const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
//       setSelectedAddress(defaultAddr);
//     }
//   }, [addresses, selectedAddress]);

//   useEffect(() => {
//     setFinalAmount(totalAmount - discount);
//   }, [totalAmount, discount]);

//   const handleApplyCoupon = async () => {
//     if (!couponCode.trim()) {
//       toast.error('Please enter coupon code');
//       return;
//     }
    
//     try {
//       const result = await dispatch(applyCoupon({ 
//         couponCode: couponCode, 
//         totalAmount: totalAmount 
//       })).unwrap();
      
//       setDiscount(result.discountAmount);
//       setFinalAmount(result.finalAmount);
//       toast.success(`Coupon applied! You saved ₹${result.discountAmount}`);
//       setCouponCode('');
//     } catch (err) {
//       toast.error(err);
//     }
//   };

//   // ✅ COD ORDER - Using Redux placeOrder
//   const processCODOrder = async () => {
//     setIsProcessing(true);
    
//     try {
//       const orderData = {
//         orderItems: items.map(item => ({
//           name: item.name,
//           qty: item.quantity,
//           image: item.image,
//           price: item.price,
//           productId: item.id
//         })),
//         shippingAddress: {
//           street: selectedAddress.street,
//           city: selectedAddress.city,
//           state: selectedAddress.state,
//           zipCode: selectedAddress.zipCode
//         },
//         paymentMethod: 'COD',
//         totalPrice: finalAmount,
//         discountAmount: discount
//       };
      
//       // ✅ Dispatch placeOrder action from Redux
//       const result = await dispatch(placeOrder(orderData));
      
//       if (result.payload?.order) {
//         dispatch(clearCart());
//         localStorage.removeItem('checkoutCart');
//         toast.success('🎉 Order placed successfully!');
//         navigate('/order-success');
//       } else {
//         toast.error(result.payload?.message || 'Failed to place order');
//       }
//     } catch (err) {
//       console.error("COD Error:", err);
//       toast.error(err.message || 'Failed to place order');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // ✅ RAZORPAY PAYMENT
//   const processRazorpayPayment = async () => {
//     setIsProcessing(true);
    
//     try {
//       const orderData = {
//         orderItems: items.map(item => ({
//           name: item.name,
//           qty: item.quantity,
//           image: item.image,
//           price: item.price,
//           productId: item.id
//         })),
//         shippingAddress: {
//           street: selectedAddress.street,
//           city: selectedAddress.city,
//           state: selectedAddress.state,
//           zipCode: selectedAddress.zipCode
//         },
//         paymentMethod: 'Razorpay',
//         totalPrice: finalAmount,
//         discountAmount: discount
//       };
      
//       // First create order
//       const orderResponse = await API.post('/orders/place', orderData);
//       const createdOrder = orderResponse.data.order;
      
//       if (!createdOrder) {
//         throw new Error('Failed to create order');
//       }
      
//       // Create Razorpay order
//       const amountInPaise = Math.round(finalAmount * 100);
//       const paymentResponse = await API.post('/payment/checkout', {
//         amount: finalAmount,
//         couponCode: couponCode,
//         orderId: createdOrder._id
//       });
      
//       const { order } = paymentResponse.data;
      
//       // Load Razorpay script
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
//       script.onload = () => {
//         const options = {
//           key: 'rzp_live_KRi62Ox52cJBa5',
//           amount: order.amount,
//           currency: order.currency,
//           name: 'Your Store',
//           description: `Order Payment`,
//           order_id: order.id,
//           handler: async (paymentResponse) => {
//             try {
//               const verifyResponse = await API.post('/payment/verify', {
//                 razorpay_order_id: paymentResponse.razorpay_order_id,
//                 razorpay_payment_id: paymentResponse.razorpay_payment_id,
//                 razorpay_signature: paymentResponse.razorpay_signature
//               });
              
//               if (verifyResponse.data.success) {
//                 await API.put(`/orders/${createdOrder._id}/payment`, {
//                   isPaid: true,
//                   paidAt: new Date(),
//                   paymentId: paymentResponse.razorpay_payment_id
//                 });
                
//                 dispatch(clearCart());
//                 localStorage.removeItem('checkoutCart');
//                 toast.success('✅ Payment successful! Order placed! 🎉');
//                 navigate('/order-success');
//               } else {
//                 toast.error('Payment verification failed');
//               }
//             } catch (err) {
//               toast.error('Payment verification failed');
//             }
//             setIsProcessing(false);
//           },
//           prefill: {
//             name: userInfo.name,
//             email: userInfo.email,
//             contact: userInfo.phone || ''
//           },
//           theme: { color: '#dc2626' },
//           modal: {
//             ondismiss: () => {
//               toast.info('Payment cancelled');
//               setIsProcessing(false);
//             }
//           }
//         };
        
//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       };
      
//       script.onerror = () => {
//         toast.error('Failed to load payment gateway');
//         setIsProcessing(false);
//       };
      
//       document.body.appendChild(script);
      
//     } catch (err) {
//       console.error('Payment error:', err);
//       toast.error('Payment failed');
//       setIsProcessing(false);
//     }
//   };

//   const handlePlaceOrder = () => {
//     if (!selectedAddress) {
//       toast.error('Please select a shipping address');
//       return;
//     }
    
//     if (paymentMethod === 'razorpay') {
//       processRazorpayPayment();
//     } else if (paymentMethod === 'cod') {
//       processCODOrder();
//     } else {
//       toast.error('Please select a payment method');
//     }
//   };

//   if (!isDataLoaded) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading checkout...</p>
//         </div>
//       </div>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
//           <button 
//             onClick={() => navigate("/products")}
//             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="lg:w-2/3 space-y-6">
//             {/* Shipping Address */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-red-600" /> Shipping Address
//               </h2>
              
//               {addresses && addresses.length > 0 ? (
//                 <div className="space-y-3">
//                   {addresses.map((addr) => (
//                     <label key={addr._id} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                       <input
//                         type="radio"
//                         name="address"
//                         checked={selectedAddress?._id === addr._id}
//                         onChange={() => setSelectedAddress(addr)}
//                         className="mt-1"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{addr.street}</p>
//                         <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.zipCode}</p>
//                         {addr.isDefault && (
//                           <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">Default</span>
//                         )}
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-4">
//                   <p className="text-gray-500 mb-4">No addresses found. Please add an address.</p>
//                   <button
//                     onClick={() => setShowAddressForm(true)}
//                     className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 mx-auto"
//                   >
//                     <FaPlus /> Add New Address
//                   </button>
//                 </div>
//               )}
              
//               {showAddressForm && (
//                 <div className="mt-4 p-4 border rounded-lg bg-gray-50">
//                   <h3 className="font-semibold mb-3">New Address</h3>
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       placeholder="Street Address"
//                       value={newAddress.street}
//                       onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
//                       className="w-full p-2 border rounded"
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         placeholder="City"
//                         value={newAddress.city}
//                         onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         type="text"
//                         placeholder="State"
//                         value={newAddress.state}
//                         onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
//                         className="p-2 border rounded"
//                       />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Zip Code"
//                       value={newAddress.zipCode}
//                       onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
//                       className="w-full p-2 border rounded"
//                     />
//                     <button
//                       onClick={() => {
//                         if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
//                           setSelectedAddress({ ...newAddress, _id: Date.now(), isDefault: false });
//                           setShowAddressForm(false);
//                           setNewAddress({ street: '', city: '', state: '', zipCode: '' });
//                           toast.success('Address added');
//                         } else {
//                           toast.error('Please fill all fields');
//                         }
//                       }}
//                       className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
//                     >
//                       Save Address
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Payment Methods */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <FaCreditCard className="text-red-600" /> Payment Methods
//               </h2>
              
//               <div className="space-y-3">
//                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="razorpay"
//                     checked={paymentMethod === 'razorpay'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <FaCreditCard className="text-blue-600" />
//                       <span className="font-medium ml-2">Razorpay</span>
//                     </div>
//                     <p className="text-xs text-gray-500">Card, UPI, Net Banking, Wallet</p>
//                   </div>
//                 </label>
                
//                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === 'cod'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <FaMoneyBillWave className="text-green-600" />
//                       <span className="font-medium ml-2">Cash on Delivery</span>
//                     </div>
//                     <p className="text-xs text-gray-500">Pay when you receive</p>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>
          
//           {/* Order Summary */}
//           <div className="lg:w-1/3">
//             <div className="bg-white rounded-lg shadow p-6 sticky top-20">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
//               <div className="max-h-48 overflow-y-auto mb-4">
//                 {items.map((item, index) => (
//                   <div key={index} className="flex gap-3 py-2 border-b">
//                     <img src={item.image} className="w-12 h-12 object-cover rounded" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">{item.name}</p>
//                       <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                     <p className="font-medium">₹{item.price * item.quantity}</p>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     placeholder="Coupon code"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     className="flex-1 p-2 border rounded text-sm"
//                   />
//                   <button onClick={handleApplyCoupon} className="px-4 py-2 bg-red-600 text-white rounded">
//                     Apply
//                   </button>
//                 </div>
//               </div>
              
//               <div className="space-y-2 pt-2 border-t">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({totalItems})</span>
//                   <span>₹{totalAmount}</span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-₹{discount}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between font-bold text-lg pt-2 border-t">
//                   <span>Total</span>
//                   <span className="text-red-600">₹{finalAmount}</span>
//                 </div>
//               </div>
              
//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={isProcessing}
//                 className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 disabled:opacity-50"
//               >
//                 {isProcessing ? 'Processing...' : `Place Order • ₹${finalAmount}`}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchCart, clearCart } from '../redux/slices/cartSlice';
// import { placeOrder, clearOrderPlaced } from '../redux/slices/orderSlice';
// import { fetchAddresses } from '../redux/slices/userSlice';
// import { applyCoupon, clearCoupon, createRazorpayOrder, clearAppliedCoupon, selectAppliedCoupon, selectCouponDiscount, selectCouponLoading } from '../redux/slices/paymentSlice';
// import API from '../utils/api';
// import { addNotification } from '../redux/slices/notificationSlice';
// import { toast } from 'react-toastify';
// import { 
//   FaMapMarkerAlt, FaCreditCard, FaTag, FaRupeeSign, 
//   FaWallet, FaMobileAlt, FaUniversity, FaMoneyBillWave,
//   FaPlus, FaTicketAlt, FaCheckCircle, FaTimesCircle
// } from 'react-icons/fa';

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Redux State
//   const { items: reduxItems, totalAmount: reduxTotal, totalItems: reduxTotalItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.user);
//   const { addresses } = useSelector((state) => state.user);
  
//   // Coupon State from Redux
//   const appliedCoupon = useSelector(selectAppliedCoupon);
//   const couponDiscount = useSelector(selectCouponDiscount);
//   const couponLoading = useSelector(selectCouponLoading);
  
//   // Local state
//   const [localCartItems, setLocalCartItems] = useState([]);
//   const [localTotalAmount, setLocalTotalAmount] = useState(0);
//   const [localTotalItems, setLocalTotalItems] = useState(0);
//   const [isDataLoaded, setIsDataLoaded] = useState(false);
  
//   const items = reduxItems?.length > 0 ? reduxItems : localCartItems;
//   const totalAmount = reduxTotal > 0 ? reduxTotal : localTotalAmount;
//   const totalItems = reduxTotalItems > 0 ? reduxTotalItems : localTotalItems;
  
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [couponCode, setCouponCode] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [couponError, setCouponError] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);
//   const [newAddress, setNewAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zipCode: ''
//   });

//   // Load cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem('checkoutCart');
//     const savedCoupon = localStorage.getItem('appliedCoupon');
    
//     if (savedCart) {
//       const parsedCart = JSON.parse(savedCart);
//       setLocalCartItems(parsedCart);
//       const amount = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//       const count = parsedCart.reduce((sum, item) => sum + item.quantity, 0);
//       setLocalTotalAmount(amount);
//       setLocalTotalItems(count);
//       setFinalAmount(amount);
//     }
    
//     // Load saved coupon
//     if (savedCoupon) {
//       const coupon = JSON.parse(savedCoupon);
//       setDiscount(coupon.discountAmount || 0);
//       setFinalAmount((savedCart ? JSON.parse(savedCart).reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0) - (coupon.discountAmount || 0));
//     }
    
//     setIsDataLoaded(true);
//   }, []);

//   // Update final amount when totalAmount or discount changes
//   useEffect(() => {
//     setFinalAmount(totalAmount - discount);
//   }, [totalAmount, discount]);

//   // Check for empty cart
//   useEffect(() => {
//     if (!userInfo) {
//       toast.error('Please login to checkout');
//       navigate('/');
//       return;
//     }
    
//     if (isDataLoaded && items.length === 0) {
//       toast.error('Your cart is empty');
//       navigate('/cart');
//       return;
//     }
    
//     if (isDataLoaded && items.length > 0) {
//       dispatch(fetchAddresses());
//       if (reduxItems?.length === 0) {
//         dispatch(fetchCart(userInfo._id));
//       }
//     }
//   }, [dispatch, userInfo, navigate, isDataLoaded, items.length]);

//   useEffect(() => {
//     if (addresses && addresses.length > 0 && !selectedAddress) {
//       const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
//       setSelectedAddress(defaultAddr);
//     }
//   }, [addresses, selectedAddress]);

//   // ✅ Handle Apply Coupon
//   const handleApplyCoupon = async () => {
//     if (!couponCode.trim()) {
//       setCouponError("Please enter coupon code");
//       toast.error('Please enter coupon code');
//       return;
//     }
    
//     setCouponError("");
    
//     try {
//       const result = await dispatch(applyCoupon({ 
//         couponCode: couponCode, 
//         totalAmount: totalAmount 
//       })).unwrap();
      
//       setDiscount(result.discountAmount);
//       setFinalAmount(result.finalAmount);
//       setCouponCode('');
//       toast.success(`Coupon applied! You saved ₹${result.discountAmount}`);
      
//       // Save to localStorage for persistence
//       localStorage.setItem('appliedCoupon', JSON.stringify({
//         code: couponCode,
//         discountAmount: result.discountAmount
//       }));
      
//     } catch (err) {
//       setCouponError(err);
//       toast.error(err);
//     }
//   };

//   // ✅ Handle Remove Coupon
//   const handleRemoveCoupon = () => {
//     dispatch(clearAppliedCoupon());
//     setDiscount(0);
//     setFinalAmount(totalAmount);
//     localStorage.removeItem('appliedCoupon');
//     localStorage.removeItem('appliedCouponCode');
//     toast.info("Coupon removed");
//   };

//   // ✅ COD ORDER - Using Redux placeOrder
//   const processCODOrder = async () => {
//     setIsProcessing(true);
    
//     try {
//       const orderData = {
//         orderItems: items.map(item => ({
//           name: item.name,
//           qty: item.quantity,
//           image: item.image,
//           price: item.price,
//           productId: item.id || item.productId?._id
//         })),
//         shippingAddress: {
//           street: selectedAddress.street,
//           city: selectedAddress.city,
//           state: selectedAddress.state,
//           zipCode: selectedAddress.zipCode
//         },
//         paymentMethod: 'COD',
//         totalPrice: finalAmount,
//         discountAmount: discount,
//         couponCode: localStorage.getItem('appliedCouponCode') || ''
//       };
      
//       const result = await dispatch(placeOrder(orderData));
      
//       if (result.payload?.order) {
//         dispatch(clearCart());
//         localStorage.removeItem('checkoutCart');
//         localStorage.removeItem('appliedCoupon');
//         localStorage.removeItem('appliedCouponCode');
//         toast.success('🎉 Order placed successfully!');
//         navigate('/order-success');
//       } else {
//         toast.error(result.payload?.message || 'Failed to place order');
//       }
//     } catch (err) {
//       console.error("COD Error:", err);
//       toast.error(err.message || 'Failed to place order');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // ✅ RAZORPAY PAYMENT
//   const processRazorpayPayment = async () => {
//     setIsProcessing(true);
    
//     try {
//       const orderData = {
//         orderItems: items.map(item => ({
//           name: item.name,
//           qty: item.quantity,
//           image: item.image,
//           price: item.price,
//           productId: item.id || item.productId?._id
//         })),
//         shippingAddress: {
//           street: selectedAddress.street,
//           city: selectedAddress.city,
//           state: selectedAddress.state,
//           zipCode: selectedAddress.zipCode
//         },
//         paymentMethod: 'Razorpay',
//         totalPrice: finalAmount,
//         discountAmount: discount,
//         couponCode: localStorage.getItem('appliedCouponCode') || ''
//       };
      
//       // First create order
//       const orderResponse = await API.post('/orders/place', orderData);
//       const createdOrder = orderResponse.data.order;
      
//       if (!createdOrder) {
//         throw new Error('Failed to create order');
//       }
      
//       // Create Razorpay order
//       const paymentResponse = await API.post('/payment/checkout', {
//         amount: finalAmount,
//         couponCode: localStorage.getItem('appliedCouponCode') || '',
//         orderId: createdOrder._id
//       });
      
//       const { order } = paymentResponse.data;
      
//       // Load Razorpay script
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
//       script.onload = () => {
//         const options = {
//           key: 'rzp_live_KRi62Ox52cJBa5',
//           amount: order.amount,
//           currency: order.currency,
//           name: 'Your Store',
//           description: `Order Payment`,
//           order_id: order.id,
//           handler: async (paymentResponse) => {
//             try {
//               const verifyResponse = await API.post('/payment/verify', {
//                 razorpay_order_id: paymentResponse.razorpay_order_id,
//                 razorpay_payment_id: paymentResponse.razorpay_payment_id,
//                 razorpay_signature: paymentResponse.razorpay_signature
//               });
              
//               if (verifyResponse.data.success) {
//                 await API.put(`/orders/${createdOrder._id}/payment`, {
//                   isPaid: true,
//                   paidAt: new Date(),
//                   paymentId: paymentResponse.razorpay_payment_id
//                 });
                
//                 dispatch(clearCart());
//                 localStorage.removeItem('checkoutCart');
//                 localStorage.removeItem('appliedCoupon');
//                 localStorage.removeItem('appliedCouponCode');
//                 toast.success('✅ Payment successful! Order placed! 🎉');
//                 navigate('/order-success');
//               } else {
//                 toast.error('Payment verification failed');
//               }
//             } catch (err) {
//               toast.error('Payment verification failed');
//             }
//             setIsProcessing(false);
//           },
//           prefill: {
//             name: userInfo.name,
//             email: userInfo.email,
//             contact: userInfo.phone || ''
//           },
//           theme: { color: '#dc2626' },
//           modal: {
//             ondismiss: () => {
//               toast.info('Payment cancelled');
//               setIsProcessing(false);
//             }
//           }
//         };
        
//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       };
      
//       script.onerror = () => {
//         toast.error('Failed to load payment gateway');
//         setIsProcessing(false);
//       };
      
//       document.body.appendChild(script);
      
//     } catch (err) {
//       console.error('Payment error:', err);
//       toast.error('Payment failed');
//       setIsProcessing(false);
//     }
//   };

//   const handlePlaceOrder = () => {
//     if (!selectedAddress) {
//       toast.error('Please select a shipping address');
//       return;
//     }
    
//     if (paymentMethod === 'razorpay') {
//       processRazorpayPayment();
//     } else if (paymentMethod === 'cod') {
//       processCODOrder();
//     } else {
//       toast.error('Please select a payment method');
//     }
//   };

//   if (!isDataLoaded) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading checkout...</p>
//         </div>
//       </div>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
//           <button 
//             onClick={() => navigate("/products")}
//             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="lg:w-2/3 space-y-6">
//             {/* Shipping Address */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <FaMapMarkerAlt className="text-red-600" /> Shipping Address
//               </h2>
              
//               {addresses && addresses.length > 0 ? (
//                 <div className="space-y-3">
//                   {addresses.map((addr) => (
//                     <label key={addr._id} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                       <input
//                         type="radio"
//                         name="address"
//                         checked={selectedAddress?._id === addr._id}
//                         onChange={() => setSelectedAddress(addr)}
//                         className="mt-1"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{addr.street}</p>
//                         <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.zipCode}</p>
//                         {addr.isDefault && (
//                           <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">Default</span>
//                         )}
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-4">
//                   <p className="text-gray-500 mb-4">No addresses found. Please add an address.</p>
//                   <button
//                     onClick={() => setShowAddressForm(true)}
//                     className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 mx-auto"
//                   >
//                     <FaPlus /> Add New Address
//                   </button>
//                 </div>
//               )}
              
//               {showAddressForm && (
//                 <div className="mt-4 p-4 border rounded-lg bg-gray-50">
//                   <h3 className="font-semibold mb-3">New Address</h3>
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       placeholder="Street Address"
//                       value={newAddress.street}
//                       onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
//                       className="w-full p-2 border rounded"
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         placeholder="City"
//                         value={newAddress.city}
//                         onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         type="text"
//                         placeholder="State"
//                         value={newAddress.state}
//                         onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
//                         className="p-2 border rounded"
//                       />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Zip Code"
//                       value={newAddress.zipCode}
//                       onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
//                       className="w-full p-2 border rounded"
//                     />
//                     <button
//                       onClick={() => {
//                         if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
//                           setSelectedAddress({ ...newAddress, _id: Date.now(), isDefault: false });
//                           setShowAddressForm(false);
//                           setNewAddress({ street: '', city: '', state: '', zipCode: '' });
//                           toast.success('Address added');
//                         } else {
//                           toast.error('Please fill all fields');
//                         }
//                       }}
//                       className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
//                     >
//                       Save Address
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Payment Methods */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <FaCreditCard className="text-red-600" /> Payment Methods
//               </h2>
              
//               <div className="space-y-3">
//                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="razorpay"
//                     checked={paymentMethod === 'razorpay'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <FaCreditCard className="text-blue-600" />
//                       <span className="font-medium ml-2">Razorpay</span>
//                     </div>
//                     <p className="text-xs text-gray-500">Card, UPI, Net Banking, Wallet</p>
//                   </div>
//                 </label>
                
//                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === 'cod'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <FaMoneyBillWave className="text-green-600" />
//                       <span className="font-medium ml-2">Cash on Delivery</span>
//                     </div>
//                     <p className="text-xs text-gray-500">Pay when you receive</p>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>
          
//           {/* Order Summary */}
//           <div className="lg:w-1/3">
//             <div className="bg-white rounded-lg shadow p-6 sticky top-20">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
//               <div className="max-h-48 overflow-y-auto mb-4">
//                 {items.map((item, index) => (
//                   <div key={index} className="flex gap-3 py-2 border-b">
//                     <img src={item.image} className="w-12 h-12 object-cover rounded" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">{item.name}</p>
//                       <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                     <p className="font-medium">₹{item.price * item.quantity}</p>
//                   </div>
//                 ))}
//               </div>
              
//               {/* ✅ COUPON SECTION - UPDATED */}
//               <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-2 mb-2">
//                   <FaTicketAlt className="text-red-600" />
//                   <span className="font-medium text-gray-700">Apply Coupon</span>
//                 </div>
                
//                 {discount > 0 ? (
//                   // ✅ Applied Coupon Display
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-2">
//                         <FaCheckCircle className="text-green-600" />
//                         <div>
//                           <p className="font-bold text-green-800">
//                             {localStorage.getItem('appliedCouponCode') || 'Coupon'} Applied
//                           </p>
//                           <p className="text-xs text-green-600">You saved ₹{discount}!</p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={handleRemoveCoupon}
//                         className="text-red-500 hover:text-red-700 text-sm"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // ✅ Coupon Input
//                   <div>
//                     <div className="flex gap-2">
//                       <div className="flex-1 relative">
//                         <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="text"
//                           placeholder="Enter coupon code"
//                           value={couponCode}
//                           onChange={(e) => {
//                             setCouponCode(e.target.value.toUpperCase());
//                             setCouponError("");
//                           }}
//                           className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-sm"
//                         />
//                       </div>
//                       <button
//                         onClick={handleApplyCoupon}
//                         disabled={couponLoading || !couponCode}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 text-sm"
//                       >
//                         {couponLoading ? "..." : "Apply"}
//                       </button>
//                     </div>
//                     {couponError && (
//                       <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                         <FaTimesCircle size={10} /> {couponError}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
              
//               {/* Price Details */}
//               <div className="space-y-2 pt-2 border-t">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({totalItems} items)</span>
//                   <span>₹{totalAmount}</span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-₹{discount}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>Free</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg pt-2 border-t">
//                   <span>Total</span>
//                   <span className="text-red-600">₹{finalAmount}</span>
//                 </div>
//                 {discount > 0 && (
//                   <p className="text-xs text-green-600 text-right">
//                     You saved ₹{discount} with coupon!
//                   </p>
//                 )}
//               </div>
              
//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={isProcessing}
//                 className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 disabled:opacity-50"
//               >
//                 {isProcessing ? 'Processing...' : `Place Order • ₹${finalAmount}`}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, clearCart } from '../redux/slices/cartSlice';
import { placeOrder, clearOrderPlaced } from '../redux/slices/orderSlice';
import { fetchAddresses } from '../redux/slices/userSlice';
import { applyCoupon, clearCoupon, createRazorpayOrder, clearAppliedCoupon, selectAppliedCoupon, selectCouponDiscount, selectCouponLoading } from '../redux/slices/paymentSlice';
import API from '../utils/api';
import { addNotification } from '../redux/slices/notificationSlice';
import { toast } from 'react-toastify';
import { 
  FaMapMarkerAlt, FaCreditCard, FaTag, FaRupeeSign, 
  FaWallet, FaMobileAlt, FaUniversity, FaMoneyBillWave,
  FaPlus, FaTicketAlt, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';

const PRIMARY_COLOR = '#8B1E2D';
const PRIMARY_DARK = '#6B1622';


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux State
  const { items: reduxItems, totalAmount: reduxTotal, totalItems: reduxTotalItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { addresses } = useSelector((state) => state.user);
  
  // Coupon State from Redux
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const couponDiscount = useSelector(selectCouponDiscount);
  const couponLoading = useSelector(selectCouponLoading);
  
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
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('checkoutCart');
    const savedCoupon = localStorage.getItem('appliedCoupon');
    
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
    }
    
    setIsDataLoaded(true);
  }, []);

  // Update final amount when totalAmount or discount changes
  useEffect(() => {
    setFinalAmount(totalAmount - discount);
  }, [totalAmount, discount]);

  // Check for empty cart
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
      if (reduxItems?.length === 0) {
        dispatch(fetchCart(userInfo._id));
      }
    }
  }, [dispatch, userInfo, navigate, isDataLoaded, items.length]);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [addresses, selectedAddress]);

const handleApplyCoupon = async () => {
    console.log("Coupon code before send:", couponCode);
    console.log("Total amount:", totalAmount);
    
    if (!couponCode.trim()) {
        setCouponError("Please enter coupon code");
        toast.error('Please enter coupon code');
        return;
    }
    
    setCouponError("");
    
    try {
        const result = await dispatch(applyCoupon({ 
            couponCode: couponCode, 
            totalAmount: totalAmount 
        })).unwrap();
        
        console.log("API Response:", result);
        
        // ✅ YE LINES IMPORTANT HAIN — discount set karna
        if (result && result.success) {
            setDiscount(result.discountAmount);
            setFinalAmount(result.finalAmount);
            setCouponCode('');
            toast.success(`Coupon applied! You saved ₹${result.discountAmount}`);
            
            localStorage.setItem('appliedCoupon', JSON.stringify({
                code: couponCode,
                discountAmount: result.discountAmount
            }));
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
    localStorage.removeItem('appliedCoupon');
    localStorage.removeItem('appliedCouponCode');
    toast.info("Coupon removed");
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
        couponCode: localStorage.getItem('appliedCouponCode') || ''
      };
      
      const result = await dispatch(placeOrder(orderData));
      
      if (result.payload?.order) {
        dispatch(clearCart());
        localStorage.removeItem('checkoutCart');
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
        couponCode: localStorage.getItem('appliedCouponCode') || ''
      };
      
      const orderResponse = await API.post('/orders/place', orderData);
      const createdOrder = orderResponse.data.order;
      
      if (!createdOrder) {
        throw new Error('Failed to create order');
      }
      
      const paymentResponse = await API.post('/payment/checkout', {
        amount: finalAmount,
        couponCode: localStorage.getItem('appliedCouponCode') || '',
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
          name: 'Your Store',
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
                
                dispatch(clearCart());
                localStorage.removeItem('checkoutCart');
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
      toast.error('Payment failed');
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error('Please select a shipping address');
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
          <div 
            className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin mx-auto mb-4"
            style={{ borderTopColor: PRIMARY_COLOR }}
          ></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>Your Cart is Empty</h2>
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{ color: PRIMARY_COLOR }}>Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Left Section */}
          <div className="lg:w-2/3 space-y-5 sm:space-y-6">
            
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt style={{ color: PRIMARY_COLOR }} /> Shipping Address
              </h2>
              
              {addresses && addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label key={addr._id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
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
                          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#FEE2E2', color: PRIMARY_COLOR }}>Default</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No addresses found. Please add an address.</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-sm font-medium flex items-center gap-1 mx-auto hover:underline"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    <FaPlus /> Add New Address
                  </button>
                </div>
              )}
              
              {showAddressForm && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3 text-gray-800">New Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] focus:border-[#8B1E2D]"
                    />
                    <button
                      onClick={() => {
                        if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
                          setSelectedAddress({ ...newAddress, _id: Date.now(), isDefault: false });
                          setShowAddressForm(false);
                          setNewAddress({ street: '', city: '', state: '', zipCode: '' });
                          toast.success('Address added');
                        } else {
                          toast.error('Please fill all fields');
                        }
                      }}
                      className="w-full text-white py-2 rounded-lg transition"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                      onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <FaCreditCard style={{ color: PRIMARY_COLOR }} /> Payment Methods
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
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
                
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
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
              <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>Order Summary</h2>
              
              <div className="max-h-48 overflow-y-auto mb-4 space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 py-2 border-b border-gray-100">
                    <img src={item.image} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
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
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" />
                        <div>
                          <p className="font-bold text-green-800">
                            {localStorage.getItem('appliedCouponCode') || 'Coupon'} Applied
                          </p>
                          <p className="text-xs text-green-600">You saved ₹{discount}!</p>
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
    <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Enter coupon code"
      value={couponCode}
      onChange={(e) => {
        const value = e.target.value || '';
        setCouponCode(value.toUpperCase());
        setCouponError("");
      }}
      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
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
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span style={{ color: PRIMARY_COLOR }}>₹{finalAmount}</span>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-right pt-1" style={{ color: PRIMARY_COLOR }}>
                    You saved ₹{discount} with coupon!
                  </p>
                )}
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full text-white py-3 rounded-lg mt-6 transition disabled:opacity-50 text-sm sm:text-base font-medium"
                style={{ backgroundColor: PRIMARY_COLOR }}
                onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
              >
                {isProcessing ? 'Processing...' : `Place Order • ₹${finalAmount}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;