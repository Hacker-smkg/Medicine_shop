import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./shop.css"
function Shop() {
const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  
  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/products`);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Fetch categories and brands dynamically
  const fetchFilters = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/products/filters`);
      setCategories(res.data.categories);
      setBrands(res.data.brands);
    } catch (error) {
      console.error("Error fetching filters", error);
    }
  };

  // Handle filter selection
  const handleFilterChange = (type, value) => {
    let updatedCategories = selectedCategory;
    let updatedBrands = selectedBrand;

    if (type === "category") {
      updatedCategories = updatedCategories.includes(value)
        ? updatedCategories.filter((item) => item !== value)
        : [...updatedCategories, value];
      setSelectedCategory(updatedCategories);
    } else if (type === "brand") {
      updatedBrands = updatedBrands.includes(value)
        ? updatedBrands.filter((item) => item !== value)
        : [...updatedBrands, value];
      setSelectedBrand(updatedBrands);
    }

    // Apply filtering logic
    let filtered = products.filter((product) => {
      return (
        (updatedCategories.length === 0 || updatedCategories.includes(product.category)) &&
        (updatedBrands.length === 0 || updatedBrands.includes(product.brand))
      );
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="shop-container">
      {/* Sidebar - Filters */}
      <aside className="sidebar">
        <h2>Filters</h2>

        {/* Category Filter */}
        <div className="filter-group">
          <h3>Category</h3>
          {categories.map((category) => (
            <label key={category} className="filter-item">
              <input
                type="checkbox"
                id={category}
                onChange={() => handleFilterChange("category", category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>

        {/* Brand Filter */}
        <div className="filter-group">
          <h3>Brand</h3>
          {brands.map((brand) => (
            <label key={brand} className="filter-item">
              <input
                type="checkbox"
                id={brand}
                onChange={() => handleFilterChange("brand", brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Product List */}
      <main className="product-section">
        <h2 className="product-heading">Our Medicines</h2>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price-row">
                        <p className="product-price">₹{product.price}</p>
                        <button
                            className="product-button"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            View
                        </button>
                    </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>No products found matching your filters.</h3>
                <p>Try selecting different categories or brands.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Shop;
