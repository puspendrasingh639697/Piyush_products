import React from "react";

const PolicyPage = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-6 sm:p-10 border border-gray-100">
        
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last Updated: <span className="font-semibold">{lastUpdated}</span>
            </p>
          )}
        </div>

        {/* Content Section */}
        <div className="prose prose-sm sm:prose max-w-none text-gray-600 leading-relaxed space-y-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default PolicyPage;