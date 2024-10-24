// src/Components/Header.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt, // Importing the SignOut icon
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../../utils/firebase"; // Ensure correct import
import { signOut } from "firebase/auth"; // Import signOut function

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { user, setUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser({ isLogin: false, userInfo: "" });
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <nav className="flex items-center justify-between flex-wrap">
        <h1 className="text-lg font-bold">Shopping Mania</h1>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes size={24} className="cursor-pointer" />
          ) : (
            <FaBars size={24} className="cursor-pointer" />
          )}
        </div>

        {/* Menu links for desktop */}
        <div className="hidden md:flex-grow md:flex md:justify-center mt-4 md:mt-0">
          <Link
            to="/"
            className="flex items-center hover:text-purple-400 transition duration-200 p-2"
          >
            <FaHome className="mr-1" />
            Home
          </Link>
          {!user.isLogin ? (
            <Link
              to="/login"
              className="flex items-center hover:text-purple-400 transition duration-200 p-2"
            >
              <FaSignInAlt className="mr-1" />
              Login
            </Link>
          ) : (
            <div className="flex items-center">
              {/* Display user's profile image */}

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false); // Close the mobile menu
                }}
                className="flex items-center hover:text-purple-400 transition duration-200 p-2"
              >
                <FaSignOutAlt className="mr-1" /> {/* Logout icon */}
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Icons for cart and profile in desktop */}
        <div className="hidden md:flex space-x-4 mt-4 md:mt-0">
          <Link
            to="/cart"
            className="hover:text-purple-400 flex items-center transition duration-200"
          >
            <FaShoppingCart size={20} />
          </Link>
          {user.isLogin && (
            <Link
              to="/profile"
              className="hover:text-purple-400 flex items-center transition duration-200"
            >
              <img
                src={user.userInfo.photoURL}
                alt={user.userInfo.name}
                className="w-8 h-8 rounded-full"
              />
            </Link>
          )}
        </div>
      </nav>

      {/* Responsive menu layout for mobile */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center justify-center mt-2 bg-gray-800 p-4 rounded-lg">
          <Link
            to="/"
            className="flex items-center hover:text-purple-400 transition duration-200 mb-2"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <FaHome className="mr-1" />
            Home
          </Link>
          {!user.isLogin ? (
            <Link
              to="/login"
              className="flex items-center hover:text-purple-400 transition duration-200 mb-2"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <FaSignInAlt className="mr-1" />
              Login
            </Link>
          ) : (
            <div className="flex items-center mb-2">
              <Link
                to="/profile"
                className="flex items-center transition duration-200 p-2"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <img
                  src={user.userInfo.photoURL}
                  alt={user.userInfo.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false); // Close the mobile menu
                }}
                className="flex items-center hover:text-purple-400 transition duration-200 p-2"
              >
                <FaSignOutAlt className="mr-1" /> {/* Logout icon */}
                Logout
              </button>
            </div>
          )}
          {/* Icons for cart in mobile */}
          <div className="flex space-x-4 mt-4">
            <Link
              to="/cart"
              className="hover:text-purple-400 flex items-center transition duration-200"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <FaShoppingCart size={20} />
            </Link>
          </div>
        </div>
      )}

      {/* Move the border line outside the header */}
      <div className="border-t-2 border-white mt-2" />
    </header>
  );
}
