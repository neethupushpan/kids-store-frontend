import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../api/axios';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await API.get('/product/seller-products', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    if (currentUser?.token) {
      fetchSellerProducts();
    }
  }, [currentUser?.token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 bg-white shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
              <p className="mt-2 font-bold">₹{product.price}</p>
              <p className="text-sm">Category: {product.category}</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <p className="text-sm">Size: {product.size.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
