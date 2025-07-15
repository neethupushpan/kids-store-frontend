import React, { useState } from "react";
import API from '../../api/axios';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddSeller = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Get logged-in user from Redux
  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("👤 Logged in user:", user);
      console.log("📦 Form Data:", form);

      const res = await API.post("/user/admin/register-seller", form);
      toast.success(res.data.message);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("❌ Seller Register Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Register New Seller</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Seller Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seller Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register Seller
        </button>
      </form>
    </div>
  );
};

export default AddSeller;
