import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaCheckCircle } from "react-icons/fa"; 

const OrderSumary = ({ formData, cartItems }) => {
  const navigate = useNavigate();

  // Price calculation logic: Saare items ka total jodna
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      // Comma hatane ke liye check
      const priceStr = item.price ? item.price.toString().replace(/,/g, "") : "0";
      return acc + parseInt(priceStr);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        
        {/* LEFT: Address & Products */}
        <div className="md:col-span-2 space-y-4">
          
          {/* 1. Address Section */}
          <div className="bg-white p-5 shadow-sm border rounded-sm">
            <h2 className="text-blue-600 font-bold flex items-center gap-2 mb-3 uppercase text-sm">
              <FaCheckCircle /> Delivery Address
            </h2>
            <div className="text-sm">
              <p className="font-bold">
                {formData.name} 
                <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] ml-2 uppercase border">
                   {formData.addressType || "HOME"}
                </span>
              </p>
              <p className="text-gray-600 mt-1">
                {formData.address}, {formData.area}, {formData.city}, {formData.state} - {formData.pincode}
              </p>
              <p className="font-bold mt-2">Mobile: {formData.mobile}</p>
            </div>
          </div>

          {/* 2. Product Items Section */}
          <div className="bg-white shadow-sm border rounded-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-bold text-gray-700">Order Items ({cartItems.length})</h3>
            </div>
            
            <div className="divide-y">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-4 px-4">
                    {/* Image handling with backup keys */}
                    <div className="w-20 h-20 border flex-shrink-0 bg-white p-1">
                      <img 
                        src={item.image || item.img} 
                        alt={item.title || item.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
                      />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-medium text-gray-800">{item.title || item.name}</p>
                       <p className="font-bold text-lg mt-1">₹{item.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-400">Your cart is empty!</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Price Details & Payment Button */}
        <div className="h-fit">
          <div className="bg-white p-5 shadow-sm border rounded-sm sticky top-32">
            <h2 className="text-gray-400 font-bold text-xs uppercase border-b pb-2 mb-4 tracking-widest">Price Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Delivery Charges</span>
                <span>FREE</span>
              </div>
              <hr className="border-dashed" />
              <div className="pt-1 flex justify-between text-lg font-black">
                <span>Total Amount</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Proceed to Payment Button */}
            // OrderSumary.jsx ke andar ka button logic
<button 
  onClick={() => {
    // 1. Pehle cart ka data localStorage mein daalo Checkout page ke liye
    // Hum sirf pehla item bhej rahe hain kyunki Checkout single product logic par hai
    if(cartItems.length > 0) {
      const itemToBuy = {
        product: cartItems[0], // Pehla product
        quantity: 1
      };
      localStorage.setItem('checkoutItem', JSON.stringify(itemToBuy));
      
      // 2. Ab Checkout page par bhejo
      navigate('/checkout');
    }
  }}
  className="w-full mt-6 bg-[#fb641b] text-white py-3 font-bold uppercase rounded-sm shadow hover:bg-[#f4510b] transition-all flex items-center justify-center gap-2"
>
  <FaBolt /> Proceed to Payment
</button>
            <p className="text-[10px] text-gray-500 mt-3 text-center">
              Safe and Secure Payments. 100% Authentic products.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderSumary;