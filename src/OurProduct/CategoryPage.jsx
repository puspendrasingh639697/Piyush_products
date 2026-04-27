// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../utils/api";
// import { toast } from "react-toastify";

// const CategoryPage = () => {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   // ✅ Category name mapping (URL slug to actual category name)
// const categoryMapping = {
//   'triply-cookware': 'Triply cookware',
//   'thermoware': 'Thermoware',
//   'lunchbox': 'Lunchbox',
//   'cookers': 'Cookers (Aluminum, Steel, Triply)',
//   'cookware-sets': 'Cookware sets',
//   'copper-utensils': 'Copper utensils',
//   'steel bottles': 'Steel bottles'  // ✅ Ye line check karo
// };
//   // ✅ Reverse mapping for display names
//   const displayNameMap = {
//     'triply-cookware': 'Triply Cookware',
//     'thermoware': 'Thermoware',
//     'lunchbox': 'Lunchbox',
//     'cookers': 'Cookers',
//     'cookware-sets': 'Cookware Sets',
//     'copper-utensils': 'Copper Utensils',
//     'steel-bottles': 'Steel Bottles'
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     fetchProducts();
//   }, [categoryId]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await API.get('/products/all');
//       let allProducts = [];
//       if (Array.isArray(response.data)) {
//         allProducts = response.data;
//       } else if (response.data?.products) {
//         allProducts = response.data.products;
//       }
      
//       setProducts(allProducts);
      
//       // Extract unique categories
//       const uniqueCats = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
//       setCategories(uniqueCats);
      
//       // ✅ Filter products by category using mapping
//       const actualCategory = categoryMapping[categoryId] || '';
//       const filtered = allProducts.filter(product => {
//         return product.category === actualCategory;
//       });
      
//       setFilteredProducts(filtered);
      
//       // Get related products (same category)
//       if (filtered.length > 0) {
//         const related = allProducts
//           .filter(p => p.category === actualCategory)
//           .slice(0, 4);
//         setRelatedProducts(related);
//       }
      
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToProductDetail = (id) => {
//     navigate(`/product/${id}`);
//   };

//   // ✅ Categories for sidebar
//   const sidebarCategories = [
//     { id: 'triply-cookware', name: 'Triply Cookware' },
//     { id: 'thermoware', name: 'Thermoware' },
//     { id: 'lunchbox', name: 'Lunchbox' },
//     { id: 'cookers', name: 'Cookers' },
//     { id: 'cookware-sets', name: 'Cookware Sets' },
//     { id: 'copper-utensils', name: 'Copper Utensils' },
//     { id: 'steel-bottles', name: 'Steel Bottles' }
//   ];

//   if (loading) {
//     return (
//       <div className="pt-40 text-center">
//         <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
//         <p className="text-gray-600">Loading products...</p>
//       </div>
//     );
//   }

//   const displayName = displayNameMap[categoryId] || categoryId?.replace(/-/g, ' ') || 'Products';
//   const productCount = filteredProducts.length;

//   return (
//     <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-10 pt-28">
      
//       {/* SIDEBAR */}
//       <aside className="w-full md:w-[280px] shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pr-8">
//         <h2 className="text-[14px] md:text-[16px] font-black border-b-2 border-black pb-3 mb-6 tracking-[2px]">
//           SHOP BY CATEGORY
//         </h2>
//         <ul className="flex flex-row md:flex-col gap-4 md:gap-5 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
//           {sidebarCategories.map((cat) => (
//             <li 
//               key={cat.id}
//               onClick={() => navigate(`/category/${cat.id}`)} 
//               className={`cursor-pointer whitespace-nowrap hover:text-orange-600 transition-all ${
//                 categoryId === cat.id ? 'text-orange-600 font-black' : ''
//               }`}
//             >
//               {cat.name} —
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* MAIN GRID */}
//       <main className="flex-1">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b pb-8">
//           <div>
//             <span className="text-[10px] text-gray-400 tracking-[3px] uppercase">Collection</span>
//             <h1 className="text-3xl md:text-4xl font-extralight uppercase tracking-[4px] md:tracking-[8px] mt-2">
//               {displayName}
//             </h1>
//           </div>
//           <span className="text-[10px] font-black text-gray-300 tracking-[2px] uppercase mt-4 md:mt-0">
//             {productCount} Products Found
//           </span>
//         </div>

