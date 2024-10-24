import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFoundPage from "./Pages/Notfound";
import Profile from "./Pages/Profile";
import ProductDetails from "./Pages/ProductDetail";
import SignupPage from "./Pages/Signup";
import CheckoutPage from "./Pages/Checkout";
import OrderDetailsPage from "./Pages/OrderPage";
import CartPage from "./Pages/CartPage";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/orderdetails" element={<OrderDetailsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/cart" element={<CartPage />} />{" "}
      <Route path="/profile" element={<Profile />} />
      {/* Add route for CartPage */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
