import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../Components/ProductCard";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaStar } from "react-icons/fa"; // Star icon
import {
  GiClothes,
  GiSmartphone,
  GiHomeGarage,
  GiBookshelf,
  GiTShirt,
  GiPerfumeBottle,
  GiRunningShoe,
} from "react-icons/gi"; // Category icons

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchRating, setSearchRating] = useState(0); // Default rating is 0
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Set how many products to show per page
  const productsRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100") // Increased limit to 100
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Extract unique categories from products
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on search criteria
  const filteredProducts = products.filter((product) => {
    const matchesRating = product.rating >= searchRating; // Filter by selected rating
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    const matchesQuery =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRating && matchesCategory && matchesQuery;
  });

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSearchChange = (e) => {
    e.preventDefault(); // Prevent form submission if using a form
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search query changes
  };

  const handleRatingClick = (rating) => {
    setSearchRating(rating); // Update selected rating
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542327897-0c3ab448c4f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent"></div>

        <h1 className="text-6xl font-extrabold z-10 mb-4 text-center animate-fade-in">
          Welcome to <span className="text-purple-500">Shopping Mania</span>!
        </h1>
        <p className="text-lg text-gray-300 z-10 mb-6 text-center">
          Discover the latest trends and exclusive deals.
        </p>

        {/* Scroll Button */}
        <button
          onClick={scrollToProducts}
          className="z-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-12 rounded-full text-lg shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
        >
          Explore Products
        </button>

        <div className="absolute bottom-10 animate-bounce">
          <AiOutlineArrowDown className="text-white text-3xl" />
        </div>
      </div>

      {/* Search Section */}
      <div className="py-4 bg-gray-900 text-gray-100 px-6 sm:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row md:justify-between mb-4 items-center">
          {/* Search by Name */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by product title"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md hover:shadow-lg"
            />
            <span className="absolute right-3 top-2 text-gray-400">🔍</span>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center mt-4 md:mt-0 md:ml-4">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer transition-transform duration-300 ${
                  index < searchRating
                    ? "text-yellow-400 transform scale-125"
                    : "text-gray-600"
                } hover:text-yellow-500`}
                onClick={() => handleRatingClick(index + 1)}
                size={30} // Set the size of the stars
              />
            ))}
          </div>

          {/* Category Dropdown with Icons */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-4 md:mt-0 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => {
              let icon;
              switch (category) {
                case "Clothing":
                  icon = <GiClothes className="inline-block mr-2" />;
                  break;
                case "Electronics":
                  icon = <GiSmartphone className="inline-block mr-2" />;
                  break;
                case "Home":
                  icon = <GiHomeGarage className="inline-block mr-2" />;
                  break;
                case "Books":
                  icon = <GiBookshelf className="inline-block mr-2" />;
                  break;
                case "T-shirts":
                  icon = <GiTShirt className="inline-block mr-2" />;
                  break;
                case "Fragrance":
                  icon = <GiPerfumeBottle className="inline-block mr-2" />;
                  break;
                case "Shoes":
                  icon = <GiRunningShoe className="inline-block mr-2" />;
                  break;
                default:
                  icon = null;
              }

              return (
                <option
                  key={category}
                  value={category}
                  className="flex items-center"
                >
                  {icon}
                  {category}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Products Section */}
      <div
        id="products"
        ref={productsRef}
        className="py-20 bg-gray-900 text-gray-100 px-6 sm:px-10 lg:px-20"
      >
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">
          Featured Products
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-400">No products found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mr-4 px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400"
                : "bg-purple-600 text-white hover:bg-purple-700 transition"
            }`}
          >
            Previous
          </button>
          <span className="text-lg text-gray-200">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`ml-4 px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400"
                : "bg-purple-600 text-white hover:bg-purple-700 transition"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
