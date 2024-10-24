// src/Components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useCart } from "../Context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart(); // Use the Cart Context
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false); // Track if item is added
  const [quantity, setQuantity] = useState(0); // Track quantity

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item is already in the cart, update its quantity
      updateQuantity(product.id, existingItem.quantity + 1);
      setQuantity(existingItem.quantity + 1);
    } else {
      // If it's a new item, add it to the cart
      addToCart(product);
      setQuantity(1);
      setIsAdded(true);
    }
  };

  useEffect(() => {
    // Check if the product is already in the cart when component mounts
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setIsAdded(true);
      setQuantity(existingItem.quantity);
    }
  }, [cartItems, product.id]); // Re-run effect if cartItems change

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-72 transform hover:-translate-y-3 hover:scale-105">
      {/* Image Section */}
      <div className="relative h-56 flex items-center justify-center overflow-hidden rounded-t-xl bg-gray-900">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <FiLoader className="text-white text-4xl animate-spin" />
          </div>
        )}
        <img
          src={product.images?.[0]}
          alt={product.title || "Product"}
          className={`max-h-full max-w-full object-cover p-4 transition-transform duration-300 transform hover:scale-110 ${
            isImageLoading ? "hidden" : "block"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
          <p className="text-white font-semibold text-lg truncate">
            {product.title || "Untitled Product"}
          </p>
          <span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            ⭐{product.rating?.toFixed(1) || "N/A"}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-lg font-semibold mt-2 text-purple-400">
          ${product.price?.toFixed(2) || "0.00"}
        </p>
        <p className="text-gray-300 text-sm mt-1">
          {product.description?.length > 50
            ? `${product.description.slice(0, 50)}...`
            : product.description || "No description available."}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Link to={`/products/${product.id}`} className="w-full">
            <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg hover:bg-gradient-to-br hover:from-purple-700 hover:to-pink-600 transition duration-300">
              <FaEye className="text-lg" />
              View Details
            </button>
          </Link>

          {isAdded ? (
            <button className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-lg shadow-md transition duration-300">
              <span className="font-semibold">Added: {quantity}</span>
              <button
                onClick={handleAddToCart} // Re-add the item to the cart
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
              >
                <FaCartPlus className="text-sm" />
              </button>
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 transition duration-300"
            >
              <FaCartPlus className="text-lg" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
