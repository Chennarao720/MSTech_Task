import React, { useContext } from "react";
import { Context } from "../GlobalContext/MyContextProvider";

const ProductCard = ({ product, onView }) => {
  const { updateCart } = useContext(Context);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain mb-3 rounded-lg"
      />
      <h2 className="font-semibold text-gray-800 text-lg line-clamp-2 mb-1">
        {product.title}
      </h2>
      <p className="text-yellow-700 font-bold text-xl mb-3">${product.price}</p>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={() => updateCart(product)} // ✅ Add to cart action
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold"
        >
          Add to Cart
        </button>

        <button
          onClick={() => onView(product.id)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
