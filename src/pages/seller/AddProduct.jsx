import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    sizes: "",
  });

  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      if (key === "sizes") {
        const sizesArray = form[key].split(",").map((s) => s.trim());
        sizesArray.forEach((size) => formData.append("size", size)); // send as multiple fields
      } else {
        formData.append(key, form[key]);
      }
    }

    formData.append("image", image);

    dispatch(addProduct(formData)).then((res) => {
      if (!res.error) {
        navigate("/seller/products");
      } else {
        alert("❌ Failed to add product");
        console.error(res.error);
      }
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full border p-2"
          required
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="w-full border p-2"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2"
          required
        />
        <input
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          placeholder="Sizes (comma separated)"
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
          required
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
