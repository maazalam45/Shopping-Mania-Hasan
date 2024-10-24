// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1317622150/photo/abstract-colorful-neon-pink-and-purple-gradient-design-for-background.jpg?s=612x612&w=0&k=20&c=s3mkB3gfTGPExbvNd3N_uzCPZSF-DGzgBP7gMcuIyUM=')", // Same background as the login page or any other preferred image
      }}
    >
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white mb-6">Oops! Page Not Found</p>
      <p className="text-gray-200 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-600 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
//hasan
