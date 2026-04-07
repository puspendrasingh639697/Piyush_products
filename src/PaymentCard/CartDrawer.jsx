import React from 'react';
import { IoClose } from 'react-icons/io5';

const CartDrawer = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[380px] bg-white h-full shadow-2xl flex flex-col animate-slideLeft">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase tracking-tight">Shopping Cart</h2>
          <button onClick={onClose} className="text-2xl"><IoClose /></button>
        </div>

        {/* Shipping Progress Bar */}
        <div className="p-5 bg-gray-50">
          <p className="text-[11px] text-[#2c7a7b] font-bold text-center italic mb-2">You qualify for free shipping!</p>
          <div className="w-full h-1.5 bg-gray-200 rounded-full">
            <div className="w-full h-full bg-[#4fd1c5] rounded-full" />
          </div>
        </div>

        {/* Item */}
        <div className="p-5 flex gap-4 border-b">
          <img src={product.img} className="w-20 h-20 object-contain border bg-white" />
          <div className="flex-1">
            <h3 className="text-[12px] font-bold uppercase tracking-tight leading-tight">{product.name}</h3>
            <p className="text-sm font-bold mt-1 text-[#A64B2A]">Rs. {product.price}.00</p>
            <div className="mt-3 flex items-center border border-gray-300 w-24 h-8 text-xs">
              <button className="flex-1">-</button>
              <span className="flex-1 text-center font-bold">1</span>
              <button className="flex-1">+</button>
            </div>
          </div>
          <button className="text-gray-400 self-start text-xl hover:text-black">×</button>
        </div>

        {/* Footer */}
        <div className="mt-auto p-5 border-t space-y-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>Rs. {product.price}.00</span>
          </div>
          <p className="text-[10px] text-gray-500 text-center italic">Tax included and shipping calculated at checkout</p>
          <button className="w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-widest">Checkout</button>
          <button className="w-full text-[11px] font-bold uppercase underline tracking-widest">View Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;