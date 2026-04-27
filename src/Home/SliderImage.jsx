// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import slider1 from "../assets/Images/slider1.jpeg";
// import slider2 from "../assets/Images/slider2.jpeg";

// export default function ServiceHero() {
//   const slides = [slider1, slider2];
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const randomIndex = Math.floor(Math.random() * slides.length);
//     setIndex(randomIndex);
//   }, []);

//   const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
//   const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

//   return (
//     /* mt-0 aur p-0 ensure karega ki koi gap na aaye */
//     <section className="relative mt-0  w-full h-[50vh] md:h-[80vh] overflow-hidden bg-white m-0 p-0">
      
//       <div className="absolute inset-0">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={index}
//             src={slides[index]}
//             alt={`Slide ${index}`}
//             className="h-full w-full object-cover md:object-fill"
//             initial={{ x: 300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -300, opacity: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//           />
//         </AnimatePresence>
//       </div>

//       {/* ARROWS */}
//       <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-[#a52a2a] hover:text-white transition-colors">
//         <span className="text-xl md:text-2xl font-bold">&#10094;</span>
//       </button>

//       <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-[#a52a2a] hover:text-white transition-colors">
//         <span className="text-xl md:text-2xl font-bold">&#10095;</span>
//       </button>

//       {/* DOTS */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
//         {slides.map((_, i) => (
//           <button key={i} onClick={() => setIndex(i)} 
//             className={`transition-all duration-300 rounded-full shadow-sm ${index === i ? "w-10 h-2.5 bg-[#a52a2a]" : "w-2.5 h-2.5 bg-gray-300"}`}
//           />
//         ))}
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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * slides.length);
    setIndex(randomIndex);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative  w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden bg-gray-100 m-0 p-0">
      
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={slides[index]}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Overlay for better text visibility (optional) */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* ARROWS - Responsive */}
      <button 
        onClick={prevSlide} 
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-[#a52a2a] rounded-full shadow-lg flex items-center justify-center hover:text-white transition-all duration-300 backdrop-blur-sm"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-bold">&#10094;</span>
      </button>

      <button 
        onClick={nextSlide} 
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-[#a52a2a] rounded-full shadow-lg flex items-center justify-center hover:text-white transition-all duration-300 backdrop-blur-sm"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-bold">&#10095;</span>
      </button>

      {/* DOTS - Responsive */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)} 
            className={`transition-all duration-300 rounded-full shadow-sm ${
              index === i 
                ? "w-6 sm:w-8 md:w-10 h-1.5 sm:h-2 md:h-2.5 bg-[#a52a2a]" 
                : "w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-white/70 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </section>
  );
}