//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-20 text-gray-400 tracking-widest border-2 border-dashed">
//             NO PRODUCTS ADDED IN {displayName.toUpperCase()} YET.
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-10 gap-y-10 md:gap-y-16">
//               {filteredProducts.map((product) => (
//                 <div 
//                   key={product._id} 
//                   onClick={() => goToProductDetail(product._id)}
//                   className="group flex flex-col items-center text-center cursor-pointer"
//                 >
//                   <div className="relative aspect-[4/5] w-full bg-[#fcfcfc] overflow-hidden border border-gray-50 mb-4 hover:shadow-lg transition-all">
//                     <img 
//                       src={product.image} 
//                       alt={product.name} 
//                       className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
//                       onError={(e) => e.target.src = "https://via.placeholder.com/300"}
//                     />
//                   </div>
//                   <p className="text-[8px] md:text-[9px] text-orange-600 font-bold tracking-[2px] mb-1">
//                     {product.category || "Premium"}
//                   </p>
//                   <h2 className="text-[11px] md:text-[13px] font-medium text-gray-800 uppercase tracking-wide group-hover:text-orange-600">
//                     {product.name}
//                   </h2>
//                   <p className="mt-2 text-md md:text-lg font-black text-gray-900">₹{product.price}</p>
//                 </div>
//               ))}
//             </div>
            
