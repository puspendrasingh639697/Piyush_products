

// // // import React, { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { useNavigate } from 'react-router-dom';
// // // import { fetchCart, updateCartQuantity, removeFromCart } from '../redux/slices/cartSlice';
// // // import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
// // // import { toast } from 'react-toastify';

// // // const Cart = () => {
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const { items, totalAmount, totalItems, isLoading } = useSelector((state) => state.cart);
// // //   const { userInfo } = useSelector((state) => state.user);
// // //   const userId = userInfo?._id;

// // //   useEffect(() => {
// // //     if (userId) {
// // //       dispatch(fetchCart(userId));
// // //     } else {
// // //       toast.error('Please login to view cart');
// // //       navigate('/');
// // //     }
// // //   }, [dispatch, userId, navigate]);

// // //   const updateQuantity = (productId, quantity) => {
// // //     if (quantity < 1) {
// // //       removeItem(productId);
// // //       return;
// // //     }
// // //     dispatch(updateCartQuantity({ userId, productId, quantity }));
// // //   };

// // //   const removeItem = (productId) => {
// // //     dispatch(removeFromCart({ userId, productId }));
// // //     toast.success('Item removed from cart');
// // //   };

// // //   const handleCheckout = () => {
// // //     if (items.length === 0) {
// // //       toast.error('Your cart is empty');
// // //       return;
// // //     }
// // //     navigate('/checkout');
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
// // //           <p className="text-gray-600">Loading cart...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!items || items.length === 0) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // //         <div className="text-center">
// // //           <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
// // //           <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
// // //           <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
// // //           <button 
// // //             onClick={() => navigate("/products")}
// // //             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
// // //           >
// // //             Continue Shopping
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-8">
// // //       <div className="container mx-auto px-4 max-w-6xl">
// // //         <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>
        
// // //         <div className="flex flex-col lg:flex-row gap-8">
// // //           {/* Cart Items */}
// // //           <div className="lg:w-2/3">
// // //             <div className="bg-white rounded-lg shadow overflow-hidden">
// // //               <div className="divide-y divide-gray-200">
// // //                 {items.map((item) => {
// // //                   const product = item.productId;
// // //                   const productId = product?._id || item.productId;
// // //                   const productName = product?.name || "Product";
// // //                   const productPrice = product?.price || 0;
// // //                   const productImage = product?.image || "";
                  
// // //                   return (
// // //                     <div key={item._id} className="p-6 flex flex-col sm:flex-row gap-4">
// // //                       <img 
// // //                         src={productImage} 
// // //                         alt={productName} 
// // //                         className="w-24 h-24 object-cover rounded"
// // //                         onError={(e) => e.target.src = "https://via.placeholder.com/100"}
// // //                       />
// // //                       <div className="flex-1">
// // //                         <h3 className="font-semibold text-lg">{productName}</h3>
// // //                         <p className="text-gray-600">₹{productPrice}</p>
// // //                         <div className="flex items-center gap-4 mt-2">
// // //                           <div className="flex items-center border rounded">
// // //                             <button
// // //                               onClick={() => updateQuantity(productId, item.quantity - 1)}
// // //                               className="px-3 py-1 hover:bg-gray-100"
// // //                             >
// // //                               <FaMinus size={12} />
// // //                             </button>
// // //                             <span className="px-4 py-1">{item.quantity}</span>
// // //                             <button
// // //                               onClick={() => updateQuantity(productId, item.quantity + 1)}
// // //                               className="px-3 py-1 hover:bg-gray-100"
// // //                             >
// // //                               <FaPlus size={12} />
// // //                             </button>
// // //                           </div>
// // //                           <button
// // //                             onClick={() => removeItem(productId)}
// // //                             className="text-red-600 hover:text-red-800"
// // //                           >
// // //                             <FaTrash />
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                       <div className="text-right">
// // //                         <p className="font-bold text-lg">₹{productPrice * item.quantity}</p>
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Order Summary */}
// // //           <div className="lg:w-1/3">
// // //             <div className="bg-white rounded-lg shadow p-6 sticky top-20">
// // //               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
// // //               <div className="space-y-2 mb-4">
// // //                 <div className="flex justify-between">
// // //                   <span>Subtotal ({totalItems} items)</span>
// // //                   <span>₹{totalAmount}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span>Shipping</span>
// // //                   <span>Free</span>
// // //                 </div>
// // //                 <div className="border-t pt-2 mt-2">
// // //                   <div className="flex justify-between font-bold text-lg">
// // //                     <span>Total</span>
// // //                     <span>₹{totalAmount}</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <button
// // //                 onClick={handleCheckout}
// // //                 className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
// // //               >
// // //                 Proceed to Checkout
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Cart;


// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { fetchCart, updateCartQuantity, removeFromCart } from '../redux/slices/cartSlice';
// // import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
// // import { toast } from 'react-toastify';

// // const Cart = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { items, totalAmount, totalItems, isLoading } = useSelector((state) => state.cart);
// //   const { userInfo } = useSelector((state) => state.user);
// //   const userId = userInfo?._id;

// //   useEffect(() => {
// //     if (userId) {
// //       dispatch(fetchCart(userId));
// //     } else {
// //       toast.error('Please login to view cart');
// //       navigate('/');
// //     }
// //   }, [dispatch, userId, navigate]);

// //   const updateQuantity = (productId, quantity) => {
// //     if (quantity < 1) {
// //       removeItem(productId);
// //       return;
// //     }
// //     dispatch(updateCartQuantity({ userId, productId, quantity }));
// //   };

// //   const removeItem = (productId) => {
// //     dispatch(removeFromCart({ userId, productId }));
// //     toast.success('Item removed from cart');
// //   };

// //   const handleCheckout = () => {
// //     if (items.length === 0) {
// //       toast.error('Your cart is empty');
// //       return;
// //     }
// //     navigate('/checkout');
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading cart...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!items || items.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center">
// //           <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
// //           <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
// //           <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
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
// //         <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>
        
// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {/* Cart Items */}
// //           <div className="lg:w-2/3">
// //             <div className="bg-white rounded-lg shadow overflow-hidden">
// //               <div className="divide-y divide-gray-200">
// //                 {items.map((item) => {
// //                   const product = item.productId;
// //                   const productId = product?._id || item.productId;
// //                   const productName = product?.name || "Product";
// //                   const productPrice = product?.price || 0;
// //                   const productImage = product?.image || "";
                  
// //                   return (
// //                     <div key={item._id} className="p-6 flex flex-col sm:flex-row gap-4">
// //                       <img 
// //                         src={productImage} 
// //                         alt={productName} 
// //                         className="w-24 h-24 object-cover rounded"
// //                         onError={(e) => e.target.src = "https://via.placeholder.com/100"}
// //                       />
// //                       <div className="flex-1">
// //                         <h3 className="font-semibold text-lg">{productName}</h3>
// //                         <p className="text-gray-600">₹{productPrice}</p>
// //                         <div className="flex items-center gap-4 mt-2">
// //                           <div className="flex items-center border rounded">
// //                             <button
// //                               onClick={() => updateQuantity(productId, item.quantity - 1)}
// //                               className="px-3 py-1 hover:bg-gray-100"
// //                             >
// //                               <FaMinus size={12} />
// //                             </button>
// //                             <span className="px-4 py-1">{item.quantity}</span>
// //                             <button
// //                               onClick={() => updateQuantity(productId, item.quantity + 1)}
// //                               className="px-3 py-1 hover:bg-gray-100"
// //                             >
// //                               <FaPlus size={12} />
// //                             </button>
// //                           </div>
// //                           <button
// //                             onClick={() => removeItem(productId)}
// //                             className="text-red-600 hover:text-red-800"
// //                           >
// //                             <FaTrash />
// //                           </button>
// //                         </div>
// //                       </div>
// //                       <div className="text-right">
// //                         <p className="font-bold text-lg">₹{productPrice * item.quantity}</p>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Order Summary */}
// //           <div className="lg:w-1/3">
// //             <div className="bg-white rounded-lg shadow p-6 sticky top-20">
// //               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
// //               <div className="space-y-2 mb-4">
// //                 <div className="flex justify-between">
// //                   <span>Subtotal ({totalItems} items)</span>
// //                   <span>₹{totalAmount}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span>Shipping</span>
// //                   <span>Free</span>
// //                 </div>
// //                 <div className="border-t pt-2 mt-2">
// //                   <div className="flex justify-between font-bold text-lg">
// //                     <span>Total</span>
// //                     <span>₹{totalAmount}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={handleCheckout}
// //                 className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
// //               >
// //                 Proceed to Checkout
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchCart, updateCartQuantity, removeFromCart } from '../redux/slices/cartSlice';
// import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items, totalAmount, totalItems, isLoading } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.user);
//   const userId = userInfo?._id;

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCart(userId));
//     } else {
//       // Agar user login nahi hai to local storage se cart dikhao
//       const localCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
//       if (localCart.length === 0) {
//         toast.error('Please login to view cart');
//         navigate('/');
//       }
//     }
//   }, [dispatch, userId, navigate]);

