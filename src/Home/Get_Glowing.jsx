import React from "react";

// Images paths from your local assets
import side40 from "../assets/Images/side40.webp";
import side41 from "../assets/Images/side41.webp";

const Get_Glowing = () => {
  return (
    <section className="w-full bg-white px-4 md:px-10 lg:px-20 ">
      
      {/* SECTION HEADING - Same as Maharani Style */}
      <div className="text-center mb-12">
        <h2 className="text-[#B33E3E] mt-4 font-bold tracking-widest text-lg  mb-2">
          LATEST POSTS
        </h2>
       
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT SECTION: Badi Vertical Image (Image 1) */}
        <div className="md:col-span-4 group cursor-pointer overflow-hidden relative">
          <div className="relative h-full overflow-hidden border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl">
            <img 
              src={side40} 
              alt="Main Product" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
          </div>
        </div>

        {/* RIGHT SECTION: Two Stacked Cards (Image 2 & 3) */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="flex flex-col group cursor-pointer">
            <div className="h-[250px] overflow-hidden border border-gray-100 shadow-sm relative">
              <img 
                src={side41} 
                alt="Recipe" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="py-6 border-b border-gray-100">
              <h3 className="text-md font-bold text-gray-800 uppercase tracking-wide mb-2 group-hover:text-[#B33E3E] transition-colors">
                Warm Recipes for <br /> Christmas Celebrations
              </h3>
              <p className="text-[10px] text-black font-bold mb-4">DEC 24, 2024</p>
              <p className="text-black text-sm leading-relaxed line-clamp-2">
                Summer-ready cookware crafted for effortless outdoor dining, quick meals, vibrant flavors, and durable performance—perfect for sunny gatherings and fresh seasonal cooking
              </p>
              
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col group cursor-pointer">
            <div className="h-[250px] overflow-hidden border border-gray-100 shadow-sm bg-[#f9f9f9]">
              <img 
                src={side40} // Using side40 again or any other placeholder
                alt="Tradition" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="py-6 border-b border-gray-100">
              <h3 className="text-md font-bold text-gray-800 uppercase tracking-wide mb-2 group-hover:text-[#B33E3E] transition-colors">
                Revisit Traditions - <br /> Cook in Iron Kadai
              </h3>
              <p className="text-[10px] text-black font-bold mb-4">DEC 05, 2024</p>
              <p className="text-black text-xs leading-relaxed line-clamp-2">
                Cooking in an iron kadai isn't just a culinary choice; it's a journey back to our roots...
              </p>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Get_Glowing;