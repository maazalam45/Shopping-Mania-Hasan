import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useContext(AuthContext); // Get the user data from AuthContext

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleContinueShopping = () => navigate("/");

  const handleProceedToCheckout = () => {
    if (!user.isLogin) {
      // Redirect to login page if user is not logged in
      navigate("/login");
    } else {
      // Pass user info along with cart items to checkout
      const orderDetails = {
        items: cartItems,
        customerInfo: {
          name: user.userInfo.name,
          email: user.userInfo.email, // Assuming userInfo has an email
        },
      };
      // Proceed to checkout with user info and order details
      navigate("/checkout", { state: { orderDetails } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Shopping Cart</h1>
      <div className="max-w-3xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Your cart is empty.</p>
            <Link to="/">
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 px-4 rounded hover:shadow-lg transition duration-300">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0]} // Ensure this matches your product object structure
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-400">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition duration-300"
                        disabled={item.quantity === 1} // Disable button if quantity is 1
                      >
                        -
                      </button>
                      <span className="mx-2 text-lg font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700 transition duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
              Total Amount: ${totalAmount.toFixed(2)}
            </h2>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleProceedToCheckout}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 px-4 rounded hover:shadow-lg transition duration-300"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleContinueShopping}
                className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
