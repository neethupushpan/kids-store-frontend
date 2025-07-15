import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevents navigating to product detail page
    dispatch(addToCart({ product, quantity: 1 }));
    navigate("/cart"); // ✅ navigate after adding
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    dispatch(addToWishlist(product));
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="relative group overflow-hidden rounded-xl shadow-md bg-white">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex flex-col items-end justify-start p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToWishlist}
            className="bg-white rounded-full p-2 mb-2 shadow hover:bg-pink-100 text-gray-700"
          >
            <HeartIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-white rounded-full p-2 shadow hover:bg-green-100 text-gray-700"
          >
            <ShoppingBagIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Product Details (Center-Aligned) */}
        <div className="p-3 text-center">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-pink-600 font-bold text-sm mt-1">₹{product.price}</p>
          <p className="text-gray-500 text-xs mt-1">
            Sizes: {Array.isArray(product.size) ? product.size.join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
