import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai"; // Star icon
import { BsArrowLeft } from "react-icons/bs"; // Back arrow
import { FiLoader } from "react-icons/fi"; // Loading spinner icon
import { useCart } from "../Context/CartContext"; // Import the Cart Context

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true); // State to track image loading
  const { addToCart, cartItems, updateCartQuantity } = useCart(); // Access addToCart and updateCartQuantity from Cart Context
  const [isAdded, setIsAdded] = useState(false); // State to track if the product is added
  const [quantity, setQuantity] = useState(1); // State for product quantity

  // Fetch product details
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // Check if the product is already in the cart
        const existingItem = cartItems.find((item) => item.id === data.id);
        if (existingItem) {
          setIsAdded(true);
          setQuantity(existingItem.quantity); // Set quantity to the existing one
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, cartItems]);

  const handleImageLoad = () => {
    setIsImageLoading(false); // Set loading to false when the image loads
  };

  const handleImageError = () => {
    setIsImageLoading(false); // Set loading to false if the image fails to load
  };

  const handleAddToCart = () => {
    if (isAdded) {
      updateCartQuantity(product.id, quantity); // Update quantity in cart if already added
    } else {
      addToCart({ ...product, quantity });
      setIsAdded(true); // Set the added state to true
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1); // Ensure quantity is at least 1
    setQuantity(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 via-black to-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-600 text-white p-6">
      <div className="max-w-5xl mx-auto py-16 px-4">
        {/* Back Button */}
        <Link to={"/"}>
          <button className="flex items-center gap-2 mb-8 text-purple-400 hover:text-pink-500 transition-all">
            <BsArrowLeft className="text-2xl" />
            <span>Back to Products</span>
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          {/* Product Image with Glow Effect */}
          <div className="relative flex-shrink-0">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <FiLoader className="text-white text-4xl animate-spin" />{" "}
                {/* Loading spinner */}
              </div>
            )}
            <img
              src={product.thumbnail}
              alt={product.title}
              className={`w-80 h-80 object-cover rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-purple-500/50 ${
                isImageLoading ? "hidden" : "block"
              }`} // Hide the image while loading
              onLoad={handleImageLoad} // Call when the image is fully loaded
              onError={handleImageError} // Call when the image fails to load
            />
            <div className="absolute top-2 left-2 bg-black/50 text-sm px-3 py-1 rounded-full">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full">
            <h1 className="text-4xl font-extrabold mb-4 text-purple-400 leading-tight">
              {product.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Pricing and Rating Section */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-3xl font-semibold text-green-400">
                ${product.price.toFixed(2)}
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <AiFillStar className="text-2xl" />
                <span className="text-xl">{product.rating.toFixed(1)}/5</span>
              </div>
            </div>

            {/* Return Policy */}
            <p className="text-gray-500 italic mb-8">
              🚚 Free shipping & easy returns within 30 days.
            </p>

            {/* Quantity Input */}
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-4 text-lg">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-16 text-center border rounded-md p-2 bg-gray-800 text-white"
              />
            </div>

            {/* Add to Cart / Update Quantity Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full text-xl font-bold shadow-md transition-all duration-300 ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-800 hover:to-pink-700"
              }`}
            >
              {isAdded ? "Update Cart Quantity ✅" : "Add to Cart 🛒"}
            </button>

            {/* Added Status Message */}
            {isAdded && (
              <div className="mt-4 text-green-400">
                Product added to cart! Quantity: {quantity}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
