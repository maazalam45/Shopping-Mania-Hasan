import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!country || !paymentMethod) {
      setError("Please select your country and payment method.");
      return;
    }

    // Construct order details object
    const orderDetails = {
      name: user.userInfo.name,
      email: user.userInfo.email,
      country,
      paymentMethod,
      items: cartItems,
      total: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    // Navigate to Order Details page with order details
    navigate("/orderdetails", { state: orderDetails });

    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6">Checkout</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg mb-1">Full Name</label>
            <input
              type="text"
              value={user.userInfo.name}
              disabled
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-lg mb-1">Email</label>
            <input
              type="email"
              value={user.userInfo.email}
              disabled
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-lg mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Select your country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="IN">India</option>
              <option value="PK">Pakistan</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div>
            <label className="block text-lg mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Select a payment method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Bank Transfer</option>
              {/* Add more payment methods as needed */}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Complete Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
