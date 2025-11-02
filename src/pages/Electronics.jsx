import React, { useEffect, useState, useContext } from "react";
import { Context } from "../GlobalContext/MyContextProvider";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Electronics = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { user, updateCart } = useContext(Context);
  const navigate = useNavigate();

  // ✅ Fetch product data
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        const result = await data.json();
        setCards(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCards();
  }, []);

  // ✅ Filter electronics category
  const electronics = cards.filter(
    (product) => product.category === "electronics"
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(electronics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = electronics.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Fixed Add to Cart logic
  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }
    updateCart(product); // ✅ pass single product (not array)
    alert(`${product.title.substring(0, 25)} added to cart!`);
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
    <div className="bg-gray-100 min-h-screen p-8 pb-24">
      <h1 className="text-3xl font-bold text-center mb-8">🔌 Electronics</h1>

      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all flex flex-col"
            >
              {/* Image */}
              <div className="h-56 flex items-center justify-center bg-gray-50 p-4">
                <img
                  src={p.image}
                  alt={p.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col justify-between flex-grow text-center">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                  {p.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2 capitalize">
                  {p.category}
                </p>
                <CountUp
                  className="text-xl font-bold text-green-600 mb-4"
                  prefix="$"
                  start={0}
                  end={p.price}
                  duration={1}
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="bg-gray-200 hover:bg-gray-300 w-full py-2 rounded font-semibold"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(p)}
                    className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold"
                  >
                    Buy Now
                  </button>
                </div>

                <button
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded font-semibold"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">
            Loading...
          </p>
        )}
      </section>

      {/* Pagination Controls */}
      {electronics.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold shadow ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 rounded-lg font-semibold shadow ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold shadow ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Electronics;
