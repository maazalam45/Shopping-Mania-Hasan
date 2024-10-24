// src/Components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 ">
      <p>
        &copy; {new Date().getFullYear()} Shopping Mania. All rights reserved.
      </p>
      <div className="flex justify-center space-x-6 ">
        <a
          href="/terms"
          className="hover:text-purple-400 transition duration-200"
        >
          Terms of Service
        </a>
        <a
          href="/privacy"
          className="hover:text-purple-400 transition duration-200"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
