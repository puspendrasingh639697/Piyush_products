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

  const PRIMARY_COLOR = "#8B1E2D";
  const PRIMARY_DARK = "#6B1622";

  // ✅ ADDED 'casseroles' CATEGORY MAPPING
  const categoryMapping = {
    'triply-cookware': 'Triply cookware',
    'thermoware': 'Thermoware',
    'lunchbox': 'Lunchbox',
    'cookers': 'Cookers (Aluminum, Steel, Triply)',
    'cookware-sets': 'Cookware sets',
    'copper-utensils': 'Copper utensils',
    'steel-bottles': 'Steel bottles',
    'casseroles': 'Casseroles'  // ✅ ADDED
  };

  // ✅ ADDED 'casseroles' DISPLAY NAME
  const displayNameMap = {
    'triply-cookware': 'Triply Cookware',
    'thermoware': 'Thermoware',
    'lunchbox': 'Lunchbox',
    'cookers': 'Cookers',
    'cookware-sets': 'Cookware Sets',
    'copper-utensils': 'Copper Utensils',
    'steel-bottles': 'Steel Bottles',
    'casseroles': 'Casseroles'  // ✅ ADDED
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
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
      
      const actualCategory = categoryMapping[categoryId] || categoryId || '';
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

  const handleCategoryChange = (categoryIdValue) => {
    setSelectedCategories(prev => {
      let newSelected;
      if (prev.includes(categoryIdValue)) {
        newSelected = prev.filter(id => id !== categoryIdValue);
      } else {
        newSelected = [...prev, categoryIdValue];
      }
      
      if (newSelected.length === 1) {
        navigate(`/category/${newSelected[0]}`, { replace: true });
      } else if (newSelected.length > 1) {
        navigate(`/category/${newSelected[0]}`, { replace: true });
      } else {
        navigate('/products', { replace: true });
      }
      
      return newSelected;
    });
  };

  useEffect(() => {
    if (products.length > 0 && selectedCategories.length > 0) {
      const selectedActualCategories = selectedCategories.map(cat => categoryMapping[cat] || cat);
      const filtered = products.filter(product => 
        selectedActualCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
      
      if (filtered.length > 0 && selectedCategories.length === 1) {
        const actualCategory = categoryMapping[selectedCategories[0]] || selectedCategories[0];
        const related = products
          .filter(p => p.category === actualCategory && p._id !== filtered[0]?._id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        setRelatedProducts([]);
      }
    } else if (products.length > 0 && selectedCategories.length === 0) {
      setFilteredProducts([]);
      setRelatedProducts([]);
    }
  }, [selectedCategories, products]);

  const sidebarCategories = [
    { id: 'triply-cookware', name: 'Triply Cookware' },
    { id: 'thermoware', name: 'Thermoware' },
    { id: 'lunchbox', name: 'Lunchbox' },
    { id: 'cookers', name: 'Cookers' },
    { id: 'cookware-sets', name: 'Cookware Sets' },
    { id: 'copper-utensils', name: 'Copper Utensils' },
    { id: 'steel-bottles', name: 'Steel Bottles' },
    { id: 'casseroles', name: 'Casseroles' }  // ✅ ADDED
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="text-center">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-200 rounded-full animate-spin mx-auto mb-3 sm:mb-4"
            style={{ borderTopColor: PRIMARY_COLOR }}
          ></div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  const displayName = displayNameMap[categoryId] || categoryId?.replace(/-/g, ' ') || 'Products';
  const productCount = filteredProducts.length;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 p-3 sm:p-4 md:p-6 lg:p-8">
        
        <aside className="w-full md:w-[260px] lg:w-[300px] shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 sticky top-20 md:top-24">
            <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b" style={{ borderColor: PRIMARY_COLOR }}>
              <div className="w-1 h-4 sm:h-5 md:h-6 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: PRIMARY_COLOR }}>
                Shop by Category
              </h2>
            </div>
            
            <ul className="space-y-2 sm:space-y-3">
              {sidebarCategories.map((cat) => (
                <li key={cat.id}>
                  <label className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full cursor-pointer transition-all duration-200"
                      style={{ accentColor: PRIMARY_COLOR, borderRadius: '50%' }}
                    />
                    <span 
                      className={`text-xs sm:text-sm font-medium transition-all duration-200 ${
                        selectedCategories.includes(cat.id) 
                          ? 'font-semibold' 
                          : 'text-gray-600 group-hover:text-gray-900'
                      }`}
                      style={{ color: selectedCategories.includes(cat.id) ? PRIMARY_COLOR : undefined }}
                    >
                      {cat.name}
                    </span>
                    {selectedCategories.includes(cat.id) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></span>
                    )}
                  </label>
                </li>
              ))}
            </ul>

            {selectedCategories.length > 0 && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  navigate('/products', { replace: true });
                }}
                className="w-full mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors text-center"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase mb-1 sm:mb-2">Collection</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide" style={{ color: PRIMARY_COLOR }}>
                  {displayName}
                </h1>
                <div className="w-8 sm:w-10 md:w-12 h-0.5 mt-2 sm:mt-3 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>{productCount}</span>
                <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Products Found</span>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
                No products added in <span className="font-semibold">{displayName}</span> yet.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-white transition-all hover:shadow-lg text-sm sm:text-base"
                style={{ backgroundColor: PRIMARY_COLOR }}
                onMouseEnter={(e) => e.target.style.backgroundColor = PRIMARY_DARK}
                onMouseLeave={(e) => e.target.style.backgroundColor = PRIMARY_COLOR}
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product._id} 
                    onClick={() => goToProductDetail(product._id)}
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4 sm:p-5 md:p-6 transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => e.target.src = "https://via.placeholder.com/400"}
                      />
                      <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'}`}>
                        <button className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-white text-gray-900 rounded-lg font-medium text-xs sm:text-sm hover:shadow-lg transition-all" style={{ color: PRIMARY_COLOR }}>
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 md:p-5">
                      <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-1 sm:mb-2" style={{ color: PRIMARY_COLOR }}>
                        {product.category || "Premium"}
                      </p>
                      <h2 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.name}
                      </h2>
                      <div className="flex items-center justify-between mt-2 sm:mt-3">
                        <div>
                          <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-[10px] sm:text-xs text-gray-400 line-through ml-1 sm:ml-2">
                            ₹{Math.round(product.price * 1.3)}
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-green-600 font-semibold">Save 30%</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success(`${product.name} added to cart!`);
                        }}
                        className="w-full mt-3 sm:mt-4 py-1.5 sm:py-2 rounded-lg text-white text-xs sm:text-sm font-medium transition-all hover:shadow-lg"
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
              
              {relatedProducts.length > 1 && (
                <div className="mt-12 sm:mt-16">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-1 h-5 sm:h-6 md:h-8 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }}></div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">You May Also Like</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
                            className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => e.target.src = "https://via.placeholder.com/200"}
                          />
                        </div>
                        <div className="p-2 sm:p-3">
                          <h3 className="text-[10px] sm:text-xs font-medium text-gray-800 truncate">{product.name}</h3>
                          <p className="text-xs sm:text-sm font-bold mt-0.5 sm:mt-1" style={{ color: PRIMARY_COLOR }}>
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


