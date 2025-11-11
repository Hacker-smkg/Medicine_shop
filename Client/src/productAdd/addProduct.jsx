import {  useState} from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  // const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description:"",
    category: "",
    image: "",
    brand:"",
    stock: ""
  });

  // // Check if user is admin
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user")); // Get user from local storage
  //   if (!user || user.role !== "admin") {
  //     navigate("/"); // Redirect if not admin
  //   }
  // }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      await axios.post("http://localhost:8000/api/products", product,{
        headers: { Authorization: `Bearer ${token}` }, // Send token
      });
      alert("Product Added Successfully!");
      setProduct({ name: "", price: "",description:"", category: "", image: "",brand:"", stock: "" });
    } catch (error) {
      console.log("Error adding product", error);
    }
  };
  // console.log(setProduct)

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="description" placeholder="description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="brand" placeholder="Brand Name" value={product.brand} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="stock" placeholder="Stock Quantity" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
