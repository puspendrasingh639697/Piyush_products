// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { fetchCart, clearCart } from '../redux/slices/cartSlice';
// // import { placeOrder } from '../redux/slices/orderSlice';
// // import { fetchAddresses } from '../redux/slices/userSlice';
// // import { applyCoupon, clearCoupon, createRazorpayOrder } from '../redux/slices/paymentSlice';
// // import API from '../utils/api';
// // import { addNotification } from '../redux/slices/notificationSlice';
// // import { toast } from 'react-toastify';
// // import { 
// //   FaMapMarkerAlt, FaCreditCard, FaTag, FaRupeeSign, 
// //   FaWallet, FaMobileAlt, FaUniversity, FaMoneyBillWave,
// //   FaPlus
// // } from 'react-icons/fa';

// // const Checkout = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
  
// //   // Redux State
// //   const { items: reduxItems, totalAmount: reduxTotal, totalItems: reduxTotalItems } = useSelector((state) => state.cart);
// //   const { userInfo } = useSelector((state) => state.user);
// //   const { addresses } = useSelector((state) => state.user);
  
// //   // Local state
// //   const [localCartItems, setLocalCartItems] = useState([]);
// //   const [localTotalAmount, setLocalTotalAmount] = useState(0);
// //   const [localTotalItems, setLocalTotalItems] = useState(0);
// //   const [isDataLoaded, setIsDataLoaded] = useState(false);
  
// //   const items = reduxItems?.length > 0 ? reduxItems : localCartItems;
// //   const totalAmount = reduxTotal > 0 ? reduxTotal : localTotalAmount;
// //   const totalItems = reduxTotalItems > 0 ? reduxTotalItems : localTotalItems;
  
// //   const [selectedAddress, setSelectedAddress] = useState(null);
// //   const [paymentMethod, setPaymentMethod] = useState('cod');
// //   const [showAddressForm, setShowAddressForm] = useState(false);
// //   const [couponCode, setCouponCode] = useState('');
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [discount, setDiscount] = useState(0);
// //   const [finalAmount, setFinalAmount] = useState(0);
// //   const [newAddress, setNewAddress] = useState({
// //     street: '',
// //     city: '',
// //     state: '',
// //     zipCode: ''
// //   });

// //   // Checkout.jsx mein, useEffect mein userId fetch karo
// // useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem('user'));
// //     const token = localStorage.getItem('token');
    
// //     if (user && token) {
// //         setUserId(user._id);  // ✅ Yeh line add karo
// //     }
// // }, []);

// //   // Load cart from localStorage
// //   useEffect(() => {
// //     const savedCart = localStorage.getItem('checkoutCart');
// //     if (savedCart) {
// //       const parsedCart = JSON.parse(savedCart);
// //       setLocalCartItems(parsedCart);
// //       const amount = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
// //       const count = parsedCart.reduce((sum, item) => sum + item.quantity, 0);
// //       setLocalTotalAmount(amount);
// //       setLocalTotalItems(count);
// //       setFinalAmount(amount);
// //     }
// //     setIsDataLoaded(true);
// //   }, []);

// //   // Check for empty cart
// //   useEffect(() => {
// //     if (!userInfo) {
// //       toast.error('Please login to checkout');
// //       navigate('/');
// //       return;
// //     }
    
// //     if (isDataLoaded && items.length === 0) {
// //       toast.error('Your cart is empty');
// //       navigate('/cart');
// //       return;
// //     }
    
// //     if (isDataLoaded && items.length > 0) {
// //       dispatch(fetchAddresses());
// //       if (reduxItems?.length === 0) {
// //         dispatch(fetchCart(userInfo._id));
// //       }
// //     }
// //   }, [dispatch, userInfo, navigate, isDataLoaded, items.length]);

