import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const EditProduct = () => {
  const { id } = useParams(); // get product ID from route
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    sizes: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/product/${id}`);
        const data = res.data;

        setForm({
          name: data.name,
          price: data.price,
          stock: data.stock,
          description: data.description,
          category: data.category,
          sizes: data.size?.join(", "),
        });
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (key === "sizes") {
        form[key]
          .split(",")
          .map((s) => s.trim())
          .forEach((size) => formData.append("size", size));
      } else {
        formData.append(key, form[key]);
      }
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      await API.patch(`/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/seller/products");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
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
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
