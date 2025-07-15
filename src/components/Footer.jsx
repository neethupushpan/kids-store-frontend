import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-ranipink text-white py-10 shadow-lg">
      <div className="mx-auto max-w-screen-xl px-4">
        
        {/* Newsletter Signup */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h2>
          <p className="mb-4 text-sm">Stay updated with our latest offers and new arrivals.</p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full sm:w-80 rounded text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-ranipink px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-left">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase">Company</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Brand Center</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase">Help Center</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Discord</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase">Legal</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Licensing</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase">Download</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">iOS</a></li>
              <li><a href="#" className="hover:underline">Android</a></li>
              <li><a href="#" className="hover:underline">Windows</a></li>
              <li><a href="#" className="hover:underline">MacOS</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-8 border-t border-white/20 pt-4 flex flex-col md:flex-row items-center justify-between text-sm">
          <span>© 2025 Kids Shop™. All Rights Reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-yellow-300">Facebook</a>
            <a href="#" className="hover:text-yellow-300">Twitter</a>
            <a href="#" className="hover:text-yellow-300">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
