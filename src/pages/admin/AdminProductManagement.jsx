import { useEffect, useState } from 'react';
import API from '../../api/axios';


const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/admin/products'); // 👈 Create this route in backend
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/products/${id}`);
      fetchProducts(); // Refresh
    } catch (err) {
      console.error("❌ Failed to delete product", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
   
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Seller</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">₹{p.price}</td>
                  <td className="border p-2">{p.stock}</td>
                  <td className="border p-2">{p.category}</td>
                <td className="border p-2">
  {p.seller ? `${p.seller.name} (${p.seller.email})` : 'N/A'}
</td>

                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    {/* Optionally add an Edit button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    
  );
};

export default AdminProductManagement;
