import React from "react";
import portcard from "../assets/Images/portcard.jpeg";
import portcard1 from "../assets/Images/portcard1.jpeg";

const PortfolioCard = () => {
  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-10">
      
     

      {/* Two Images - Left and Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Image */}
        <div className=" overflow-hidden">
          <img 
            src={portcard} 
            alt="Kitchen Collection Left"
            className="w-full h-full object-cover transition-transform "
          />
        </div>

        {/* Right Image */}
        <div className=" overflow-hidden shadow-lg">
          <img 
            src={portcard1} 
            alt="Kitchen Collection Right"
            className="w-full h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;