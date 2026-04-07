import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('checkoutItem');
    if (savedData) {
      setOrderData(JSON.parse(savedData));
    }
  }, []);

  if (!orderData) return <div className="p-20 text-center">Loading...</div>;

  const { product, quantity } = orderData;
  const price = Number(product.price.toString().replace(/[^0-9.-]+/g, "")) || 0;
  const subtotal = price * quantity;
  const taxes = 269.82;
  const total = subtotal + taxes;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      localStorage.removeItem('checkoutItem');
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col  text-black">
      {/* HEADER */}
      <header className="py-8 px-6 border-b border-gray-100 flex justify-center items-center relative">
        <h1 className="text-3xl">Puspendra Singh</h1>
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600 fill-none stroke-current stroke-2">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* LEFT SIDE - FORM */}
        <div className="flex-1 lg:pl-32 lg:pr-12 p-6 space-y-10 border-r border-gray-200">
          
          {/* CONTACT */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-medium">Contact</h2>
              <button className="text-blue-600 text-sm underline">Sign in</button>
            </div>
            <input type="text" placeholder="Email or mobile phone number" className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span>Email me with news and offers</span>
            </div>
          </section>

          {/* DELIVERY */}
          <section>
            <h2 className="text-xl font-medium mb-4">Delivery</h2>
            <div className="space-y-3">
              <select className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f9f9]">
                <option>India</option>
              </select>
              <div className="flex gap-3">
                <input type="text" placeholder="First name" className="flex-1 border border-gray-300 p-3 rounded-md" />
                <input type="text" placeholder="Last name" className="flex-1 border border-gray-300 p-3 rounded-md" />
              </div>
              <div className="relative">
                <input type="text" placeholder="Address" className="w-full border border-gray-300 p-3 rounded-md pr-10" />
                <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 p-3 rounded-md" />
              <div className="flex gap-3">
                <input type="text" placeholder="City" className="flex-1 border border-gray-300 p-3 rounded-md" />
                <select className="flex-1 border border-gray-300 p-3 rounded-md bg-white">
                  <option>Delhi</option>
                </select>
                <input type="text" placeholder="PIN code" className="flex-1 border border-gray-300 p-3 rounded-md" />
              </div>
            </div>
          </section>

          {/* PAYMENT */}
          <section>
            <h2 className="text-xl font-medium mb-1">Payment</h2>
            <p className="text-xs text-gray-500 mb-4">All transactions are secure and encrypted.</p>
            
            <div className="border border-blue-500 rounded-md overflow-hidden">
              <div className="bg-[#f0f5ff] p-4 flex justify-between items-center border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-[6px] border-blue-600 rounded-full"></div>
                  <span className="text-sm font-semibold">Cashfree Payments (UPI,Cards,Int'l cards,Wallets)</span>
                </div>
                <div className="flex gap-1">
                  <img src="https://img.icons8.com/color/30/000000/upi.png" alt="upi" />
                  <img src="https://img.icons8.com/color/30/000000/visa.png" alt="visa" />
                  <img src="https://img.icons8.com/color/30/000000/mastercard.png" alt="master" />
                </div>
              </div>
              <div className="p-8 bg-[#fafafa] text-center border-b border-gray-200">
                 <p className="text-sm text-gray-600">You'll be redirected to Cashfree Payments to complete your purchase.</p>
              </div>
              <div className="p-4 flex items-center gap-3 bg-white">
                <div className="w-5 h-5 border border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Cash on Delivery (COD)</span>
              </div>
            </div>
          </section>

          <button 
            onClick={handlePayNow}
            className="w-full bg-[#1773B0] hover:bg-[#146296] text-white py-4 rounded-md font-bold text-xl transition-all"
          >
            {isProcessing ? "Processing..." : "Pay now"}
          </button>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="flex-1 lg:pr-32 lg:pl-12 p-6 bg-[#fafafa]">
          <div className="sticky top-10">
            {/* Item */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative border border-gray-200 rounded-xl bg-white p-2">
                <img src={product.img} className="w-16 h-16 object-contain" alt="item" />
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {quantity}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold uppercase tracking-tight">{product.name}</h3>
              </div>
              <p className="text-sm font-medium">₹{subtotal.toLocaleString()}</p>
            </div>

            {/* Discount */}
            <div className="flex gap-2 mb-6">
              <input type="text" placeholder="Discount code" className="flex-1 border border-gray-300 p-3 rounded-md outline-none" />
              <button className="bg-[#e1e1e1] px-6 rounded-md text-gray-500 font-bold text-sm">Apply</button>
            </div>

            {/* Price Detail */}
            <div className="space-y-3 text-sm text-gray-600 border-b border-gray-200 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-black font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping <span className="cursor-help inline-block ml-1 border rounded-full w-3 h-3 text-[8px] text-center">?</span></span>
                <span className="text-xs">Enter shipping address</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated taxes <span className="cursor-help inline-block ml-1 border rounded-full w-3 h-3 text-[8px] text-center">?</span></span>
                <span className="text-black font-bold">₹{taxes}</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-center pt-6">
              <span className="text-xl">Total</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500">INR</span>
                <span className="text-2xl  tracking-tighter">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;