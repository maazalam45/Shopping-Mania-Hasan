// src/App.jsx
import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import Header from "./Components/Header"; // Adjust the path if necessary
import Footer from "./Components/Footer"; // Adjust the path if necessary
import AppRoutes from "./Route"; // Ensure this path points to your routing file

const App = () => {
  const location = useLocation();

  // Define the paths where you don't want to show Header and Footer
  const noHeaderFooterPaths = ["/login", "/signup", "/orderdetails"];

  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />} {/* Conditionally render Header */}
      <main className="flex-grow">
        <AppRoutes /> {/* This renders your routes defined in AppRoutes */}
      </main>
      {showHeaderFooter && <Footer />} {/* Conditionally render Footer */}
    </>
  );
};

// Wrap the App component with Router in a separate component
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
