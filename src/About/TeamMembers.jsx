// import React, { useState, useEffect } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { FaStar } from "react-icons/fa";

// const TeamMembers = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const reviews = [
//     { id: 1, title: "Awesome...", author: "Rahul Gupta", text: "The quality is outstanding! These kitchen tools make cooking so enjoyable. Durable and stylish.", status: "Active Now" },
//     { id: 2, title: "Great Value...", author: "Komal Rajput", text: "Absolutely love this kitchenware! Beautiful design and excellent functionality. Transformed my kitchen.", status: "Online" },
//     { id: 3, title: "Highly Satisfied...", author: "Prabhat Jha", text: "I'm so impressed! These utensils are a game-changer. Sturdy and visually stunning. Highly satisfied!", status: "Active 2m ago" },
//     { id: 4, title: "Premium Quality", author: "Anjali Sharma", text: "Best purchase ever! The finish is top-notch and it looks very expensive. Definitely worth the money.", status: "Online" },
//     { id: 5, title: "Very Durable", author: "Vikram Singh", text: "Using it for 3 months now, no scratches or damage. The build quality is very solid for daily use.", status: "Active Now" },
//     { id: 6, title: "Fast Delivery", author: "Suresh Raina", text: "Not just the product, but the service is also great. Received it within 2 days in perfect condition.", status: "Online" },
//   ];

//   // Auto-slide logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
//     }, 6000);
//     return () => clearInterval(interval);
//   }, [reviews.length]);

//   return (
//     <div className="w-full bg-white px-4 relative">
//       <div className="max-w-7xl mx-auto">
        
//         {/* --- Header --- */}
//         <div className="text-center mt-8 mb-20">
//           <h2 className="text-red-800 font-extrabold  text-lg">
//             TOP REVIEWS
//           </h2>
          
//         </div>

//         {/* --- Review Grid --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {reviews.slice(activeIndex * 3, activeIndex * 3 + 3).map((rev) => (
//             <div 
//               key={rev.id} 
//               className="bg-gray-50 p-10  relative hover:shadow-xl transition-all duration-500 group"
//             >
//               {/* YELLOW QUOTE SVG */}
//               <div className="absolute top-6 right-8 text-yellow-400 opacity-100 group-hover:opacity-100 transition-opacity">
//                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H12.017V4H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H3.01697C2.46468 8 2.01697 8.44772 2.01697 9V12C2.01697 12.5523 1.56925 13 1.01697 13H0.0169678V4H10.017V15C10.017 18.3137 7.33065 21 4.01697 21H2.01697Z" />
//                 </svg>
//               </div>

//               {/* STARS */}
//               <div className="flex gap-1 mb-5">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar key={i} className="text-yellow-400" size={14} />
//                 ))}
//               </div>

//               <h3 className="text-lg font-bold text-black mb-3  tracking-tight">
//                 {rev.title}
//               </h3>

//               <p className="text-black text-lg  mb-10 min-h-[60px]">
//                 "{rev.text}"
//               </p>

//               {/* USER ACTIVE DETAILS */}
//               <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
//                     {rev.author.charAt(0)}
//                   </div>
//                   {/* Active Green Dot */}
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
//                 </div>
//                 <div className="text-left">
//                   <h4 className="text-sm font-bold text-gray-900 leading-none">{rev.author}</h4>
//                   <span className="text-[10px] text-yellow-600 font-medium">{rev.status}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* --- Pagination --- */}
//         <div className="flex justify-center gap-2 mt-16">
//           {[...Array(Math.ceil(reviews.length / 3))].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveIndex(i)}
//               className={`h-1.5 transition-all duration-500 rounded-full ${
//                 activeIndex === i ? "w-10 bg-red-700" : "w-3 bg-red-700"
//               }`}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TeamMembers;


import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const TeamMembers = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const PRIMARY = "#8B1E2D";

  const reviews = [
    { id: 1, title: "Awesome...", author: "Rahul Gupta", text: "The quality is outstanding! These kitchen tools make cooking so enjoyable. Durable and stylish.", status: "Active Now" },
    { id: 2, title: "Great Value...", author: "Komal Rajput", text: "Absolutely love this kitchenware! Beautiful design and excellent functionality. Transformed my kitchen.", status: "Online" },
    { id: 3, title: "Highly Satisfied...", author: "Prabhat Jha", text: "I'm so impressed! These utensils are a game-changer. Sturdy and visually stunning. Highly satisfied!", status: "Active 2m ago" },
    { id: 4, title: "Premium Quality", author: "Anjali Sharma", text: "Best purchase ever! The finish is top-notch and it looks very expensive. Definitely worth the money.", status: "Online" },
    { id: 5, title: "Very Durable", author: "Vikram Singh", text: "Using it for 3 months now, no scratches or damage. The build quality is very solid for daily use.", status: "Active Now" },
    { id: 6, title: "Fast Delivery", author: "Suresh Raina", text: "Not just the product, but the service is also great. Received it within 2 days in perfect condition.", status: "Online" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="w-full bg-white px-4 relative">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mt-8 mb-20">
          <h2 className="font-extrabold text-lg" style={{ color: PRIMARY }}>
            TOP REVIEWS
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {reviews.slice(activeIndex * 3, activeIndex * 3 + 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-gray-50 p-10 relative hover:shadow-xl transition-all duration-500 group"
            >

              {/* QUOTE ICON (NO YELLOW - now PRIMARY) */}
              <div className="absolute top-6 right-8 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: PRIMARY }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H12.017V4H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H3.01697C2.46468 8 2.01697 8.44772 2.01697 9V12C2.01697 12.5523 1.56925 13 1.01697 13H0.0169678V4H10.017V15C10.017 18.3137 7.33065 21 4.01697 21H2.01697Z" />
                </svg>
              </div>

              {/* STARS (same, but theme color optional if needed) */}
              <div className="flex gap-1 mb-5" style={{ color: PRIMARY }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              <h3 className="text-lg font-bold text-black mb-3 tracking-tight">
                {rev.title}
              </h3>

              <p className="text-black text-lg mb-10 min-h-[60px]">
                "{rev.text}"
              </p>

              {/* USER INFO */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">

                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase"
                    style={{ background: PRIMARY }}
                  >
                    {rev.author.charAt(0)}
                  </div>

                  {/* status dot (PRIMARY instead of yellow/red mix) */}
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full"
                    style={{ background: PRIMARY }}
                  />
                </div>

                <div className="text-left">
                  <h4 className="text-sm font-bold text-gray-900 leading-none">
                    {rev.author}
                  </h4>

                  {/* STATUS now PRIMARY */}
                  <span className="text-[10px] font-medium" style={{ color: PRIMARY }}>
                    {rev.status}
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-16">
          {[...Array(Math.ceil(reviews.length / 3))].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i ? "w-10" : "w-3"
              }`}
              style={{ background: PRIMARY }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeamMembers;