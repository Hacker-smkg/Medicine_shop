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
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Fetch categories and brands dynamically
  const fetchFilters = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/filters");
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
    <div className="shop-container flex">
      {/* Sidebar - Filters */}
      <div className="sidebar p-4 border-r w-1/4">
        <h2 className="font-bold text-lg mb-2">Filters</h2>

        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Category</h3>
          {categories.map((category) => (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                onChange={() => handleFilterChange("category", category)}
              />
              <label htmlFor={category} className="ml-2">{category}</label>
            </div>
          ))}
        </div>

        {/* Brand Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Brand</h3>
          {brands.map((brand) => (
            <div key={brand}>
              <input
                type="checkbox"
                id={brand}
                onChange={() => handleFilterChange("brand", brand)}
              />
              <label htmlFor={brand} className="ml-2">{brand}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="product-section">
      <h2 className="product-heading">All Products</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
              <button
                className="product-button"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                Product Details
              </button>
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
</div>
  );
}

export default Shop;
