import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  Settings,
} from 'lucide-react';

const UserSidebar = () => {
  return (
    <div
      className="min-h-screen flex object-cover"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/devsa5tma/image/upload/v1751504909/bg_oprgqz.jpg')`,
      }}
    >
      <aside className="bg-[#ed54a4] text-white w-full lg:w-64 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <nav className="space-y-4">
          <NavLink
            to="/user/dashboard"
            className="flex items-center gap-2 hover:text-pink-200"
          >
            <LayoutDashboard className="w-5 h-5" />
            Profile
          </NavLink>

          <NavLink
            to="/user/orders"
            className="flex items-center gap-2 hover:text-pink-200"
          >
            <ShoppingCart className="w-5 h-5" />
            My Orders
          </NavLink>

          <NavLink
            to="/user/reviews"
            className="flex items-center gap-2 hover:text-pink-200"
          >
            <MessageSquare className="w-5 h-5" />
            My Reviews
          </NavLink>

          <NavLink
            to="/user/profile"
            className="flex items-center gap-2 hover:text-pink-200"
          >
            <Settings className="w-5 h-5" />
            Edit Profile
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default UserSidebar;
