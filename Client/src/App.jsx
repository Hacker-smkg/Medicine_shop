import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Navbar/nav';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import About from './Pages/About';
import Contact from './Pages/contact';
import Home from './Pages/Home';
import Login from './log_reg_page/login';
import Register from './log_reg_page/register';
import Shop from './Pages/ShopingView/shop';
import AddProduct from './productAdd/addProduct';
import ProductDetails from './Pages/ShopingView/prodictDetails/productdetails';
import Addtocart from './Pages/Addtocart/cart';
import { AuthProvider } from './utils/contextapi';
import CartProvider from './Pages/Addtocart/cartContext';
import Address from './Pages/Address/address';
import Footer from './Navbar/footer';


// Protected Route Component
// function ProtectedRoute({ children }) {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user?.role === "admin" ? children : <Navigate to="/login" />;
// }

function App() {
  return (
    <>
    <CartProvider>
      <Router>

      <AuthProvider>
        <Nav />
      </AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/contact' element={<Contact />} />

          <Route path='/login' element={<AuthProvider><Login /></AuthProvider>} />
          <Route path='/register' element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          <Route path="/address" element={
<AuthProvider>

          <Address/>
</AuthProvider>
          }/>

        
          {/* Protected Add Product Route */}
          <Route path='/addproduct' element={
   
            <AuthProvider>
              <AddProduct />

            </AuthProvider>
           
          } />
          <Route path='/addtocart' element={<Addtocart/>}/>
     
        </Routes>
         <Footer/>
      </Router>
      </CartProvider>
    </>
  )
}

export default App;