// //   // Checkout.jsx mein - Yeh useEffect update karo
// // useEffect(() => {
// //     if (isDataLoaded && items.length > 0 && userInfo?._id) {
// //         dispatch(fetchAddresses());
// //         if (reduxItems?.length === 0) {
// //             dispatch(fetchCart(userInfo._id));  // ✅ userInfo._id use karo
// //         }
// //     }
// // }, [dispatch, userInfo, navigate, isDataLoaded, items.length]);

// //   useEffect(() => {
// //     if (addresses && addresses.length > 0 && !selectedAddress) {
// //       const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
// //       setSelectedAddress(defaultAddr);
// //     }
// //   }, [addresses, selectedAddress]);

// //   useEffect(() => {
// //     setFinalAmount(totalAmount - discount);
// //   }, [totalAmount, discount]);

// //   const handleApplyCoupon = async () => {
// //     if (!couponCode.trim()) {
// //       toast.error('Please enter coupon code');
// //       return;
// //     }
    
// //     try {
// //       const result = await dispatch(applyCoupon({ 
// //         couponCode: couponCode, 
// //         totalAmount: totalAmount 
// //       })).unwrap();
      
// //       setDiscount(result.discountAmount);
// //       setFinalAmount(result.finalAmount);
// //       toast.success(`Coupon applied! You saved ₹${result.discountAmount}`);
// //       setCouponCode('');
// //     } catch (err) {
// //       toast.error(err);
// //     }
// //   };

// //   // ✅ RAZORPAY PAYMENT
// //   const processRazorpayPayment = async () => {
// //     setIsProcessing(true);
    
// //     try {
// //       const orderData = {
// //         orderItems: items.map(item => ({
// //           name: item.name,
// //           qty: item.quantity,
// //           image: item.image,
// //           price: item.price,
// //           productId: item.id
// //         })),
// //         shippingAddress: {
// //           street: selectedAddress.street,
// //           city: selectedAddress.city,
// //           state: selectedAddress.state,
// //           zipCode: selectedAddress.zipCode
// //         },
// //         paymentMethod: 'Razorpay',
// //         totalPrice: finalAmount,
// //         discountAmount: discount
// //       };
      
// //       const orderResponse = await API.post('/orders/place', orderData);
// //       const createdOrder = orderResponse.data.order;
      
// //       if (!createdOrder) {
// //         throw new Error('Failed to create order');
// //       }
      
// //       const amountInPaise = Math.round(finalAmount * 100);
// //       const paymentResponse = await API.post('/payment/checkout', {
// //         amount: finalAmount,
// //         couponCode: couponCode,
// //         orderId: createdOrder._id
// //       });
      
// //       const { order } = paymentResponse.data;
      
// //       const script = document.createElement('script');
// //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
// //       script.onload = () => {
// //         const options = {
// //           key: 'rzp_live_KRi62Ox52cJBa5',
// //           amount: order.amount,
// //           currency: order.currency,
// //           name: 'Your Store',
// //           description: `Order Payment`,
// //           order_id: order.id,
// //           handler: async (paymentResponse) => {
// //             try {
// //               const verifyResponse = await API.post('/payment/verify', {
// //                 razorpay_order_id: paymentResponse.razorpay_order_id,
// //                 razorpay_payment_id: paymentResponse.razorpay_payment_id,
// //                 razorpay_signature: paymentResponse.razorpay_signature
// //               });
              
// //               if (verifyResponse.data.success) {
// //                 await API.put(`/orders/${createdOrder._id}/payment`, {
// //                   isPaid: true,
// //                   paidAt: new Date(),
// //                   paymentId: paymentResponse.razorpay_payment_id
// //                 });
                
// //                 dispatch(clearCart());
// //                 localStorage.removeItem('checkoutCart');
                
// //                 toast.success('✅ Payment successful! Order placed! 🎉');
// //                 navigate('/profile?tab=orders');
// //               }
// //             } catch (err) {
// //               toast.error('Payment verification failed');
// //             }
// //             setIsProcessing(false);
// //           },
// //           prefill: {
// //             name: userInfo.name,
// //             email: userInfo.email,
// //             contact: userInfo.phone || ''
// //           },
// //           theme: { color: '#dc2626' }
// //         };
        
