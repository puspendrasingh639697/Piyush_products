import React, { useState } from "react";
import { FaLock, FaStar, FaShoppingCart, FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductModals = ({ onClose, category, card, setCard }) => {
  const [quantity, setQuantity] = useState(1);

  // Aapka exact add to cart function
  const handleAddToCart = (item) => {
    setCard([...card, { 
        id: item.id, 
        price: item.price, 
        title: item.title, 
        image: item.image, 
        quantity: quantity 
    }]);
    
    toast.success("Added to cart successfully", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!category || category.length === 0) return null;

  return (
    <></>
  );
};

export default ProductModals;