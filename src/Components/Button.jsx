// components/Button.jsx
import React from "react";

const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full font-medium py-2 px-4 rounded-md transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
