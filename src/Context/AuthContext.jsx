import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase";

// Create the UserContext
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: "",
  });

  const [loading, setLoading] = useState(true);

  // Handle user state changes
  function onAuthChanged(user) {
    if (user) {
      setUser({
        isLogin: true,
        userInfo: {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        },
      });
    } else {
      setUser({ isLogin: false, userInfo: "" });
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
