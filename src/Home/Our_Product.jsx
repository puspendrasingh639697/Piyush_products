// import React, { useState } from "react";
// import { HoverImageData } from "../JsonData/Home_Json";
// import { FaEye, FaHeart, FaShareAlt, FaShoppingCart, FaBolt } from "react-icons/fa";
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProductModals from "../Component/ProductModals";
// import { useNavigate } from "react-router-dom";

// const Our_Product = ({ card, setCard }) => {
//   const [category, setCategory] = useState([]);
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();

//   // Add to Cart Function
//   const addToCard = (id, price, title, image) => {
//     setCard([...card, { id, price, title, image }]);
//     toast.success("Added to cart successfully", {
//       position: "top-right",
//       autoClose: 1500,
//       theme: "dark",
//       transition: Bounce,
//     });
//   };

//   // Buy Now Function (Add to cart + Navigate to Cart)
//   const buyNow = (id, price, title, image) => {
//     // Pehle cart mein add karo agar already nahi hai
//     const exists = card.find((item) => item.id === id);
//     if (!exists) {
//       setCard([...card, { id, price, title, image }]);
//     }
//     // Turant cart page par bhej do
//     navigate("/cart"); 
//   };

//   const addModals = (id) => {
//     const handle = HoverImageData.filter((item) => item.id === id);
//     setCategory(handle);
//     setShow(true);
//   };

//   const goToCategory = (categoryName) => {
//     const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
//     navigate(`/category/${slug}`);
//   };

//   return (
//     <>
//       <ToastContainer />

//       <div className="w-full py-12 bg-[#f8f8f8]">
//         <div className="text-center mb-12">
          
//           <h1 className="text-3xl  text-red-800">
//             OUR PRODUCTS
//           </h1>
//           <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-[1400px] mx-auto">
//           {HoverImageData.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white group flex flex-col border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
//             >
//               {/* IMAGE AREA */}
//               <div 
//                 onClick={() => goToCategory(item.category || "all")} 
//                 className="relative h-72 bg-[#fdfdfd] flex items-center justify-center overflow-hidden cursor-pointer"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-700 group-hover:scale-110"
//                 />

//                 {/* SIDE HOVER ICONS */}
//                 <div className="absolute top-4 right-[-50px] group-hover:right-4 transition-all duration-500 flex flex-col gap-3">
//                   <button onClick={(e) => { e.stopPropagation(); addToCard(item.id, item.price, item.title, item.image); }} className="p-3 bg-white shadow-md rounded-full hover:bg-red-600 hover:text-white transition-colors"><FaHeart size={14}/></button>
//                   <button onClick={(e) => { e.stopPropagation(); addModals(item.id); }} className="p-3 bg-white shadow-md rounded-full hover:bg-black hover:text-white transition-colors"><FaEye size={14}/></button>
//                   <button onClick={(e) => e.stopPropagation()} className="p-3 bg-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"><FaShareAlt size={14}/></button>
//                 </div>
//               </div>

//               {/* CONTENT AREA */}
//               <div className="p-5 flex-grow">
//                 <p className="text-[12px] text-black  mb-1 ">{item.category || "General"}</p>
//                 <h2 
//                   onClick={() => goToCategory(item.category || "all")}
//                   className="text-sm text-gray-800 font-bold uppercase truncate cursor-pointer hover:text-red-700"
//                 >
//                   {item.title}
//                 </h2>
//                 <div className="flex items-center gap-2 mt-3">
//                   <span className="text-xl  text-black">₹{item.price}</span>
//                   <span className="text-xs text-gray-400 line-through">₹{parseInt(item.price) + 500}</span>
//                 </div>
//               </div>

//               {/* TWO BUTTONS AREA */}
//              <div className="p-5 pt-0 flex flex-row gap-2">
//   {/* ADD TO CART - YELLOW (Left) */}
//   <button
//     onClick={() => addToCard(item.id, item.price, item.title, item.image)}
//     className="flex-1 bg-[#FFD200] text-black py-3 text-[14px] flex items-center justify-center gap-1 hover:bg-black hover:text-white transition-all duration-300"
//   >
//     <FaShoppingCart size={12} /> Add to Cart
//   </button>

