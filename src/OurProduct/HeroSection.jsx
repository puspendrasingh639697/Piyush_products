import React from "react";
// Aapki kitchen background image
import kitchenBg from "../assets/Images/side41.webp"; 

const HeroSection = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">

      {/* 1. Background Image - Isko fixed rakha hai layout ke liye */}
      <img
        src={kitchenBg} 
        alt="Kitchen Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Overlay - Isse heading saaf dikhegi */}

      

    </section>
  );
};

export default HeroSection;