// //         const razorpay = new window.Razorpay(options);
// //         razorpay.open();
// //       };
      
// //       document.body.appendChild(script);
      
// //     } catch (err) {
// //       console.error('Payment error:', err);
// //       toast.error('Payment failed');
// //       setIsProcessing(false);
// //     }
// //   };

// //   // ✅ COD ORDER - FIXED (No duplicate function)
// //  // ✅ COD ORDER - FIXED
// // const processCODOrder = async () => {
// //     setIsProcessing(true);
    
// //     try {
// //         const orderData = {
// //             orderItems: items.map(item => ({
// //                 name: item.name,
// //                 qty: item.quantity,
// //                 image: item.image,
// //                 price: item.price,
// //                 productId: item.id
// //             })),
// //             shippingAddress: {
// //                 street: selectedAddress.street,
// //                 city: selectedAddress.city,
// //                 state: selectedAddress.state,
// //                 zipCode: selectedAddress.zipCode
// //             },
// //             paymentMethod: 'COD',
// //             totalPrice: finalAmount,
// //             discountAmount: discount
// //         };
        
// //         console.log("📦 COD Order Data:", orderData);
        
// //         const response = await API.post('/orders/place', orderData);
        
// //         if (response.data.order) {
// //             dispatch(clearCart());
// //             localStorage.removeItem('checkoutCart');
            
// //             // ✅ FIX: Dispatch placeOrder action to set orderPlaced state
// //             dispatch(placeOrder(orderData));
            
// //             toast.success('🎉 Order placed successfully!');
            
// //             // ✅ FIX: Success page pe bhejo, profile pe nahi
// //             navigate('/order-success');
// //         }
// //     } catch (err) {
// //         console.error("COD Error:", err.response?.data);
// //         toast.error(err.response?.data?.message || 'Failed to place order');
// //     } finally {
// //         setIsProcessing(false);
// //     }
// // };

// //   const handlePlaceOrder = () => {
// //     if (!selectedAddress) {
// //       toast.error('Please select a shipping address');
// //       return;
// //     }
    
// //     if (paymentMethod === 'razorpay') {
// //       processRazorpayPayment();
// //     } else if (paymentMethod === 'cod') {
// //       processCODOrder();
// //     } else {
// //       toast.error('Please select a payment method');
// //     }
// //   };

// //   if (!isDataLoaded) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading checkout...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (items.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
// //           <button 
// //             onClick={() => navigate("/products")}
// //             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
// //           >
// //             Continue Shopping
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="container mx-auto px-4 max-w-6xl">
// //         <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
// //         <div className="flex flex-col lg:flex-row gap-8">
// //           <div className="lg:w-2/3 space-y-6">
// //             {/* Shipping Address */}
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <FaMapMarkerAlt className="text-red-600" /> Shipping Address
// //               </h2>
              
// //               {addresses && addresses.length > 0 ? (
// //                 <div className="space-y-3">
// //                   {addresses.map((addr) => (
// //                     <label key={addr._id} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
// //                       <input
// //                         type="radio"
// //                         name="address"
// //                         checked={selectedAddress?._id === addr._id}
// //                         onChange={() => setSelectedAddress(addr)}
// //                         className="mt-1"
// //                       />
// //                       <div className="flex-1">
// //                         <p className="font-medium">{addr.street}</p>
// //                         <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.zipCode}</p>
// //                         {addr.isDefault && (
// //                           <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">Default</span>
// //                         )}
// //                       </div>
// //                     </label>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-4">
// //                   <p className="text-gray-500 mb-4">No addresses found. Please add an address.</p>
// //                   <button
// //                     onClick={() => setShowAddressForm(true)}
// //                     className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 mx-auto"
// //                   >
// //                     <FaPlus /> Add New Address
// //                   </button>
// //                 </div>
// //               )}
              
