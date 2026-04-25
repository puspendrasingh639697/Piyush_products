import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

const AddToCartButton = ({ productId, name, price, image, quantity = 1 }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || !token) {
            alert('Please login to add items to cart');
            window.location.href = '/login';
            return;
        }

        setIsAdding(true);
        dispatch(addToCart({ userId: user._id, productId, quantity }))
            .unwrap()
            .then(() => {
                alert('Added to cart!');
            })
            .catch((error) => {
                alert('Failed to add to cart');
            })
            .finally(() => {
                setIsAdding(false);
            });
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
            <FaShoppingCart /> {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
    );
};

export default AddToCartButton;