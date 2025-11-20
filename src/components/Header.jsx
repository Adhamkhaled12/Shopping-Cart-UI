import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();

  // acc is the accumulator that stores the running total, item is the current item in the array, 0 is the initial value of the accumulator
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">ShopMart</h1>

      <div className="relative">
        <FaShoppingCart className="text-2xl text-gray-700" />
        {/* In case there is a value for the itemCount then render this span */}
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
