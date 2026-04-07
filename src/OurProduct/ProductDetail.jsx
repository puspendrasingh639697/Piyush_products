// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { allProducts } from "./productData"; 

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedImg, setSelectedImg] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const foundProduct = allProducts.find((p) => String(p.id) === String(productId));
//     if (foundProduct) {
//       setProduct(foundProduct);
//       setSelectedImg(foundProduct.img);
//     }
//   }, [productId]);

//   if (!product) return <div className="pt-40 text-center font-light tracking-[5px]">LOADING...</div>;

//   const images = [product.img, product.img, product.img, product.img];

//   const handleThumbnailClick = (img, index) => {
//     setSelectedImg(img);
//     setCurrentIndex(index);
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: index * 100,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="max-w-[1400px] mx-auto p-4 md:p-10 pt-28 animate-fadeIn">
      
//       {/* --- BREADCRUMBS --- */}
//       <nav className="flex items-center gap-2 text-[14px] text-black mb-8">
//         <Link to="/" className="hover:text-black transition-colors">Home</Link>
//         <span>/</span>
//         <Link to={`/category/${product.category}`} className="hover:text-black transition-colors">
//           {product.category || "Collection"}
//         </Link>
//         <span>/</span>
//         <span className="text-gray-900 font-bold truncate max-w-[200px]">{product.name}</span>
//       </nav>

//       {/* --- MAIN PRODUCT SECTION --- */}
//       <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
//         <div className="flex w-full lg:w-[55%] gap-4 h-[500px] md:h-[600px]">
//           <div className="hidden md:flex flex-col gap-3 w-20">
//             <div ref={scrollRef} className="flex flex-col gap-3 overflow-y-auto h-full no-scrollbar py-1">
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleThumbnailClick(img, index)}
//                   className={`cursor-pointer transition-all duration-300 p-1 flex-shrink-0 ${
//                     currentIndex === index ? "" : ""
//                   }`}
//                 >
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex-1 border border-gray-100 relative flex items-center justify-center group overflow-hidden">
//            // Isko ProductDetail component ke return ke ekdum niche rakhein
// <AnimatePresence>
//   {isCartOpen && (
//     <div className="fixed inset-0 z-[1000] flex justify-end">
//       {/* Background Overlay - Ispe click karne se cart band hoga */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={() => setIsCartOpen(false)}
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//       />

//       {/* Cart Side Panel (Drawer) */}
//       <motion.div 
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ type: "tween", duration: 0.3 }}
//         className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col p-6"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h2 className="text-xl font-bold uppercase tracking-tighter">Shopping Cart</h2>
//           <button onClick={() => setIsCartOpen(false)} className="text-3xl font-light">&times;</button>
//         </div>

//         {/* Free Shipping Progress Bar (Maharani Style) */}
//         <div className="bg-gray-50 p-4 mb-6 rounded-md border border-gray-100">
//           <p className="text-[11px] text-teal-600 font-bold mb-2 text-center italic uppercase">
//             You qualify for free shipping! 🚚
//           </p>
//           <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//             <motion.div 
//               initial={{ width: 0 }}
//               animate={{ width: "100%" }}
//               className="h-full bg-teal-400" 
//             />
//           </div>
//         </div>

//         {/* Cart Item Layout */}
//         <div className="flex gap-4 border-b pb-6">
//           <img src={product.img} className="w-24 h-24 object-contain border bg-white rounded" />
//           <div className="flex-1">
//             <h3 className="text-[13px] font-bold uppercase leading-tight">{product.name}</h3>
//             <p className="text-md font-bold mt-2 text-[#A64B2A]">Rs. {product.price}.00</p>
//             <div className="mt-3 flex items-center border border-gray-300 w-24 h-8 text-sm">
//               <button className="flex-1 hover:bg-gray-100">-</button>
//               <span className="flex-1 text-center font-bold">{quantity}</span>
//               <button className="flex-1 hover:bg-gray-100">+</button>
//             </div>
//           </div>
//         </div>

//         {/* Footer with Subtotal & Checkout */}
//         <div className="mt-auto pt-6 space-y-4">
//           <div className="flex justify-between text-lg font-bold border-t pt-4">
//             <span>Subtotal:</span>
//             <span>Rs. {product.price * quantity}.00</span>
//           </div>
//           <p className="text-[11px] text-gray-500 text-center italic">
//             Tax included and shipping calculated at checkout
//           </p>
          
//           {/* Checkout Button - Jo next page par le jayega */}
//           <button 
//             onClick={() => navigate('/checkout')}
//             className="w-full bg-black text-white py-4 text-xs font-black uppercase tracking-[2px] hover:bg-red-800 transition-colors"
//           >
//             CHECKOUT
//           </button>
          
