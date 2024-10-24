// src/pages/ProfilePage.jsx
import React, { useState, useContext } from "react";
import { FaCamera } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext"; // Import AuthContext
import { auth } from "../../utils/firebase"; // Ensure you have the Firebase auth instance
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useContext(AuthContext); // Access user context
  const navigate = useNavigate();

  // Handle user info, replace with your actual user object
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Use Firebase's signOut method
      navigate("/");
    } catch (error) {
      alert.error("Error logging out: ", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {/* Profile Image with Camera Overlay */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden group">
            <img
              src={profileImage || user.userInfo.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="profileImage"
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <FaCamera className="text-white text-2xl" />
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold">{user.userInfo.name}</h2>
            <p className="text-purple-400">{user.userInfo.email}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-8 space-y-4 text-gray-300">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Phone:</span>
            <p>{user.phone || "Not provided"}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Address:</span>
            <p>{user.address || "Not provided"}</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-purple-600 py-2 px-8 rounded-md text-white text-lg font-medium transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
