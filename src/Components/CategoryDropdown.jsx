// src/Components/CategoryDropdown.jsx
import React from "react";
import {
  GiClothes,
  GiSmartphone,
  GiHomeGarage,
  GiBookshelf,
  GiTShirt,
  GiPerfumeBottle,
  GiRunningShoe,
} from "react-icons/gi";

const categories = [
  { label: "All Categories", value: "", icon: null },
  {
    label: "Clothing",
    value: "Clothing",
    icon: <GiClothes className="mr-2" />,
  },
  {
    label: "Electronics",
    value: "Electronics",
    icon: <GiSmartphone className="mr-2" />,
  },
  { label: "Home", value: "Home", icon: <GiHomeGarage className="mr-2" /> },
  { label: "Books", value: "Books", icon: <GiBookshelf className="mr-2" /> },
  { label: "T-shirts", value: "T-shirts", icon: <GiTShirt className="mr-2" /> },
  {
    label: "Fragrance",
    value: "Fragrance",
    icon: <GiPerfumeBottle className="mr-2" />,
  },
  { label: "Shoes", value: "Shoes", icon: <GiRunningShoe className="mr-2" /> },
];

const CategoryDropdown = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="relative">
      <select
        value={selectedCategory}
        onChange={onCategoryChange}
        className="appearance-none w-full bg-gray-800 text-white rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md"
      >
        {categories.map((category) => (
          <option
            key={category.value}
            value={category.value}
            className="flex items-center"
          >
            <span className="flex items-center">
              {category.icon}
              {category.label}
            </span>
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">
        ▼
      </span>
    </div>
  );
};

export default CategoryDropdown;
