import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Deals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await API.get("/products/all");
        let data = [];
        if (Array.isArray(response.data)) data = response.data;
        else if (response.data?.products) data = response.data.products;

        // Show products with discount or just show all (adjust as needed)
        const deals = data.filter(p => p.discount || p.originalPrice || p.salePrice).slice(0, 20);
        setProducts(deals.length > 0 ? deals : data.slice(0, 20));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-[#8B1E2D] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide uppercase mb-2">
          Hot Deals
        </h1>
        <p className="text-red-200 text-sm md:text-base mt-2">
          Limited time offers — Shop before they're gone!
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🏷️</p>
            <p className="text-xl font-medium">No deals available right now</p>
            <p className="text-sm mt-1">Check back soon for exciting offers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-[#8B1E2D] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#8B1E2D] font-bold text-sm">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;