// //               {showAddressForm && (
// //                 <div className="mt-4 p-4 border rounded-lg bg-gray-50">
// //                   <h3 className="font-semibold mb-3">New Address</h3>
// //                   <div className="space-y-3">
// //                     <input
// //                       type="text"
// //                       placeholder="Street Address"
// //                       value={newAddress.street}
// //                       onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
// //                       className="w-full p-2 border rounded"
// //                     />
// //                     <div className="grid grid-cols-2 gap-3">
// //                       <input
// //                         type="text"
// //                         placeholder="City"
// //                         value={newAddress.city}
// //                         onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
// //                         className="p-2 border rounded"
// //                       />
// //                       <input
// //                         type="text"
// //                         placeholder="State"
// //                         value={newAddress.state}
// //                         onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
// //                         className="p-2 border rounded"
// //                       />
// //                     </div>
// //                     <input
// //                       type="text"
// //                       placeholder="Zip Code"
// //                       value={newAddress.zipCode}
// //                       onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
// //                       className="w-full p-2 border rounded"
// //                     />
// //                     <button
// //                       onClick={() => {
// //                         if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
// //                           setSelectedAddress({ ...newAddress, _id: Date.now(), isDefault: false });
// //                           setShowAddressForm(false);
// //                           setNewAddress({ street: '', city: '', state: '', zipCode: '' });
// //                           toast.success('Address added');
// //                         } else {
// //                           toast.error('Please fill all fields');
// //                         }
// //                       }}
// //                       className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
// //                     >
// //                       Save Address
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
            
// //             {/* Payment Methods */}
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <FaCreditCard className="text-red-600" /> Payment Methods
// //               </h2>
              
// //               <div className="space-y-3">
// //                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
// //                   <input
// //                     type="radio"
// //                     name="payment"
// //                     value="razorpay"
// //                     checked={paymentMethod === 'razorpay'}
// //                     onChange={(e) => setPaymentMethod(e.target.value)}
// //                   />
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2">
// //                       <FaCreditCard className="text-blue-600" />
// //                       <span className="font-medium ml-2">Razorpay</span>
// //                     </div>
// //                     <p className="text-xs text-gray-500">Card, UPI, Net Banking, Wallet</p>
// //                   </div>
// //                 </label>
                
// //                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
// //                   <input
// //                     type="radio"
// //                     name="payment"
// //                     value="cod"
// //                     checked={paymentMethod === 'cod'}
// //                     onChange={(e) => setPaymentMethod(e.target.value)}
// //                   />
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2">
// //                       <FaMoneyBillWave className="text-green-600" />
// //                       <span className="font-medium ml-2">Cash on Delivery</span>
// //                     </div>
// //                     <p className="text-xs text-gray-500">Pay when you receive</p>
// //                   </div>
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Order Summary */}
// //           <div className="lg:w-1/3">
// //             <div className="bg-white rounded-lg shadow p-6 sticky top-20">
// //               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
// //               <div className="max-h-48 overflow-y-auto mb-4">
// //                 {items.map((item, index) => (
// //                   <div key={index} className="flex gap-3 py-2 border-b">
// //                     <img src={item.image} className="w-12 h-12 object-cover rounded" />
// //                     <div className="flex-1">
// //                       <p className="text-sm font-medium">{item.name}</p>
// //                       <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
// //                     </div>
// //                     <p className="font-medium">₹{item.price * item.quantity}</p>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               <div className="mb-4 p-3 bg-gray-50 rounded-lg">
// //                 <div className="flex gap-2">
// //                   <input
// //                     type="text"
// //                     placeholder="Coupon code"
// //                     value={couponCode}
// //                     onChange={(e) => setCouponCode(e.target.value)}
// //                     className="flex-1 p-2 border rounded text-sm"
// //                   />
// //                   <button onClick={handleApplyCoupon} className="px-4 py-2 bg-red-600 text-white rounded">
// //                     Apply
// //                   </button>
// //                 </div>
// //               </div>
              
