import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/common/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/customer/UserDashboard';
import Unauthorized from './pages/common/Unauthorized';
import SellerLayout from './layouts/SellerLayout';
import AdminLayout from './layouts/AdminLayout';
import ManageUsers from './pages/admin/UserManagement';
import AddProduct from './pages/seller/AddProduct';
import EditProduct from './pages/seller/EditProduct';
import SellerOrders from './pages/seller/sellerOrders';
import ProductList from './pages/customer/ProductList';
import ProductDetails from './pages/customer/ProductDetails';
import SellerDashboard from './pages/seller/SellerDashboard';
import CartPage from './pages/customer/CartPage';
import SellerProductList from './pages/seller/SellerProductList';
import AdminProductManagement from './pages/admin/AdminProductManagement';
import AdminOrders from './pages/admin/AdminOrders';
import Checkout from './pages/customer/Checkout';
import PaymentSuccess from './pages/customer/paymentSuccess';
import PaymentCancel from './pages/customer/paymentCancel';
import MyOrders from './pages/customer/MyOrders';
import EditProfile from './pages/customer/EditProfile';
import CustomerLayout from './layouts/CustomerLayout';
import ReviewForm from './pages/customer/ReviewForm';
import { Toaster } from "react-hot-toast";
import MainLayout from './layouts/MainLayout'; 
import AddSeller from './pages/admin/AddSeller';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
         
     <Route
  path="/"
  element={
    
      <Home />
  
  }
/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/category/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/my-orders" element={<MyOrders />} />

        {/* Customer Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="reviews" element={<ReviewForm />} />
        </Route>

        {/* Seller Routes */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="products" element={<SellerProductList />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
       <Route path="add-product" element={<AddProduct />} />
           <Route path="orders" element={<SellerOrders />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="products" element={<AdminProductManagement />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="add-seller" element={<AddSeller />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
