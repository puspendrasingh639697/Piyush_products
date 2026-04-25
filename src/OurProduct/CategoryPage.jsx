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

  // ✅ Category name mapping (URL slug to actual category name)
const categoryMapping = {
  'triply-cookware': 'Triply cookware',
  'thermoware': 'Thermoware',
  'lunchbox': 'Lunchbox',
  'cookers': 'Cookers (Aluminum, Steel, Triply)',
  'cookware-sets': 'Cookware sets',
  'copper-utensils': 'Copper utensils',
  'steel bottles': 'Steel bottles'  // ✅ Ye line check karo
};
  // ✅ Reverse mapping for display names
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
      
      // Extract unique categories
      const uniqueCats = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCats);
      
      // ✅ Filter products by category using mapping
      const actualCategory = categoryMapping[categoryId] || '';
      const filtered = allProducts.filter(product => {
        return product.category === actualCategory;
      });
      
      setFilteredProducts(filtered);
      
      // Get related products (same category)
      if (filtered.length > 0) {
        const related = allProducts
          .filter(p => p.category === actualCategory)
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

  // ✅ Categories for sidebar
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
      <div className="pt-40 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  const displayName = displayNameMap[categoryId] || categoryId?.replace(/-/g, ' ') || 'Products';
  const productCount = filteredProducts.length;

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-10 pt-28">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-[280px] shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pr-8">
        <h2 className="text-[14px] md:text-[16px] font-black border-b-2 border-black pb-3 mb-6 tracking-[2px]">
          SHOP BY CATEGORY
        </h2>
        <ul className="flex flex-row md:flex-col gap-4 md:gap-5 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          {sidebarCategories.map((cat) => (
            <li 
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)} 
              className={`cursor-pointer whitespace-nowrap hover:text-orange-600 transition-all ${
                categoryId === cat.id ? 'text-orange-600 font-black' : ''
              }`}
            >
              {cat.name} —
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN GRID */}
      <main className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b pb-8">
          <div>
            <span className="text-[10px] text-gray-400 tracking-[3px] uppercase">Collection</span>
            <h1 className="text-3xl md:text-4xl font-extralight uppercase tracking-[4px] md:tracking-[8px] mt-2">
              {displayName}
            </h1>
          </div>
          <span className="text-[10px] font-black text-gray-300 tracking-[2px] uppercase mt-4 md:mt-0">
            {productCount} Products Found
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 tracking-widest border-2 border-dashed">
            NO PRODUCTS ADDED IN {displayName.toUpperCase()} YET.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-10 gap-y-10 md:gap-y-16">
              {filteredProducts.map((product) => (
                <div 
                  key={product._id} 
                  onClick={() => goToProductDetail(product._id)}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="relative aspect-[4/5] w-full bg-[#fcfcfc] overflow-hidden border border-gray-50 mb-4 hover:shadow-lg transition-all">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => e.target.src = "https://via.placeholder.com/300"}
                    />
                  </div>
                  <p className="text-[8px] md:text-[9px] text-orange-600 font-bold tracking-[2px] mb-1">
                    {product.category || "Premium"}
                  </p>
                  <h2 className="text-[11px] md:text-[13px] font-medium text-gray-800 uppercase tracking-wide group-hover:text-orange-600">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-md md:text-lg font-black text-gray-900">₹{product.price}</p>
                </div>
              ))}
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && filteredProducts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map((product) => (
                    <div 
                      key={product._id}
                      onClick={() => goToProductDetail(product._id)}
                      className="group cursor-pointer text-center"
                    >
                      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => e.target.src = "https://via.placeholder.com/200"}
                        />
                      </div>
                      <h3 className="text-xs font-medium text-gray-800 truncate">{product.name}</h3>
                      <p className="text-red-600 font-bold text-sm mt-1">₹{product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;