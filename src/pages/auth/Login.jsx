import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [success] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      form,
      { withCredentials: true }
    );

    const token = res.data.token;
    const userObject = res.data.user;
    console.log("👤 Logged in user:", userObject);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObject));

    dispatch(setUser(userObject));

    setTimeout(() => {
      if (userObject.role === 'user') navigate('/user/dashboard');
      else if (userObject.role === 'admin') navigate('/admin/dashboard');
      else if (userObject.role === 'seller') navigate('/seller/dashboard');
      else navigate('/');
    }, 1000);
  } catch (err) {
    setError(err.response?.data?.error || 'Invalid login');
  }
};


  return (
    <MainLayout>
<div className="min-h-screen flex items-center ">
  {/* Left - Image */}
  <div className="w-1/2 hidden md:block">
    <img
      src="https://res.cloudinary.com/devsa5tma/image/upload/v1751646910/regg_abljn4.webp"
      alt="Login Visual"
      className="w-full h-screen object-cover"
    />
  </div>

  {/* Right - Login Form */}
  <div className="w-full md:w-1/2 flex justify-center items-center px-4 py-10">
    <div className="w-full max-w-sm p-8   ">
 
      {/* Welcome Message */}
      <h2 className="text-2xl font-bold text-center text-rose-600 mb-2">
        Welcome Back!
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Log in to explore adorable outfits for little stars! 🌟
      </p>

     <form autoComplete="off" onSubmit={handleSubmit}>
              {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
                required
                className="border w-full p-2 mb-3  bg-white"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="border w-full p-2 mb-4  bg-white"
              />

        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-6 py-2.5"
        >
          Login
        </button>
        {!user && (
  <Link
    to="/register"
    className="mt-4 w-full block text-center text-pink-600 hover:text-pink-700 font-semibold underline"
  >
    <FaUserPlus className="inline mr-2" />
    Register Now
  </Link>
)}

      </form>
    </div>
  </div>

</div>
    </MainLayout>
  );
};

export default Login;