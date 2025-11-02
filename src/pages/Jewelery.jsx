import React, { useEffect, useState, useContext } from "react";
import { Context } from "../GlobalContext/MyContextProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Jewelery = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const jewels = data.filter((p) => p.category === "jewelery");
        setCards(jewels);
      })
      .catch(console.error);
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cards.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(cards.length / productsPerPage);

  // ✅ Add to Cart (JSON Server)
  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      // Check if product already in cart
      const res = await fetch(`http://localhost:5000/cart?title=${product.title}`);
      const data = await res.json();

      if (data.length > 0) {
        alert("Item already in cart!");
        return;
      }

      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, userId: user.id }),
      });

      alert(`${product.title.substring(0, 20)} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleBuyNow = (product) => {
    if (!user) {
      alert("Please login to buy");
      navigate("/login");
      return;
    }
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-yellow-700 text-center">
        💍 Jewelry Collection
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-4 flex flex-col items-center shadow hover:shadow-xl transition-all"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-48 object-contain mb-3"
              />
              <h3 className="font-semibold text-center mb-2 line-clamp-2">
                {p.title}
              </h3>
              <p className="text-green-600 font-bold mb-3">${p.price}</p>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-gray-200 w-full py-2 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(p)}
                  className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
                >
                  Buy Now
                </button>
              </div>

              <button
                onClick={() => navigate(`/products/${p.id}`)}
                className="mt-3 bg-yellow-500 text-white w-full py-2 rounded"
              >
                View Details
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">
            Loading...
          </p>
        )}
      </div>

      {/* Pagination */}
      {cards.length > productsPerPage && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-yellow-600 text-white"
                  : "bg-white border hover:bg-yellow-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Jewelery;
