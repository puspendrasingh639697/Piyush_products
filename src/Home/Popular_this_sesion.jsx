// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import API from "../utils/api";

// const This_Season = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await API.get('/products/all');
//       let allProducts = [];
//       if (Array.isArray(response.data)) {
//         allProducts = response.data;
//       } else if (response.data?.products) {
//         allProducts = response.data.products;
//       }
      
//       // Unique categories from API
//       const uniqueCategoryNames = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
      
//       // Create category list with slug
//       const categoryList = uniqueCategoryNames.map(catName => ({
//         id: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
//         name: catName,
//         img: allProducts.find(p => p.category === catName)?.image || "https://via.placeholder.com/150",
//       }));
      
//       setCategories(categoryList);
//     } catch (err) {
//       console.error("Failed to fetch categories:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="w-full bg-white py-10 overflow-hidden">
//         <div className="flex justify-center items-center h-40">
//           <div className="w-10 h-10 border-4 border-[#8B1E2D] border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       </section>
//     );
//   }

//   if (categories.length === 0) {
//     return null;
//   }

//   return (
//     <section className="w-full bg-white py-10 overflow-hidden">
//       <div className="flex overflow-hidden relative">
//         <motion.div 
//           className="flex gap-10 py-5"
//           animate={{ x: [0, -6000] }}
//           transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
//         >
//           {/* Double map for infinite effect */}
//           {[...categories, ...categories].map((item, i) => (
//             <Link 
//               to={`/category/${item.id}`} 
//               key={i} 
//               className="flex flex-col items-center min-w-[150px] group"
//             >
//               <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden  transition-transform duration-300 group-hover:scale-110">
//                 <img 
//                   src={item.img} 
//                   alt={item.name} 
//                   className="w-full h-full object-cover" 
//                   loading="lazy"
//                   onError={(e) => e.target.src = "https://via.placeholder.com/150"}
//                 />
//               </div>
//               <h3 className="mt-4 text-center text-sm font-medium text-gray-700 group-hover:text-[#8B1E2D] transition-colors">
//                 {item.name}
//               </h3>
//             </Link>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default This_Season;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";

const This_Season = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get('/products/all');
      let allProducts = [];
      if (Array.isArray(response.data)) {
        allProducts = response.data;
      } else if (response.data?.products) {
        allProducts = response.data.products;
      }
      
      // Unique categories from API
      const uniqueCategoryNames = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
      
      // Create category list with slug
      const categoryList = uniqueCategoryNames.map(catName => ({
        id: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: catName,
        img: allProducts.find(p => p.category === catName)?.image || "https://via.placeholder.com/150",
      }));
      
      setCategories(categoryList);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-10 overflow-hidden">
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-[#8B1E2D] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  // Calculate scroll distance dynamically
  const scrollDistance = categories.length * 160; // 160px per item (150px width + 10px gap)
  const scrollDuration = categories.length * 2; // 2 seconds per item

  return (
    <section className="w-full bg-white py-10 overflow-hidden">
      <div className="flex overflow-hidden relative">
        <motion.div 
          className="flex gap-8 md:gap-10 py-5"
          animate={{ x: [0, -scrollDistance] }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.max(30, scrollDuration), 
            ease: "linear" 
          }}
        >
          {/* Triple map for smoother infinite effect */}
          {[...categories, ...categories, ...categories].map((item, i) => (
            <Link 
              to={`/category/${item.id}`} 
              key={i} 
              className="flex flex-col items-center min-w-[130px] md:min-w-[150px] group"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110 shadow-md group-hover:shadow-xl">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                />
              </div>
              <h3 className="mt-3 md:mt-4 text-center text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#8B1E2D] transition-colors">
                {item.name}
              </h3>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default This_Season;