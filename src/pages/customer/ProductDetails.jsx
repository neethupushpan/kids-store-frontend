import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import API from '../../api/axios';
import ReviewForm from '../customer/ReviewForm';
import MainLayout from '../../layouts/MainLayout';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice'; //
import StarRating from "../../components/StarRating";

const fetchProduct = async (id, setProduct, setLoading, setError) => {
  try {
    setLoading(true);
    const res = await API.get(`/product/${id}`);
    setProduct(res.data);
  } catch (err) {
    console.error('❌ Failed to fetch product: ', err);
    setError('Product not found');
  } finally {
    setLoading(false);
  }
};

const fetchReviews = async (id, setReviews) => {
  try {
    const res = await API.get(`/reviews/${id}`); // productId
    setReviews(res.data);
  } catch (err) {
    console.error('❌ Failed to fetch reviews:', err);
  }
};


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    fetchProduct(id, setProduct, setLoading, setError);
    fetchReviews(id, setReviews);
  }, [id]); // ✅ clean, no warning

  const handleQuantityChange = (type) => {
    if (type === 'inc') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

const dispatch = useDispatch(); // ✅ inside component
const handleAddToCart = () => {
  if (!user) {
    alert('Please login to add items to the cart.');
    navigate('/login');
    return;
  }

  // Ensure product is loaded and has price
  if (!product || typeof product.price !== 'number') {
    alert('Product data is not fully loaded. Please try again.');
    return;
  }

  const cartProduct = {
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    size: product.size,
  };

  dispatch(addToCart({ product: cartProduct, quantity }));

  navigate('/cart');
};


  if (loading) return <MainLayout><p>Loading product...</p></MainLayout>;
  if (error) return <MainLayout><p>{error}</p></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-green-600 font-semibold">₹{product.price}</p>
            <p className="my-2">{product.description}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Sizes: {product.size?.join(', ')}</p>

            <div className="flex items-center mt-4">
              <button onClick={() => handleQuantityChange('dec')} className="px-3 py-1 bg-gray-200 rounded-l">-</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => handleQuantityChange('inc')} className="px-3 py-1 bg-gray-200 rounded-r">+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 px-4 py-2  hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
  <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
  {reviews.length === 0 ? (
    <p>No reviews yet.</p>
  ) : (
    <ul className="space-y-3">
      {reviews.map((review) => (
        <li key={review._id} className="border p-3 rounded-lg">
          <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-600">{review.comment}</p>
             <StarRating value={review.rating} size="text-sm" />
        </li>
      ))}
    </ul>
  )}
</div>
</div>
    </MainLayout>
  );
};

export default ProductDetails;
