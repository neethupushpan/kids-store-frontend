import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../api/axios';
import { updateUserSuccess } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/user/profile');
       setFormData({
  name: res.data.data.name,
  email: res.data.data.email,
  phone: res.data.data.phone || '',
});

      } catch (error) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("🟡 Submit clicked. Sending:", formData); // ✅ Add this

  const toastId = toast.loading("Updating profile...");
  try {
    const payload = {
      name: formData.name,
      phone: formData.phone,
    };
    if (formData.password) payload.password = formData.password;

    const res = await API.patch('/user/update', payload);

  dispatch(updateUserSuccess(res.data.data)); // ✅ Only send actual user object

    toast.update(toastId, {
      render: "✅ Profile updated successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  } catch (error) {
    console.error("❌ Update error", error); // ✅ Add this
    toast.update(toastId, {
      render: "❌ Failed to update profile.",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
};


  return (
   
    <div className="min-h-screen p-6  flex justify-center items-center">
      <div className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              className="w-full border p-2 rounded bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile Number</label>
         <input
  type="text"
  name="phone"
  pattern="[0-9]{10}"
  title="Phone number must be 10 digits"
  maxLength={10}
  className="w-full border px-4 py-2 rounded"
  value={formData.phone}
  onChange={handleChange}
/></div>


          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
