import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
     <div className="min-h-screen flex flex-col bg-beige text-charcoal">
      <Navbar />
      <main className="flex-grow ">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
