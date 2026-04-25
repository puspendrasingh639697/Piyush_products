import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange, categories = [] }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;