import React, { useEffect, useState, useContext } from "react";
import { Context } from "../GlobalContext/MyContextProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Jewelery = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search
  const [loading, setLoading] = useState(true);
  const productsPerPage = 3;

  const { user } = useContext(Context);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  // ✅ Fetch products
  useEffect(() => {
    const fetchJewels = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const jewels = data.filter((p) => p.category === "jewelery");
        setCards(jewels);
      } catch (error) {
        console.error("Error fetching jewelry:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJewels();
  }, []);

  // ✅ Filter by search
  const filteredProducts = cards.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Add to Cart
  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      // Prevent duplicates
      const res = await fetch(`${API_URL}/cart?userId=${user.id}&id=${product.id}`);
      const existing = await res.json();

      if (existing.length > 0) {
        alert("Item already in cart!");
        return;
      }

      const newItem = { ...product, userId: user.id, quantity: 1 };
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        alert(`${product.title.substring(0, 25)} added to cart ✅`);
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong");
    }
  };

  // ✅ Buy Now
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
      <h1 className="text-3xl font-bold mb-6 text-yellow-700 text-center">
        💍 Jewelry Collection
      </h1>

      {/* ✅ Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search jewelry..."
          className="w-full sm:w-1/2 p-3 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 text-lg col-span-full">
            Loading...
          </p>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
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
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">
            No jewelry found
          </p>
        )}
      </div>

      {/* ✅ Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded font-semibold shadow ${
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
              className={`px-3 py-2 rounded font-semibold shadow ${
                currentPage === i + 1
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded font-semibold shadow ${
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

export default Jewelery;
