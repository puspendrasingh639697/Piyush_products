import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full p-3 pl-10 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                        Clear
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;