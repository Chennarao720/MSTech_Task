import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Context } from "../GlobalContext/MyContextProvider";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { cart, updateCart } = useContext(Context);

  // ✅ Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Add to Cart (with JSON Server)
  const handleAddToCart = async () => {
    try {
      const userRes = await fetch(`http://localhost:5000/users?isLoggedIn=true`);
      const loggedInUsers = await userRes.json();

      if (loggedInUsers.length === 0) {
        alert("Please log in to add products to your cart!");
        navigate("/login");
        return;
      }

      const currentUser = loggedInUsers[0];
      const userId = currentUser.id;
      const existingCart = currentUser.cart || [];

      // ✅ Check if already added
      const alreadyInCart = existingCart.some((item) => item.id === product.id);
      if (alreadyInCart) {
        alert("This product is already in your cart!");
        return;
      }

      // ✅ Add product to cart
      const updatedCart = [...existingCart, product];

      // ✅ Update JSON server
      const patchRes = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      });

      if (!patchRes.ok) throw new Error("Failed to update cart");

      // ✅ Update React Context
      updateCart(updatedCart);

      alert("✅ Product added to your cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong!");
    }
  };

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl flex flex-col md:flex-row gap-6"
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex justify-center items-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-w-[180px] md:max-w-[220px] object-contain rounded-lg"
          />
        </motion.div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-2 capitalize">
              Category: <span className="font-semibold">{product.category}</span>
            </p>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              {product.description}
            </p>

            <div className="text-2xl font-bold text-green-600 mb-4">
              <CountUp
                prefix="$"
                start={0}
                end={product.price}
                duration={1.5}
                useEasing={true}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition"
            >
              🔙 Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Details;