//           <button 
//             onClick={() => setIsCartOpen(false)}
//             className="w-full text-xs font-bold underline uppercase tracking-widest text-gray-600"
//           >
//             View Shopping Bag
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   )}
// </AnimatePresence>
//             <div className="bg-red-400 absolute top-6 left-6 border border-black px-3 py-1 text-[14px] tracking-[2px]">
//               Premium Quality
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col text-left">
//           <p className="text-orange-600 text-[14px] mb-4">
//             {product.series || "Professional"} Series
//           </p>
//           <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-[1.3] mb-6 uppercase tracking-tight">
//             {product.name}
//           </h1>

//           <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 pb-8">
//             <span className="text-4xl font-serif text-gray-900">₹{product.price}</span>
//             {product.oldPrice && (
//               <span className="text-gray-400 line-through text-lg font-light italic">₹{product.oldPrice}</span>
//             )}
//             <span className="text-green-600 text-[11px] font-bold uppercase tracking-widest ml-auto">In Stock</span>
//           </div>

//           <div className="space-y-8">
//             <p className="text-black text-sm leading-relaxed font-light">
//               This premium {product.name} is engineered for professional performance. 
//               Featuring advanced heat-responsive technology and a stunning mirror finish.
//             </p>

//             <div className="flex items-center gap-10">
//               <span className="text-[16px] text-black">Quantity</span>
//               <div className="flex items-center border border-black h-12">
//                 <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-r border-black">-</button>
//                 <span className="px-10 font-bold">{quantity}</span>
//                 <button onClick={() => setQuantity(q => q + 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-l border-black">+</button>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-4">
//               <button 
//   onClick={() => setIsCartOpen(true)} // Is click se right-side wala menu khulega
//   className="w-full bg-red-800 text-white py-3 text-[14px] hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-lg"
// >
//   Add To Shopping Bag
// </button>
//               <button className="w-full bg-red-800 text-white py-3 text-[14px] hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-lg">
//                 Check Delivery Status
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- ADDED SECTION 1: DESCRIPTION --- */}
//       <div className="border-gray-200  mb-20">
//         <div className="flex justify-center mb-10">
//           <h2 className="text-xl  pb-2">Description</h2>
//         </div>
//         <div className="max-w-[1000px] mx-auto text-center bg-gray-50 p-8 rounded-sm">
//           <p className="text-black leading-[1.8] text-[15px]">
//             {product.description || `The ${product.name} is a masterpiece of kitchen engineering. 
//             Designed for those who take cooking seriously, it features a heavy-duty tri-ply construction 
//             that ensures even heating across the entire surface. The ergonomic handles remain cool during 
//             cooking, and the premium finish makes it a beautiful addition to any tabletop.`}
//           </p>
//         </div>
//       </div>