//   const updateQuantity = (productId, quantity) => {
//     if (quantity < 1) {
//       removeItem(productId);
//       return;
//     }
//     if (userId) {
//       dispatch(updateCartQuantity({ userId, productId, quantity }));
//     } else {
//       // Local storage update
//       const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
//       const item = cart.find(i => i.id === productId);
//       if (item) {
//         item.quantity = quantity;
//         localStorage.setItem('shoppingCart', JSON.stringify(cart));
//         window.dispatchEvent(new Event('storage'));
//         toast.success('Quantity updated');
//       }
//     }
//   };

//   const removeItem = (productId) => {
//     if (userId) {
//       dispatch(removeFromCart({ userId, productId }));
//     } else {
//       const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
//       const newCart = cart.filter(i => i.id !== productId);
//       localStorage.setItem('shoppingCart', JSON.stringify(newCart));
//       window.dispatchEvent(new Event('storage'));
//       toast.success('Item removed');
//     }
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       toast.error('Your cart is empty');
//       return;
//     }
//     // ✅ Direct checkout pe jao, address waha select hoga
//     navigate('/checkout');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading cart...</p>
//         </div>
//       </div>
//     );
//   }

//   // Agar cart empty hai
//   if (!items || items.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
//           <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
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

//   // Display cart items
//   const displayItems = items.map(item => {
//     const product = item.productId;
//     return {
//       _id: item._id,
//       productId: product?._id || item.productId,
//       name: product?.name || 'Product',
//       price: product?.price || 0,
//       image: product?.image || '',
//       quantity: item.quantity
//     };
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>
        
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Cart Items */}
//           <div className="lg:w-2/3">
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               <div className="divide-y divide-gray-200">
//                 {displayItems.map((item) => (
//                   <div key={item._id} className="p-6 flex flex-col sm:flex-row gap-4">
//                     <img 
//                       src={item.image} 
//                       alt={item.name} 
//                       className="w-24 h-24 object-cover rounded"
//                       onError={(e) => e.target.src = "https://via.placeholder.com/100"}
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-lg">{item.name}</h3>
//                       <p className="text-gray-600">₹{item.price}</p>
//                       <div className="flex items-center gap-4 mt-2">
//                         <div className="flex items-center border rounded">
//                           <button
//                             onClick={() => updateQuantity(item.productId, item.quantity - 1)}
//                             className="px-3 py-1 hover:bg-gray-100"
//                           >
//                             <FaMinus size={12} />
//                           </button>
//                           <span className="px-4 py-1">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.productId, item.quantity + 1)}
//                             className="px-3 py-1 hover:bg-gray-100"
//                           >
//                             <FaPlus size={12} />
//                           </button>
//                         </div>
//                         <button
//                           onClick={() => removeItem(item.productId)}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Order Summary */}
//           <div className="lg:w-1/3">
//             <div className="bg-white rounded-lg shadow p-6 sticky top-20">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="space-y-2 mb-4">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({totalItems} items)</span>
//                   <span>₹{totalAmount}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>Free</span>
//                 </div>
//                 <div className="border-t pt-2 mt-2">
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span>₹{totalAmount}</span>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    loadCartFromLocalStorage();
    
    // Listen for cart updates
    window.addEventListener('storage', loadCartFromLocalStorage);
    return () => window.removeEventListener('storage', loadCartFromLocalStorage);
  }, []);

  const loadCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    setCartItems(cart);
    
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const amount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(itemsCount);
    setTotalAmount(amount);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    
    const amount = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    
    setTotalAmount(amount);
    setTotalItems(itemsCount);
    toast.success('Quantity updated');
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    
    const amount = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    
    setTotalAmount(amount);
    setTotalItems(itemsCount);
    toast.success('Item removed');
    
    // Trigger event for navbar update
    window.dispatchEvent(new Event('storage'));
  };

  // ✅ FIXED: Checkout Button Handler
  const handleCheckout = () => {
  console.log("Checkout button clicked");
  console.log("Cart items:", cartItems);
  
  if (cartItems.length === 0) {
    toast.error('Your cart is empty');
    return;
  }
  
  // ✅ Save cart items to localStorage before navigating
  localStorage.setItem('checkoutCart', JSON.stringify(cartItems));
  
  navigate('/checkout');
};
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded"
                      onError={(e) => e.target.src = "https://via.placeholder.com/100"}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <FaMinus size={12} />
          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              
              {/* ✅ CHECKOUT BUTTON - Fixed */}
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;