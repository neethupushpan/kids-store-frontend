import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../api/axios';
import MainLayout from '../../layouts/MainLayout';
import { useLocation } from 'react-router-dom'; 

const SellerProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
 const location = useLocation();

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await API.get('/seller/products'); // your backend route
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch seller products", err);
      }
    };

    fetchSellerProducts();
  }, [location]);
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    await API.delete(`/product/delete/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id)); // remove from list
  } catch (err) {
    console.error("❌ Failed to delete product:", err.response?.data || err.message);
  }
};
  return (
    <MainLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Products</h2>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded-lg shadow bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded mb-3 bg-gray-100"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                <p className="text-sm text-gray-600">Sizes: {product.size?.join(', ')}</p>
                <p className="text-sm mt-2">{product.description}</p>

                <button
                  onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                  className="mt-4 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
  onClick={() => handleDelete(product._id)}
  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
>
  🗑️ Delete
</button>

              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SellerProductList;
