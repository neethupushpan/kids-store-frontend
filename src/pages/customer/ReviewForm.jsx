import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyReviews = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [reviews, setReviews] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error('❌ Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleReviewSubmit = async (productId) => {
    if (!rating || !comment) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const res = await API.post(
        '/reviews',
        {
          product: productId, // 🔄 match schema
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      toast.success("Review submitted!");
      setReviews((prev) => ({
        ...prev,
        [productId]: res.data.review,
      }));

      // Reset form
      setSelectedProductId(null);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error('❌ Full error:', error);
      toast.error(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-pink-700">My Purchased Products</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) =>
            order.items.map((item) => (
              <div key={item.product._id} className="border p-4 rounded bg-gray-50">
                <p className="font-semibold text-lg">{item.product.name}</p>

                {/* Already submitted review? */}
                {reviews[item.product._id] && (
                  <div className="mt-2 text-sm text-gray-800">
                    <p><strong>Rating:</strong> {reviews[item.product._id].rating} ⭐</p>
                    <p><strong>Comment:</strong> {reviews[item.product._id].comment}</p>
                  </div>
                )}

                {/* Review Form */}
                {selectedProductId === item.product._id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReviewSubmit(item.product._id);
                    }}
                    className="mt-2 space-y-2"
                  >
                    <label className="block text-sm font-semibold">Rating:</label>
                   <label className="block text-sm font-semibold">Rating:</label>
<div className="flex gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      type="button"
      key={star}
      className="text-2xl transition"
      onClick={() => setRating(star)}
      onMouseEnter={() => setRating(star)}
      onMouseLeave={() => setRating(rating)}
    >
      <span className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    </button>
  ))}
</div>


                    <label className="block text-sm font-semibold">Comment:</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="border rounded p-1 w-full"
                      placeholder="Write your review..."
                      required
                    />

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedProductId(null)}
                        className="text-sm text-gray-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setSelectedProductId(item.product._id)}
                    className="text-blue-600 underline mt-2"
                  >
                    Write a Review
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
