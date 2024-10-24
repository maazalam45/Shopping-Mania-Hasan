// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  // Fetching products from a dummy API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Our Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
