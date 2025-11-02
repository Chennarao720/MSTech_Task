import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Delivery = () => {
  const [del, setDel] = useState({});
  const { id } = useParams();
  const nav = useNavigate();

  // Fetch product (user delivery) details by ID
  const fetchDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch delivery details");
      }

      const data = await res.json();
      setDel(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching the product:", error);
      toast.error("Failed to fetch product details");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100">
      <div className="border border-gray-200 w-[340px] p-6 flex flex-col items-center shadow-xl rounded-2xl bg-white/90 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
        {del.name ? (
          <>
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Delivery Details
            </h2>
            <div className="h-1 w-16 bg-yellow-500 rounded mb-5"></div>

            {/* Info Section */}
            <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-gray-700 shadow-inner mb-5">
              <p className="mb-1">
                <span className="font-semibold text-yellow-800">Name:</span>{" "}
                {del.name}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-yellow-800">Email:</span>{" "}
                {del.email}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-yellow-800">Mobile:</span>{" "}
                {del.mobile}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-yellow-800">Area:</span>{" "}
                {del.area}
              </p>
              <p>
                <span className="font-semibold text-yellow-800">Pincode:</span>{" "}
                {del.pincode}
              </p>
            </div>

            {/* Confirmation Message */}
            <p className="text-gray-800 text-center text-sm font-medium mb-5 animate-pulse">
              🛍️ Please confirm your order to proceed
            </p>

            {/* Confirm Button */}
            <button
              onClick={() => nav("/dashboard/allproducts")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Confirm Order
            </button>
          </>
        ) : (
          <div className="text-gray-600 animate-pulse">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Delivery;
