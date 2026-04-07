import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryList } from "./categoryData"; 
import { allProducts } from "./productData";   

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryId?.includes("cooker")) {
      setOpenDropdown("cookers");
    }
  }, [categoryId]);

  const currentCategory = categoryList.find((item) => item.id === categoryId);

  // FIX: Agar main 'cookers' parent category pe hoon, toh saare types ke cookers dikhao
  const filteredProducts = allProducts.filter((product) => {
    if (categoryId === "cookers") {
      return product.category.includes("cooker");
    }
    return product.category === categoryId;
  });

  const handleToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  if (!currentCategory) return <div className="pt-40 text-center uppercase tracking-widest font-bold">Category Not Found!</div>;

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-10 p-4 md:p-10 pt-28">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-[280px] shrink-0 border-r border-gray-100 pr-8">
        <h2 className="text-[16px] font-black border-b-2 border-black pb-3 mb-8 tracking-[2px]">SHOP BY CATEGORY</h2>
        <ul className="flex flex-col gap-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          
          <li onClick={() => navigate('/category/triply-cookware')} className={`cursor-pointer hover:text-orange-600 ${categoryId === 'triply-cookware' ? 'text-orange-600' : ''}`}>Triply Cookware —</li>
          <li onClick={() => navigate('/category/kadhai')} className={`cursor-pointer hover:text-orange-600 ${categoryId === 'kadhai' ? 'text-orange-600' : ''}`}>Kadhai —</li>
          <li onClick={() => navigate('/category/thermoware')} className={`cursor-pointer hover:text-orange-600 ${categoryId === 'thermoware' ? 'text-orange-600' : ''}`}>Thermoware —</li>
          <li onClick={() => navigate('/category/casseroles')} className={`cursor-pointer hover:text-orange-600 ${categoryId === 'casseroles' ? 'text-orange-600' : ''}`}>Casseroles —</li>
          <li onClick={() => navigate('/category/lunchbox')} className={`cursor-pointer hover:text-orange-600 ${categoryId === 'lunchbox' ? 'text-orange-600' : ''}`}>Lunchbox —</li>

          <li className="relative">
            <div onClick={() => handleToggle("cookers")} className="flex justify-between items-center cursor-pointer hover:text-orange-600 uppercase">
              COOKERS <span>{openDropdown === "cookers" ? "−" : "+"}</span>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ${openDropdown === "cookers" ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
              <ul className="pl-4 flex flex-col gap-3 text-[10px] text-gray-400 normal-case border-l-2 border-gray-100 ml-1">
                <li onClick={() => navigate('/category/aluminum-cooker')} className="hover:text-orange-600 cursor-pointer">• Aluminum Cookers</li>
                <li onClick={() => navigate('/category/steel-cooker')} className="hover:text-orange-600 cursor-pointer">• Steel Cookers</li>
                <li onClick={() => navigate('/category/triply-cooker')} className="hover:text-orange-600 cursor-pointer">• Triply Cookers</li>
              </ul>
            </div>
          </li>

          <li onClick={() => navigate('/category/knives-set')} className={`cursor-pointer hover:text-orange-600 ${categoryId === 'knives-set' ? 'text-orange-600' : ''}`}>Knives Set —</li>
        </ul>
      </aside>

      {/* GRID */}
      <main className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-8">
          <div>
            <span className="text-[10px] text-gray-400 tracking-[3px] uppercase">Explore</span>
            <h1 className="text-4xl font-extralight uppercase tracking-[8px] mt-2">{currentCategory.name}</h1>
          </div>
          <span className="text-[10px] font-black text-gray-300 tracking-[2px] uppercase">Showing {filteredProducts.length} Results</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col items-center text-center">
              <div className="relative aspect-[4/5] w-full bg-[#fcfcfc] overflow-hidden border border-gray-50 mb-6 hover:shadow-xl transition-all duration-700">
                <img src={product.img} alt={product.name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <p className="text-[9px] text-orange-600 font-bold tracking-[2px] mb-2">{product.series}</p>
              <h2 className="text-[13px] font-medium text-gray-800 uppercase tracking-wide">{product.name}</h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-lg font-black text-gray-900">₹{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;