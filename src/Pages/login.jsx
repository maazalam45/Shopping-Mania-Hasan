import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../utils/firebase"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading status
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowPopup(true); // Show success popup
      setTimeout(() => {
        setShowPopup(false); // Automatically hide after 3 seconds
        navigate("/"); // Redirect to home or another page upon successful login
      }, 3000);
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email. Please sign up.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please enter a valid email.";
          break;
        default:
          errorMessage = error.message; // Use the default error message for other errors
          break;
      }
      setError(errorMessage); // Set the error message state
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    try {
      await signInWithPopup(auth, provider);
      setShowPopup(true); // Show success popup
      setTimeout(() => {
        setShowPopup(false); // Automatically hide after 3 seconds
        navigate("/"); // Redirect after successful login
      }, 3000);
    } catch (error) {
      setError("Login failed. Please try again."); // Show error for Google login
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back!
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error messages */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-400 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white border-b-2 border-purple-500 focus:outline-none focus:border-purple-400 transition duration-200 placeholder-gray-500"
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-400 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white border-b-2 border-purple-500 focus:outline-none focus:border-purple-400 transition duration-200 placeholder-gray-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded mt-4 transition duration-200"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Log In"} {/* Show loading text */}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <hr className="w-full border-gray-600" />
          <span className="px-2 text-gray-400">or</span>
          <hr className="w-full border-gray-600" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-2 rounded mt-4 flex items-center justify-center transition duration-200 hover:bg-gray-200"
          disabled={loading} // Disable button while loading
        >
          <span className="text-xl mr-2 font-bold">G</span>
          {loading ? "Loading..." : "Log in with Google"}{" "}
          {/* Show loading text */}
        </button>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-purple-400 text-sm hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-purple-400 text-sm hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>

      {/* Popup for successful login */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 rounded shadow-lg text-center w-full max-w-sm">
            <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
            <p>Welcome back! You will be redirected shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
