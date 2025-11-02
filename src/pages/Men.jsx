import React, { useEffect, useState, useContext } from "react";
import { Context } from "../GlobalContext/MyContextProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ For smooth animations

const Men = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 New search state
  const productsPerPage = 3;
  const { user, cart, updateCart } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) =>
        setCards(data.filter((p) => p.category === "men's clothing"))
      )
      .catch(console.error);
  }, []);

  // 🔍 Filter products based on search
  const filteredCards = cards.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredCards.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredCards.length / productsPerPage);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }
    updateCart([...cart, product]);
    alert(`${product.title.substring(0, 20)} added to cart!`);
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
        👕 Men's Clothing
      </h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search men's clothing..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset pagination when searching
          }}
          className="w-full sm:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

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
            {cards.length === 0 ? "Loading..." : "No products found"}
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredCards.length > productsPerPage && (
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

export default Men;
