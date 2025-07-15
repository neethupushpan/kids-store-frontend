import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { Menu, X } from 'lucide-react';
import { ShoppingBag, Heart } from 'lucide-react';
import { UserIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';
import { Home } from 'lucide-react';

const categorySizes = {
  Boys: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'],
  Girls: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'],
  Infants: ['0-3M', '3-6M', '6-9M', '9-12M'],
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.cart.cartItems || []);
const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

const [showDropdown, setShowDropdown] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await API.get('/user/logout');
      localStorage.removeItem('token');
      dispatch(logoutUser());
      dispatch(clearCart());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <nav className="bg-[#ed54a4] text-white px-6 py-4 flex justify-between items-center relative z-50">
      <Link
  to="/"
  title="Home"
  className="flex items-center gap-2 text-2xl font-bold hover:text-pink-200 transition"
>
  <Home className="w-6 h-6" />
  <span>Kids Hub</span>
</Link>

      {/* Hamburger Icon - Mobile Only */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center" ref={dropdownRef}>
        {["Boys", "Girls", "Infants"].map((category) => (
          <div key={category} className="relative">
            <button
              className="capitalize hover:underline"
              onClick={() => setOpenDropdown(openDropdown === category ? null : category)}
            >
              {category}
            </button>
            {openDropdown === category && (
              <div className="absolute top-10 left-0 bg-white text-black shadow-lg rounded w-40 z-50">
                {categorySizes[category].map((size) => (
                  <Link
                    key={size}
                 to={`/category/${category}?size=${encodeURIComponent(size)}`}

                    className="block px-4 py-2 hover:bg-pink-100"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {size}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

       {!user ? (
  <>
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="focus:outline-none"
      >
        <UserIcon className="h-8 w-8 text-white" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100"
            onClick={() => setShowDropdown(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100"
            onClick={() => setShowDropdown(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
              
            <button className="relative text-white hover:text-pink-200">
    <Heart className="w-6 h-6" />
  </button>
  <Link to="/cart" className="relative text-white hover:text-pink-200">
  <ShoppingBag className="w-6 h-6" />
 <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
     {cartCount}

</span>
</Link>

          </>
        ) : (
          <>
            <Link to="/user/dashboard" className="hover:underline">My Account</Link>
              <Link to="/cart" className="relative text-white hover:text-pink-200">
  <ShoppingBag className="w-6 h-6" />
  {cartCount > 0 && (
 <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartCount}

</span>
)}
</Link>
   <button className="relative text-white hover:text-pink-200">
    <Heart className="w-6 h-6" />
  </button>

            {user?.nNMe && <span className="ml-2">Hi, {user.name}</span>}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#ed54a4] text-white flex flex-col items-start gap-4 px-6 py-4 z-40">
          {["Boys", "Girls", "Infants"].map((category) => (
            <div key={category} className="relative w-full">
              <button
                className="capitalize hover:underline w-full text-left"
                onClick={() => setOpenDropdown(openDropdown === category ? null : category)}
              >
                {category}
              </button>
              {openDropdown === category && (
                <div className="bg-white text-black shadow-md mt-2 rounded w-full">
                  {categorySizes[category].map((size) => (
                    <Link
                      key={size}
                      to={`/category/${category}?size=${size}`}
                      className="block px-4 py-2 hover:bg-pink-100"
                      onClick={() => {
                        setIsOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {size}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:underline">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="hover:underline">Sign Up</Link>
              <button className="relative text-white hover:text-pink-200">
    <Heart className="w-6 h-6" />
  </button>
  <Link to="/cart" className="relative text-white hover:text-pink-200">
  <ShoppingBag className="w-6 h-6" />
  {cartCount > 0 && (
  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
       {cartCount}

  </span>
  )}
</Link>
            </>
          ) : (
            <>
              <Link to="/user/dashboard" onClick={() => setIsOpen(false)} className="hover:underline">My Account</Link>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="hover:underline">Cart</Link>
              {user?.name && <span className="ml-2">Hi, {user.name}</span>}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
