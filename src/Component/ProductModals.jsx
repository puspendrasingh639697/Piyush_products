import React, { useState } from "react";
import { FaLock, FaStar, FaShoppingCart, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductModals = ({ onClose, category, card, setCard }) => {
  const [quantity, setQuantity] = useState(1);

  // Aapka exact add to cart function
  const handleAddToCart = (item) => {
    setCard([...card, { 
        id: item.id, 
        price: item.price, 
        title: item.title, 
        image: item.image, 
        quantity: quantity 
    }]);
    
    toast.success("Added to cart successfully", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!category || category.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in fade-in zoom-in duration-300"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase text-gray-800">
            Product Details
          </h1>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <TiDeleteOutline className="text-4xl text-gray-400 hover:text-black" />
          </button>
        </div>

        <div className="overflow-y-auto p-8">
          {category.map((item) => (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* IMAGE BOX */}
              <div className="bg-[#F8F9FA] rounded-[1.5rem] p-10 flex items-center justify-center border border-gray-50 shadow-inner group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-h-[400px] object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* INFO BOX */}
              <div className="flex flex-col justify-center space-y-8">
                <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 leading-none mb-4">
                    {item.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex text-[#FFB800] text-sm">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    <span className="text-[10px] font-black bg-black text-white px-3 py-1 rounded-full uppercase tracking-tighter">
                      Premium Quality
                    </span>
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black italic text-gray-900">₹{item.price}</span>
                  <span className="text-gray-400 font-bold mb-1 underline decoration-2 decoration-blue-500">Free Delivery</span>
                </div>

                {/* Description Box */}
                <div className="border-l-4 border-blue-500 bg-blue-50/30 p-5 rounded-r-2xl">
                   <h4 className="text-xs font-black uppercase text-blue-600 mb-2 tracking-widest">Description</h4>
                   <p className="text-gray-600 text-sm leading-relaxed font-medium">
                     {item.description || "Designed for long-lasting performance and maximum efficiency. Elevate your kitchen experience with Maharani's elite range."}
                   </p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center gap-6">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Select Quantity</span>
                  <div className="flex items-center bg-gray-100 rounded-2xl p-1 px-2 gap-4 border border-gray-200">
                    <button 
                      onClick={decreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-blue-600 transition-all active:scale-90"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-xl font-black w-8 text-center">{quantity}</span>
                    <button 
                      onClick={increaseQuantity}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-blue-600 transition-all active:scale-90"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link 
                    to="/payment"
                    onClick={() => localStorage.setItem('checkoutItem', JSON.stringify({ product: item, quantity }))}
                    className="flex-1 bg-[#1773B0] hover:bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0"
                  >
                    <FaShoppingCart size={18} /> Buy it Now
                  </Link>
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-white border-2 border-black text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 flex items-center justify-center gap-3 transition-all"
                  >
                    <FaHeart size={18} /> Add to Cart
                  </button>
                </div>

                {/* Security Footer */}
                <div className="flex justify-between items-center opacity-40 border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2">
                        <FaLock className="text-xs" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
                    </div>
                    <div className="flex gap-4 grayscale">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-4" alt="visa" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-4" alt="mc" />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductModals;