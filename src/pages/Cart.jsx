import React, { useContext } from "react";
import { Context } from "../GlobalContext/MyContextProvider";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    user,
    cart = [],
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(Context);

  const navigate = useNavigate();

  // ✅ Show only the current user’s cart items
  const userCart = cart.filter((item) => item.userId === user?.id);

  return (
    <div className="p-6 max-w-5xl mx-auto pb-24">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-700">
        🛒 Your Cart
      </h1>

      {userCart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        userCart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 mb-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-59 w-32 object-contain rounded-lg"
            />
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-bold text-xl text-gray-800 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-600">
                Price:{" "}
                <span className="font-semibold text-green-600">
                  ${item.price}
                </span>
              </p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  className="w-32 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold transition-all"
                  onClick={() => navigate("/address")}
                >
                  Buy Now
                </button>

                <button
                  className="w-32 bg-red-700 text-white py-2 rounded-xl font-semibold transition-all"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {userCart.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-2xl shadow flex justify-between items-center text-lg font-bold text-gray-800">
          <span>Total:</span>
          <span className="text-green-600">
            $
            {userCart
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Cart;
