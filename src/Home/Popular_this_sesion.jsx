import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categoryList } from "../OurProduct/categoryData";
 

const This_Season = () => {
  return (
    <section className="w-full bg-white py-10 overflow-hidden">
      <div className="flex overflow-hidden relative">
        <motion.div 
          className="flex gap-10 py-5"
          animate={{ x: [0, -6000] }} // 43 items hain toh distance bada diya
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        >
          {/* Double map for infinite effect */}
          {[...categoryList, ...categoryList].map((item, i) => (
            <Link 
              to={`/category/${item.id}`} 
              key={i} 
              className="flex flex-col items-center min-w-[150px]"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full transition-transform">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="mt-4 text-center text-sm font-medium">{item.name}</h3>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default This_Season;