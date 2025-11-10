import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItemCount } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            🛍️ E-Commerce Store
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