//       {/* --- ADDED SECTION 2: RELATED PRODUCTS --- */}
//       <div className="mb-20">
//         <div className="flex justify-center mb-12">
//           <h2 className="text-xl">Related Products</h2>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {allProducts.slice(0, 4).map((item) => (
//             <div key={item.id} className="group cursor-pointer">
//               <div className="aspect-square  mb-4 p-6 border border-gray-100 overflow-hidden relative">
//                 <img src={item.img} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500" />
//               </div>
//               <h3 className="text-[14px]   text-black line-clamp-1">{item.name}</h3>
//               <p className="text-red-800 font-bold mt-2">Rs. {item.price}.00</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- ADDED SECTION 3: RECENTLY VIEWED --- */}
//       <div className="border-t border-gray-100 pt-16">
//         <div className="flex justify-center mb-12">
//           <h2 className="text-xl">Recently Viewed</h2>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {allProducts.slice(1, 5).map((item) => (
//             <div key={item.id} className="group cursor-pointer text-center border border-transparent hover:border-gray-100 p-2 transition-all">
//               <div className="aspect-square bg-white mb-4 p-4 relative">
//                 <img src={item.img} className="w-full h-full object-contain" />
//               </div>
//               <h3 className="text-[14px]  text-black line-clamp-1">{item.name}</h3>
//               <p className="text-red-800  mt-1 text-xs">Rs. {item.price}.00</p>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "./productData"; 

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ Fix: State added
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = allProducts.find((p) => String(p.id) === String(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImg(foundProduct.img);
    }
  }, [productId]);

  if (!product) return <div className="pt-40 text-center font-light tracking-[5px]">LOADING...</div>;

  const images = [product.img, product.img, product.img, product.img];

  const handleThumbnailClick = (img, index) => {
    setSelectedImg(img);
    setCurrentIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: index * 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-10 pt-28 animate-fadeIn">
      
      {/* --- BREADCRUMBS --- */}
      <nav className="flex items-center gap-2 text-[14px] text-black mb-8">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-black transition-colors">
          {product.category || "Collection"}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* --- MAIN PRODUCT SECTION --- */}
      <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
        <div className="flex w-full lg:w-[55%] gap-4 h-[500px] md:h-[600px]">
          <div className="hidden md:flex flex-col gap-3 w-20">
            <div ref={scrollRef} className="flex flex-col gap-3 overflow-y-auto h-full no-scrollbar py-1">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(img, index)}
                  className={`cursor-pointer transition-all duration-300 p-1 flex-shrink-0 ${
                    currentIndex === index ? "border border-black" : "opacity-60"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 border border-gray-100 relative flex items-center justify-center group overflow-hidden">
             <img src={selectedImg} className="max-h-full object-contain transition-transform duration-700 group-hover:scale-110" alt={product.name} />
             
            <div className="bg-red-400 absolute top-6 left-6 border border-black px-3 py-1 text-[14px] tracking-[2px]">
              Premium Quality
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col text-left">
          <p className="text-orange-600 text-[14px] mb-4">
            {product.series || "Professional"} Series
          </p>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-[1.3] mb-6 uppercase tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 pb-8">
            <span className="text-4xl font-serif text-gray-900">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg font-light italic">₹{product.oldPrice}</span>
            )}
            <span className="text-green-600 text-[11px] font-bold uppercase tracking-widest ml-auto">In Stock</span>
          </div>

          <div className="space-y-8">
            <p className="text-black text-sm leading-relaxed font-light">
              This premium {product.name} is engineered for professional performance. 
              Featuring advanced heat-responsive technology and a stunning mirror finish.
            </p>

            <div className="flex items-center gap-10">
              <span className="text-[16px] text-black">Quantity</span>
              <div className="flex items-center border border-black h-12">
                <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-r border-black">-</button>
                <span className="px-10 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-6 h-full hover:bg-black hover:text-white transition-all border-l border-black">+</button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {/* ✅ Add To Shopping Bag - Menu Kholega */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="w-full bg-red-800 text-white py-3 text-[14px] hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-lg"
              >
                Add To Shopping Bag
              </button>
              <button className="w-full bg-red-800 text-white py-3 text-[14px] hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-lg">
                Check Delivery Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESCRIPTION --- */}
      <div className="border-gray-200 mb-20">
        <div className="flex justify-center mb-10">
          <h2 className="text-xl pb-2">Description</h2>
        </div>
        <div className="max-w-[1000px] mx-auto text-center bg-gray-50 p-8 rounded-sm">
          <p className="text-black leading-[1.8] text-[15px]">
            {product.description || `The ${product.name} is a masterpiece of kitchen engineering.`}
          </p>
        </div>
      </div>

      {/* --- RELATED PRODUCTS --- */}
      <div className="mb-20">
        <div className="flex justify-center mb-12">
          <h2 className="text-xl">Related Products</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {allProducts.slice(0, 4).map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-square mb-4 p-6 border border-gray-100 overflow-hidden relative">
                <img src={item.img} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500" alt={item.name} />
              </div>
              <h3 className="text-[14px] text-black line-clamp-1">{item.name}</h3>
              <p className="text-red-800 font-bold mt-2">Rs. {item.price}.00</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- SHOPPING CART DRAWER (SIDE MENU) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold uppercase tracking-tighter">Shopping Bag</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-3xl font-light">&times;</button>
              </div>

              <div className="flex gap-4 border-b pb-6">
                <img src={product.img} className="w-24 h-24 object-contain border bg-white rounded" alt="cart item" />
                <div className="flex-1">
                  <h3 className="text-[13px] font-bold uppercase leading-tight">{product.name}</h3>
                  <p className="text-md font-bold mt-2 text-[#A64B2A]">Rs. {product.price}.00</p>
                </div>
              </div>

              <div className="mt-auto pt-6 space-y-4">
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Subtotal:</span>
                  <span>Rs. {product.price * quantity}.00</span>
                </div>
               <button 
  onClick={() => {
    // Data ko localStorage mein save karo (Refresh se bachne ke liye)
    localStorage.setItem('checkoutItem', JSON.stringify({ product, quantity }));
    navigate('/checkout');
  }}
  className="w-full bg-black text-white py-4 text-xs font-black uppercase tracking-[2px]"
>
  CHECKOUT
</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;