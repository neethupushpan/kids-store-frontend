import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductCard from "../../components/ProductCard"; 


import MainLayout from "../../layouts/MainLayout";

const ProductList = () => {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const size = queryParams.get("size");

  const dispatch = useDispatch();
const { items: products, loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    if (category && size) {
      dispatch(fetchProducts({ category, size }));
    }
  }, [category, size, dispatch]);

  return (
    
  <MainLayout>
  <div className="pt-6 scroll-mt-28">
    <h2 className="text-2xl font-bold mb-4 capitalize px-6 text-center">
      {category} Dresses {size && `- Size: ${size}`}
    </h2>

    <div className="px-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : !Array.isArray(products) || products.length === 0 ? (
        <p>No products found.</p>
      ) : (
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-7xl mx-auto">
  {products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>

      )}
    </div>
  </div>
</MainLayout>



  );
};

export default ProductList;
