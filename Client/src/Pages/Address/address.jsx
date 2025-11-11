import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigation
import "./address.css";
import { CartContext } from "../Addtocart/cartContext";
import Swal from "sweetalert2";

const Address = () => {
  const navigate = useNavigate(); // React Router navigation
  const { cart } = useContext(CartContext);

  // State to store user address
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    zipCode: "",
    city: "",
    phone: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Validate Address Form
  const isAddressValid = () => {
    return (
      address.firstName.trim() &&
      address.lastName.trim() &&
      address.address1.trim() &&
      address.zipCode.trim() &&
      address.city.trim() &&
      address.phone.trim()
    );
  };

  // Calculate Subtotal
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate Tax
  const taxCalculator = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const isTaxable = item.price > 4;
      const taxRate = 5;
      const tax = isTaxable ? itemTotal * (taxRate / 100) : 0;

      return total + tax;
    }, 0);
  };

  // Calculate Order Total
  const TotalPayment = () => {
    return calculateTotal() + taxCalculator();
  };

  // Handle Place Order Click
  const handlePlaceOrder = () => {
    const user = localStorage.getItem("user"); // Check if user is logged in

    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in to continue with the payment.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Redirect to login page
        }
      });
      return;
    }

    if (!isAddressValid()) {
      Swal.fire({
        title: "Address Required",
        text: "Please fill in all required address fields before proceeding.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // ✅ User is logged in & address is valid → Go to payment page
    navigate("/payment");
  };

  return (
    <div className="checkout-container">
      {/* Left Section - Shipping Address */}
      <div className="shipping-address">
        <h2>Shipping Address</h2>
        <form>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name*"
              className="input-field"
              value={address.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name*"
              className="input-field"
              value={address.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="address1"
            placeholder="Address line 1*"
            className="input-field full-width"
            value={address.address1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address2"
            placeholder="Address line 2 (Optional)"
            className="input-field full-width"
            onChange={handleChange}
          />
          <div className="form-row">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip code*"
              className="input-field"
              value={address.zipCode}
              onChange={handleChange}
              required
            />
            <select className="input-field">
              <option>State</option>
            </select>
            <input
              type="text"
              name="city"
              placeholder="City*"
              className="input-field"
              value={address.city}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone number*"
            className="input-field full-width"
            value={address.phone}
            onChange={handleChange}
            required
          />
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="order-details">
          <div className="order-row">
            <span>Subtotal</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="order-row">
            <span>Shipping (2 items)</span>
            <span className="free">FREE</span>
          </div>
          <div className="order-row">
            <span>Estimated Tax</span>
            <span>${taxCalculator().toFixed(2)}</span>
          </div>
          <hr />
          <div className="order-total">
            <span>Order Total</span>
            <span>${TotalPayment().toFixed(2)}</span>
          </div>
          <p className="savings">You Saved $29.51</p>
        </div>

        {/* Place Order Button */}
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>

        {/* Customer Support */}
        <div className="support">
          <p>Need help? <a href="#">Chat with us</a> or call <strong>1-800-289-6229</strong></p>
        </div>

        {/* Macy's Card Offer */}
        <div className="offer">
          <p>
            Save <strong>20% off today and tomorrow</strong> when you become a Macy’s Cardholder.
            <a href="#"> Apply Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Address;
