import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-200">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center w-[340px] animate-fadeIn">
        {/* ✅ Success Icon */}
        <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* ✅ Main Message */}
        <h1 className="text-3xl font-extrabold text-green-700 mb-2">
          Order Confirmed! 🎉
        </h1>
        <p className="text-gray-700 font-medium mb-6">
          Your order has been successfully placed.<br />
          It will be delivered soon to your address.  
          Thank you for shopping with us! 💚
        </p>

        {/* ✅ Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
