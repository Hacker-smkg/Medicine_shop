import React, { useContext } from "react";
import { CartContext } from "./cartContext";
import { useNavigate } from "react-router-dom";


const AddToCart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
 const navigate=useNavigate()
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Cart</h1>

      {cart.length > 0 ? (
        <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Product</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                    {item.name}
                  </td>
                  <td className="p-2">${item.price.toFixed(2)}</td>
                  <td className="p-2 flex items-center">
                    <button 
                      className="px-2 bg-gray-300 rounded" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      className="px-2 bg-gray-300 rounded" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </td>
                  <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-2">
                    <button 
                      className="px-3 py-1 bg-red-500 text-white rounded" 
                      onClick={() => removeFromCart(item.id)}
                    >Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-bold">Cart Totals</h2>
            <div className="flex justify-between mt-2">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2 font-bold text-lg">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              className="mt-4 w-full bg-yellow-500 py-2 rounded text-white font-bold"
              onClick={()=>navigate("/address")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl font-bold mt-10">Your cart is empty.</p>
      )}
    </div>
  );
};

export default AddToCart;