//   {/* BUY NOW - BLACK (Right) */}
//   <button
//     onClick={() => buyNow(item.id, item.price, item.title, item.image)}
//     className="flex-1 bg-black text-white py-3 text-[14px] flex items-center justify-center gap-1 hover:bg-gray-800 transition-all duration-300"
//   >
//     <FaBolt size={12} /> Buy Now
//   </button>
// </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {show && (
//         <ProductModals
//           onClose={() => setShow(false)}
//           category={category}
//           card={card}
//           setCard={setCard}
//         />
//       )}
//     </>
//   );
// };

// export default Our_Product;


import React, { useState } from "react";
import { HoverImageData } from "../JsonData/Home_Json";
import { FaEye, FaHeart, FaShareAlt, FaShoppingCart, FaBolt } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModals from "../Component/ProductModals";
import { useNavigate } from "react-router-dom";

const Our_Product = ({ card, setCard }) => {
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // 1. Product Detail Page par bhejne ke liye function
  const goToProductDetail = (id) => {
    navigate(`/product/${id}`); // Yeh aapko product detail page par le jayega
  };

  const addToCard = (id, price, title, image) => {
    setCard([...card, { id, price, title, image }]);
    toast.success("Added to cart successfully", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });
  };

  const buyNow = (id, price, title, image) => {
    const exists = card.find((item) => item.id === id);
    if (!exists) {
      setCard([...card, { id, price, title, image }]);
    }
    navigate("/cart"); 
  };

  const addModals = (id) => {
    const handle = HoverImageData.filter((item) => item.id === id);
    setCategory(handle);
    setShow(true);
  };

  return (
    <>
      <ToastContainer />

      <div className="w-full py-12 bg-[#f8f8f8]">
        <div className="text-center mb-12">
          <h1 className="text-3xl text-red-800 font-bold uppercase tracking-widest">
            OUR PRODUCTS
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-[1400px] mx-auto">
          {HoverImageData.map((item) => (
            <div
              key={item.id}
              className="bg-white group flex flex-col border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer"
              onClick={() => goToProductDetail(item.id)} // Poore card par click karne se detail page khulega
            >
              {/* IMAGE AREA */}
              <div className="relative h-72 bg-[#fdfdfd] flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-700 group-hover:scale-110"
                />

                {/* SIDE HOVER ICONS - e.stopPropagation() zaroori hai taaki sirf icon click ho, poora card nahi */}
                <div className="absolute top-4 right-[-50px] group-hover:right-4 transition-all duration-500 flex flex-col gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCard(item.id, item.price, item.title, item.image); }} 
                    className="p-3 bg-white shadow-md rounded-full hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <FaHeart size={14}/>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addModals(item.id); }} 
                    className="p-3 bg-white shadow-md rounded-full hover:bg-black hover:text-white transition-colors"
                  >
                    <FaEye size={14}/>
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="p-3 bg-white shadow-md rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <FaShareAlt size={14}/>
                  </button>
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="p-5 flex-grow">
                <p className="text-[12px] text-gray-400 mb-1 font-semibold uppercase">{item.category || "General"}</p>
                <h2 className="text-sm text-gray-800 font-bold uppercase truncate">
                  {item.title}
                </h2>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xl font-bold text-black">₹{item.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{parseInt(item.price) + 500}</span>
                </div>
              </div>

              {/* TWO BUTTONS AREA */}
              <div className="p-5 pt-0 flex flex-row gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); addToCard(item.id, item.price, item.title, item.image); }}
                  className="flex-1 bg-[#FFD200] text-black py-3 text-[12px] font-bold flex items-center justify-center gap-1 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <FaShoppingCart size={12} /> ADD
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); buyNow(item.id, item.price, item.title, item.image); }}
                  className="flex-1 bg-black text-white py-3 text-[12px] font-bold flex items-center justify-center gap-1 hover:bg-gray-800 transition-all duration-300"
                >
                  <FaBolt size={12} /> BUY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {show && (
        <ProductModals
          onClose={() => setShow(false)}
          category={category}
          card={card}
          setCard={setCard}
        />
      )}
    </>
  );
};

export default Our_Product;