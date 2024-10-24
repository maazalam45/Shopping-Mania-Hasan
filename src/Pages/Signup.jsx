// src/pages/SignupPage.jsx
import React, { useState, useContext } from "react";
import { auth } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (name) {
        await updateProfile(user, { displayName: name });
        console.log("User profile updated successfully");
      }

      setUser({
        isLogin: true,
        userInfo: {
          email: user.email,
          name: user.displayName || name,
          photoURL: user.photoURL,
        },
      });

      navigate("/"); // Redirect to home after successful signup
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please use a different one.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format. Please enter a valid email.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading when signup is done
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        isLogin: true,
        userInfo: {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        },
      });
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading after login attempt
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Your Account
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-400 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-white border-b-2 border-purple-500 focus:outline-none focus:border-purple-400 transition duration-200 placeholder-gray-500"
              placeholder="Enter your name"
              required
              autoComplete="off"
            />
          </div>
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
            className="w-full bg-purple-600 text-white py-2 rounded mt-4 transition duration-200 flex items-center justify-center"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
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
          disabled={loading} // Disable Google sign in button while loading
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            <>
              <span className="text-xl mr-2 font-bold">G</span>
              Sign up with Google
            </>
          )}
        </button>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
