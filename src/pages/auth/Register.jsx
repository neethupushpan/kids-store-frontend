import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldMap = {
      reg_name: 'name',
      reg_email: 'email',
      reg_password: 'password',
      reg_phone: 'phone',
    };
    setForm({ ...form, [fieldMap[name]]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      'http://localhost:3001/api/user/register',
      form,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );

    dispatch(setUser(res.data.userData)); // ✅ Now res is defined
    toast.success('Registration successful!');
    navigate('/login');
  } catch (err) {
    console.error('❌ Register error:', err.response?.data || err.message);
    setMessage(err.response?.data?.error || 'Register failed');
  }
};

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center">
        {/* Left - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://res.cloudinary.com/devsa5tma/image/upload/v1751646985/loggg_amvkju.webp"
            alt="Register Visual"
            className="w-full h-screen object-cover"
          />
        </div>

        {/* Right - Registration Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-4 py-10">
          <form
  autoComplete="off"
  onSubmit={handleSubmit}
  className="bg-white p-8 shadow-lg max-w-md w-full space-y-4"
>
  <h2 className="text-2xl font-bold text-center text-rose-600 mb-2">Create an Account</h2>

  {/* 🛡️ Dummy hidden fields to trap browser autofill */}
  <input type="text" name="fake-username" autoComplete="username" style={{ display: 'none' }} />
  <input type="password" name="fake-password" autoComplete="new-password" style={{ display: 'none' }} />

  {/* Your actual fields with non-standard names */}
  <input
    id="reg_name"
    name="reg_name"
    placeholder="Name"
    autoComplete="off"
    onChange={handleChange}
    value={form.name}
    required
    className="border w-full p-2 rounded"
  />

  <input
    id="reg_email"
    name="reg_email"
    type="email"
    placeholder="Email"
    autoComplete="off"
    onChange={handleChange}
    value={form.email}
    required
    className="border w-full p-2 rounded"
  />

  <input
    id="reg_password"
    name="reg_password"
    type="password"
    placeholder="Password"
    autoComplete="new-password"
    onChange={handleChange}
    value={form.password}
    required
    className="border w-full p-2 rounded"
  />

  <input
    id="reg_phone"
    name="reg_phone"
    type="text"
    placeholder="Phone (optional)"
    autoComplete="off"
    onChange={handleChange}
    value={form.phone}
    className="border w-full p-2 rounded"
  />

  <button
    type="submit"
    className="w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-6 py-2.5"
  >
    Submit
  </button>

  {message && <p className="text-red-600 text-sm text-center">{message}</p>}
</form>

        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
