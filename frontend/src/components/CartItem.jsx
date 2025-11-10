import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item._id);
    } else {
      updateCartItem(item._id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <img
        src={item.productId?.image || 'https://via.placeholder.com/100'}
        alt={item.productId?.name}
        className="w-20 h-20 object-cover rounded"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
        }}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.productId?.name}
        </h3>
        <p className="text-gray-600 text-sm">
          ${item.price.toFixed(2)} each
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors duration-200 font-bold"
        >
          -
        </button>
        <span className="text-lg font-semibold w-8 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors duration-200 font-bold"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-primary-600">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-600 text-sm hover:text-red-700 mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

