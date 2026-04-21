import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./details.css";
import { CartContext } from "../../Addtocart/cartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get addToCart function from CartContext
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details from API
  async function fetchProductDetails() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/products/${id}`);
      const result = await response.json();
      setProduct(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  }

  // Handle Add to Cart and redirect
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigate("/addtocart"); // Redirect to cart page
  };

  // Handle quantity change
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  // Loading State with Animated Spinner
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    );
  }

  // If product is not found
  if (!product) {
    return <div className="error-message">Product not found!</div>;
  }

  return (
    <div className="product-details-container">
      <div className="section">
        <div className="breadcrumb">
          <span>Home</span> / <span>{product.category}</span> / <span>{product.name}</span>
        </div>

        <div className="product-content">
          <div className="image-gallery">
            <img src={product.image} alt={product.name} className="main-image" />
          </div>

          <div className="product-info">
            <span className="category-badge">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">
              ₹{product.price} <span className="free-shipping">Free Shipping</span>
            </div>
            <p className="description">{product.description}</p>

            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange("decrease")}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange("increase")}>+</button>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <div className="additional-details">
              <p style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                Guaranteed safe checkout
              </p>
              <ul>
                <li>Money Back Guarantee</li>
                <li>Hassle Free Refunds</li>
                <li>Secure Payments</li>
                <li>24/7 Pharmacy Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
