// components/About/AboutTitle.jsx
import React from 'react';

const AboutTitle = ({ title, description }) => {
  return (
    <div className="text-center py-16 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {title || "About Our Company"}
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto px-4">
        {description || "We are dedicated to providing the highest quality kitchenware products..."}
      </p>
    </div>
  );
};

export default AboutTitle;