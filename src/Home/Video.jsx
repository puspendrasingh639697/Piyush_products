import React, { useState } from "react";
import side1 from "../assets/Images/side11.jpeg";
import side2 from "../assets/Images/side1.jpeg";
import side30 from "../assets/Images/side30.jpeg";
import side5 from "../assets/Images/side5.jpeg";
import side6 from "../assets/Images/side6.jpeg";
import side7 from "../assets/Images/side7.jpeg";
import side9 from "../assets/Images/side9.jpeg";
import side11 from "../assets/Images/side34.jpeg";

const Video = () => {
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);

  // ✅ 8 ITEMS
  const myCategories = [
    { title: "Lunch Box", image: side30, count: 12 },
    { title: "Casserole Set", image: side2, count: 11 },
    { title: "Kettles", image: side1, count: 4 },
    { title: "Pressure Cookers", image: side5, count: 4 },
    { title: "Cookware Set", image: side6, count: 8 },
    { title: "Copper Utensils", image: side7, count: 5 },
    { title: "Steel Bottles", image: side9, count: 7 },
    { title: "Flasks", image: side11, count: 3 },
  ];

  const addModals = (item) => {
    setCategory([item]);
    setShow(true);
  };

  return (
    <>
      <div className="w-full py-16 bg-white">

        {/* HEADING */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-800 tracking-wide">
            BROWSE OUR CATEGORIES
          </h1>
          <div className="w-16 h-1 bg-red-800 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-6 md:px-16">

          {myCategories.map((item, index) => (
            <div
              key={index}
              onClick={() => addModals(item)}
              className="group cursor-pointer bg-white  overflow-hidden 
transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="w-full h-[220px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* TEXT */}
              <div className="text-center py-4">
                <h3 className="text-gray-800 font-semibold uppercase text-sm tracking-wide">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-xs mt-1">
                  {item.count} PRODUCTS
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>

     

      
    </>
  );
};

export default Video;