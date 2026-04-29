// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import slider1 from "../assets/Images/slider1.jpeg";
// import slider2 from "../assets/Images/slider2.jpeg";

// export default function ServiceHero() {
//   const slides = [slider1, slider2];
//   const [index, setIndex] = useState(0);

//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <section className="w-full m-0 p-0">

//       <div className="relative w-full overflow-hidden
//         h-[200px]
//         sm:h-[300px]
//         md:h-[450px]
//         lg:h-[600px]
//         xl:h-[700px]"
//       >

//         {/* IMAGE */}
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={index}
//             src={slides[index]}
//             alt="slider"
//             className="w-full h-full object-cover object-center block"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//           />
//         </AnimatePresence>

//         {/* LEFT BUTTON */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30
//           w-8 h-8 sm:w-10 sm:h-10
//           bg-white/80 hover:bg-[#a52a2a] hover:text-white
//           rounded-full flex items-center justify-center transition"
//         >
//           ❮
//         </button>

//         {/* RIGHT BUTTON */}
//         <button
//           onClick={nextSlide}
//           className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30
//           w-8 h-8 sm:w-10 sm:h-10
//           bg-white/80 hover:bg-[#a52a2a] hover:text-white
//           rounded-full flex items-center justify-center transition"
//         >
//           ❯
//         </button>

//         {/* DOTS */}
//         <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`rounded-full transition-all duration-300 ${
//                 index === i
//                   ? "w-6 h-2 bg-[#a52a2a]"
//                   : "w-2 h-2 bg-white/80"
//               }`}
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import slider1 from "../assets/Images/slider1.jpeg";
import slider2 from "../assets/Images/slider2.jpeg";

export default function ServiceHero() {
  const slides = [slider1, slider2];
  const [index, setIndex] = useState(0);

  // ✅ Auto Slide - Har 3 second mein slide change hogi
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 second mein change

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="w-full m-0 p-0">
      <div className="relative w-full overflow-hidden
        h-[200px] sm:h-[300px] md:h-[450px] lg:h-[600px] xl:h-[700px]"
      >
        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={slides[index]}
            alt="slider"
            className="w-full h-full object-cover object-center block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Left Button - Ab bhi kaam karega agar click karega */}
        <button
          onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30
          w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-red-800 hover:text-white
          rounded-full flex items-center justify-center transition text-lg font-bold"
        >
          ❮
        </button>

        {/* Right Button - Ab bhi kaam karega agar click karega */}
        <button
          onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30
          w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-red-800 hover:text-white
          rounded-full flex items-center justify-center transition text-lg font-bold"
        >
          ❯
        </button>

        {/* Dots - Click karne par bhi kaam karega */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                index === i
                  ? "w-6 h-2 bg-red-800"
                  : "w-2 h-2 bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}