// //               <div className="space-y-2 pt-2 border-t">
// //                 <div className="flex justify-between">
// //                   <span>Subtotal ({totalItems})</span>
// //                   <span>₹{totalAmount}</span>
// //                 </div>
// //                 {discount > 0 && (
// //                   <div className="flex justify-between text-green-600">
// //                     <span>Discount</span>
// //                     <span>-₹{discount}</span>
// //                   </div>
// //                 )}
// //                 <div className="flex justify-between font-bold text-lg pt-2 border-t">
// //                   <span>Total</span>
// //                   <span className="text-red-600">₹{finalAmount}</span>
// //                 </div>
// //               </div>
              
// //               <button
// //                 onClick={handlePlaceOrder}
// //                 disabled={isProcessing}
// //                 className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 disabled:opacity-50"
// //               >
// //                 {isProcessing ? 'Processing...' : `Place Order • ₹${finalAmount}`}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Checkout;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { placeOrder, clearOrderPlaced } from '../redux/slices/orderSlice';
// import { useNavigate } from 'react-router-dom';
// import { fetchCart, clearCart } from '../redux/slices/cartSlice';
// import { placeOrder } from '../redux/slices/orderSlice';
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

//   // ✅ REMOVED THE BAD useEffect WITH setUserId

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

//   // RAZORPAY PAYMENT
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
      
//       const orderResponse = await API.post('/orders/place', orderData);
//       const createdOrder = orderResponse.data.order;
      
//       if (!createdOrder) {
//         throw new Error('Failed to create order');
//       }
      
//       const amountInPaise = Math.round(finalAmount * 100);
//       const paymentResponse = await API.post('/payment/checkout', {
//         amount: finalAmount,
//         couponCode: couponCode,
//         orderId: createdOrder._id
//       });
      
//       const { order } = paymentResponse.data;
      
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
//                 navigate('/profile?tab=orders');
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
//           theme: { color: '#dc2626' }
//         };
        
//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       };
      
//       document.body.appendChild(script);
      
//     } catch (err) {
//       console.error('Payment error:', err);
//       toast.error('Payment failed');
//       setIsProcessing(false);
//     }
//   };



// const processCODOrder = async () => {
//     setIsProcessing(true);
    
//     try {
//         const orderData = {
//             orderItems: items.map(item => ({
//                 name: item.name,
//                 qty: item.quantity,
//                 image: item.image,
//                 price: item.price,
//                 productId: item.id
//             })),
//             shippingAddress: {
//                 street: selectedAddress.street,
//                 city: selectedAddress.city,
//                 state: selectedAddress.state,
//                 zipCode: selectedAddress.zipCode
//             },
//             paymentMethod: 'COD',
//             totalPrice: finalAmount,
//             discountAmount: discount
//         };
        
//         // ✅ Dispatch placeOrder action
//         const result = await dispatch(placeOrder(orderData));
        
//         if (result.payload?.order) {
//             dispatch(clearCart());
//             localStorage.removeItem('checkoutCart');
//             toast.success('🎉 Order placed successfully!');
//             navigate('/order-success');
//         } else {
//             toast.error(result.payload?.message || 'Failed to place order');
//         }
//     } catch (err) {
//         toast.error(err.message || 'Failed to place order');
//     } finally {
//         setIsProcessing(false);
//     }
// };


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


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, clearCart } from '../redux/slices/cartSlice';
import { placeOrder, clearOrderPlaced } from '../redux/slices/orderSlice';
import { fetchAddresses } from '../redux/slices/userSlice';
import { applyCoupon, clearCoupon, createRazorpayOrder } from '../redux/slices/paymentSlice';
import API from '../utils/api';
import { addNotification } from '../redux/slices/notificationSlice';
import { toast } from 'react-toastify';
import { 
  FaMapMarkerAlt, FaCreditCard, FaTag, FaRupeeSign, 
  FaWallet, FaMobileAlt, FaUniversity, FaMoneyBillWave,
  FaPlus
} from 'react-icons/fa';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux State
  const { items: reduxItems, totalAmount: reduxTotal, totalItems: reduxTotalItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { addresses } = useSelector((state) => state.user);
  
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
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setLocalCartItems(parsedCart);
      const amount = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const count = parsedCart.reduce((sum, item) => sum + item.quantity, 0);
      setLocalTotalAmount(amount);
      setLocalTotalItems(count);
      setFinalAmount(amount);
    }
    setIsDataLoaded(true);
  }, []);

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

  useEffect(() => {
    setFinalAmount(totalAmount - discount);
  }, [totalAmount, discount]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter coupon code');
      return;
    }
    
    try {
      const result = await dispatch(applyCoupon({ 
        couponCode: couponCode, 
        totalAmount: totalAmount 
      })).unwrap();
      
      setDiscount(result.discountAmount);
      setFinalAmount(result.finalAmount);
      toast.success(`Coupon applied! You saved ₹${result.discountAmount}`);
      setCouponCode('');
    } catch (err) {
      toast.error(err);
    }
  };

  // ✅ COD ORDER - Using Redux placeOrder
  const processCODOrder = async () => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          productId: item.id
        })),
        shippingAddress: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode
        },
        paymentMethod: 'COD',
        totalPrice: finalAmount,
        discountAmount: discount
      };
      
      // ✅ Dispatch placeOrder action from Redux
      const result = await dispatch(placeOrder(orderData));
      
      if (result.payload?.order) {
        dispatch(clearCart());
        localStorage.removeItem('checkoutCart');
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

  // ✅ RAZORPAY PAYMENT
  const processRazorpayPayment = async () => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          productId: item.id
        })),
        shippingAddress: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode
        },
        paymentMethod: 'Razorpay',
        totalPrice: finalAmount,
        discountAmount: discount
      };
      
      // First create order
      const orderResponse = await API.post('/orders/place', orderData);
      const createdOrder = orderResponse.data.order;
      
      if (!createdOrder) {
        throw new Error('Failed to create order');
      }
      
      // Create Razorpay order
      const amountInPaise = Math.round(finalAmount * 100);
      const paymentResponse = await API.post('/payment/checkout', {
        amount: finalAmount,
        couponCode: couponCode,
        orderId: createdOrder._id
      });
      
      const { order } = paymentResponse.data;
      
      // Load Razorpay script
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
          theme: { color: '#dc2626' },
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <button 
            onClick={() => navigate("/products")}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" /> Shipping Address
              </h2>
              
              {addresses && addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label key={addr._id} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress?._id === addr._id}
                        onChange={() => setSelectedAddress(addr)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{addr.street}</p>
                        <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.zipCode}</p>
                        {addr.isDefault && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">Default</span>
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
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 mx-auto"
                  >
                    <FaPlus /> Add New Address
                  </button>
                </div>
              )}
              
              {showAddressForm && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">New Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="p-2 border rounded"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                      className="w-full p-2 border rounded"
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
                      className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaCreditCard className="text-red-600" /> Payment Methods
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-blue-600" />
                      <span className="font-medium ml-2">Razorpay</span>
                    </div>
                    <p className="text-xs text-gray-500">Card, UPI, Net Banking, Wallet</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-green-600" />
                      <span className="font-medium ml-2">Cash on Delivery</span>
                    </div>
                    <p className="text-xs text-gray-500">Pay when you receive</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="max-h-48 overflow-y-auto mb-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 py-2 border-b">
                    <img src={item.image} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button onClick={handleApplyCoupon} className="px-4 py-2 bg-red-600 text-white rounded">
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems})</span>
                  <span>₹{totalAmount}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-red-600">₹{finalAmount}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 disabled:opacity-50"
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