//             {/* Related Products */}
//             {relatedProducts.length > 0 && filteredProducts.length > 0 && (
//               <div className="mt-16 pt-8 border-t border-gray-200">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">You May Also Like</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {relatedProducts.map((product) => (
//                     <div 
//                       key={product._id}
//                       onClick={() => goToProductDetail(product._id)}
//                       className="group cursor-pointer text-center"
//                     >
//                       <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
//                         <img 
//                           src={product.image} 
//                           alt={product.name}
//                           className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
//                           onError={(e) => e.target.src = "https://via.placeholder.com/200"}
//                         />
//                       </div>
//                       <h3 className="text-xs font-medium text-gray-800 truncate">{product.name}</h3>
//                       <p className="text-red-600 font-bold text-sm mt-1">₹{product.price}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CategoryPage;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Primary Color
  const PRIMARY_COLOR = "#8B1E2D";
  const PRIMARY_DARK = "#6B1622";
  const PRIMARY_LIGHT = "#A52A3E";

  // Category name mapping (URL slug to actual category name)
  const categoryMapping = {
    'triply-cookware': 'Triply cookware',
    'thermoware': 'Thermoware',
    'lunchbox': 'Lunchbox',
    'cookers': 'Cookers (Aluminum, Steel, Triply)',
    'cookware-sets': 'Cookware sets',
    'copper-utensils': 'Copper utensils',
    'steel-bottles': 'Steel bottles'
  };

  // Display names mapping
  const displayNameMap = {
    'triply-cookware': 'Triply Cookware',
    'thermoware': 'Thermoware',
    'lunchbox': 'Lunchbox',
    'cookers': 'Cookers',
    'cookware-sets': 'Cookware Sets',
    'copper-utensils': 'Copper Utensils',
    'steel-bottles': 'Steel Bottles'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    // Initialize selected category from URL
    if (categoryId) {
      setSelectedCategories([categoryId]);
    }
  }, [categoryId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await API.get('/products/all');
      let allProducts = [];
      if (Array.isArray(response.data)) {
        allProducts = response.data;
      } else if (response.data?.products) {
        allProducts = response.data.products;
      }
      
      setProducts(allProducts);
      
      const uniqueCats = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCats);
      
      const actualCategory = categoryMapping[categoryId] || '';
      const filtered = allProducts.filter(product => product.category === actualCategory);
      
      setFilteredProducts(filtered);
      
      if (filtered.length > 0) {
        const related = allProducts
          .filter(p => p.category === actualCategory && p._id !== filtered[0]?._id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const goToProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  // Handle category checkbox change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Categories for sidebar
  const sidebarCategories = [
    { id: 'triply-cookware', name: 'Triply Cookware' },
    { id: 'thermoware', name: 'Thermoware' },
    { id: 'lunchbox', name: 'Lunchbox' },
    { id: 'cookers', name: 'Cookers' },
    { id: 'cookware-sets', name: 'Cookware Sets' },
    { id: 'copper-utensils', name: 'Copper Utensils' },
    { id: 'steel-bottles', name: 'Steel Bottles' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <div 
            className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin mx-auto mb-4"
            style={{ borderTopColor: PRIMARY_COLOR }}
          ></div>
          <p className="text-gray-600 font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  const displayName = displayNameMap[categoryId] || categoryId?.replace(/-/g, ' ') || 'Products';
  const productCount = filteredProducts.length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-8">
        
        {/* SIDEBAR - With Circular Checkboxes */}
        <aside className="w-full md:w-[280px] lg:w-[320px] shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b" style={{ borderColor: PRIMARY_COLOR }}>
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: PRIMARY_COLOR }}>
                Shop by Category
              </h2>
            </div>
            
            <ul className="space-y-3">
              {sidebarCategories.map((cat) => (
                <li key={cat.id}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    {/* Circular Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="w-4 h-4 rounded-full cursor-pointer transition-all duration-200"
                      style={{
                        accentColor: PRIMARY_COLOR,
                        borderRadius: '50%'
                      }}
                    />
                    <span 
                      className={`text-sm font-medium transition-all duration-200 ${
                        selectedCategories.includes(cat.id) 
                          ? 'font-semibold' 
                          : 'text-gray-600 group-hover:text-gray-900'
                      }`}
                      style={{
                        color: selectedCategories.includes(cat.id) ? PRIMARY_COLOR : undefined
                      }}
                    >
                      {cat.name}
                    </span>
                    {selectedCategories.includes(cat.id) && (
                      <span 
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                      ></span>
                    )}
                  </label>
                </li>
              ))}
            </ul>

            {/* Clear All Button */}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="w-full mt-6 pt-4 border-t border-gray-100 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors text-center"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* MAIN GRID */}
        <main className="flex-1">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-xs text-gray-400 tracking-wider uppercase mb-2">Collection</p>
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide"
                  style={{ color: PRIMARY_COLOR }}
                >
                  {displayName}
                </h1>
                <div 
                  className="w-12 h-0.5 mt-3 rounded-full"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                ></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
                  {productCount}
                </span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Products Found
                </span>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-6">No products added in {displayName} yet.</p>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-2 rounded-lg text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: PRIMARY_COLOR }}
                onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <>
              {/* Products Grid - Modern Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product._id} 
                    onClick={() => goToProductDetail(product._id)}
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => e.target.src = "https://via.placeholder.com/400"}
                      />
                      
                      {/* Quick View Overlay */}
                      <div 
                        className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                          hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <button 
                          className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm hover:shadow-lg transition-all"
                          style={{ color: PRIMARY_COLOR }}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <p 
                        className="text-[10px] font-bold uppercase tracking-wider mb-2"
                        style={{ color: PRIMARY_COLOR }}
                      >
                        {product.category || "Premium"}
                      </p>
                      <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                        {product.name}
                      </h2>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-xs text-gray-400 line-through ml-2">
                            ₹{Math.round(product.price * 1.3)}
                          </span>
                        </div>
                        <span className="text-xs text-green-600 font-semibold">Save 30%</span>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success(`${product.name} added to cart!`);
                        }}
                        className="w-full mt-4 py-2 rounded-lg text-white text-sm font-medium transition-all hover:shadow-lg"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                        onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Related Products Section */}
              {relatedProducts.length > 1 && (
                <div className="mt-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div 
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    ></div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      You May Also Like
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map((product) => (
                      <div 
                        key={product._id}
                        onClick={() => goToProductDetail(product._id)}
                        className="group cursor-pointer bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="aspect-square bg-gray-50 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => e.target.src = "https://via.placeholder.com/200"}
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="text-xs font-medium text-gray-800 truncate">{product.name}</h3>
                          <p className="text-sm font-bold mt-1" style={{ color: PRIMARY_COLOR }}>
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;