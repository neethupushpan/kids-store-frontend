import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'flowbite';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const initializeCarousel = async () => {
      const { Carousel } = await import('flowbite');
      const carousels = document.querySelectorAll('[data-carousel="slide"]');
      carousels.forEach((el) => new Carousel(el));
    };
    initializeCarousel();
  }, []);

  const handleAddToBag = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      console.log("🛍️ Added to bag:", product);
    }
  };

  const handleAddToWishlist = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      console.log("❤️ Added to wishlist:", product);
    }
  };

  return (
    <MainLayout>
      {/* Carousel Section */}
      <div className="flex flex-col items-center w-full mt-2 min-h-[24rem]">
        <div id="controls-carousel" className="relative w-full" data-carousel="slide">
          <div className="relative h-[250px] md:h-96 overflow-hidden">
            <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
              <img
                src="https://res.cloudinary.com/devsa5tma/image/upload/v1751486420/Popees_-_Web_Banner_2_1_hc3kbg.png"
                className="w-full h-full object-cover"
                alt="Slide 1"
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://res.cloudinary.com/devsa5tma/image/upload/v1751485415/Popees_-_Web_Banner_3_1_ywqsct.png"
                className="w-full h-full object-cover"
                alt="Slide 2"
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://res.cloudinary.com/devsa5tma/image/upload/v1751489186/car1_zpnrgw.jpg"
                className="w-full h-full object-cover"
                alt="Slide 3"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
              <ChevronLeft className="w-4 h-4 text-white" />
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
              <ChevronRight className="w-4 h-4 text-white" />
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div className="my-8 px-4">
        <h2 className="text-center text-2xl font-bold mb-6 text-pink-600">Trending Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {[
            "https://res.cloudinary.com/devsa5tma/image/upload/v1751489015/url4_h4zq67.jpg",
            "https://res.cloudinary.com/devsa5tma/image/upload/v1751491129/blue_yuqs64.jpg",
            "https://res.cloudinary.com/devsa5tma/image/upload/v1751491429/br_fcini0.jpg",
            "https://res.cloudinary.com/devsa5tma/image/upload/v1751491101/pp_b6vrlw.jpg",
            "https://res.cloudinary.com/devsa5tma/image/upload/v1751491078/frock_rtqjsq.jpg",
          ].map((url, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-xl shadow-md bg-white">
              <img src={url} alt={`Product ${idx + 1}`} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col items-end justify-start p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleAddToWishlist({ image: url })}
                  className="bg-white rounded-full p-2 mb-2 shadow hover:bg-pink-100 text-gray-700"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleAddToBag({ image: url })}
                  className="bg-white rounded-full p-2 shadow hover:bg-green-100 text-gray-700"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Shop With Us Section */}
      <div className="bg-white shadow p-6">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg--100">
          <div className="w-full md:w-1/2">
            <img
              src="https://res.cloudinary.com/devsa5tma/image/upload/v1751494423/why-popees_900x_aqoogz.webp"
              alt="Kids Banner"
              className="w-full h-auto object-cover rounded-lg shadow"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Why Shop With Us?</h2>
            <p className="text-gray-700 text-lg">
              Quality and comfort are the guiding principles of our philosophy. We diligently uphold stringent standards and uncompromising quality
              throughout our production lines. From the mindful sourcing of organic cotton to carefully crafting hypoallergenic, 'baby ready' garments, we take immense pride in our commitment to excellence.
            </p>
            <p className="text-gray-700 text-lg mt-4">
              Every thread and every stitch is imbued with our dedication to creating the best for your little one. We believe in the profound connection between a baby's comfort and their well-being, and this belief shapes every aspect of our work.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
