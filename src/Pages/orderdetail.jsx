import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const OrderDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const [showPopup, setShowPopup] = useState(true); // State for popup visibility

  if (!state) {
    return <p>No order details available.</p>;
  }

  const {
    orderId,
    name,
    email,
    country,
    paymentMethod,
    items,
    total,
    shippingAddress,
  } = state;

  const closePopup = () => {
    setShowPopup(false); // Function to close the popup
    // Assuming you have a function to add the order to context
    addOrder(state); // Add order to context when closing the popup
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Order Summary</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Customer Information:</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Country:</strong> {country}
          </p>
          <p>
            <strong>Payment Method:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Shipping Address:</strong> {shippingAddress}
          </p>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-4">Items Ordered:</h2>
        <div className="border-t border-gray-600 mt-4 pt-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <p>
                {item.title} (x{item.quantity})
              </p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-4">
          Total: ${total.toFixed(2)}
        </h2>

        <div className="mt-6">
          <p className="text-center text-lg font-semibold">
            Thank you for your order!
          </p>
          <p className="text-center">We appreciate your business!</p>
        </div>

        {/* Popup for payment completion */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Payment Completed!</h2>
              <p>Your payment has been successfully processed.</p>
              <button
                onClick={closePopup}
                className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Button to go to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoHome}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
