import { useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
const navigate=useNavigate()
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validName = useRef(null);
  const validEmail = useRef(null);
  const validMobile = useRef(null);
  const validPassword = useRef(null);

  const submitData = async (e) => {
    e.preventDefault();

    // Client-side Validation
    if (!user.name) {
      Swal.fire("Error", "Please Enter Your Name", "error");
      validName.current?.focus();
      return;
    }
    if (!user.email) {
      Swal.fire("Error", "Please Enter Your Email", "error");
      validEmail.current?.focus();
      return;
    }
    if (!user.mobile) {
      Swal.fire("Error", "Please Enter Your Mobile Number", "error");
      validMobile.current?.focus();
      return;
    }
    if (user.mobile.length !== 10) {
      Swal.fire("Error", "Please Enter a 10-digit Mobile Number", "error");
      validMobile.current?.focus();
      return;
    }
    if (!user.password) {
      Swal.fire("Error", "Please Enter Your Password", "error");
      validPassword.current?.focus();
      return;
    }

    // Send Data to Backend
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/add`, user);

      if (response.status === 200) {
        Swal.fire("Success", "User Registered Successfully!", "success");
        setUser({ name: "", mobile: "", email: "", password: "" }); // Clear input fields
        
      }
      //redirect to login page
      if (response.status===200){
        navigate("/login")
      }
    } catch (error) {
      console.error("Error while registering user:", error);
      Swal.fire("Error", "Registration Failed. Try Again.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg" style={{ 
  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
}}>
    <h6 className=" text-center font-semibold mt-4 mb-4" style={{fontSize:"40px"}}>Registration Form</h6>
    <form onSubmit={submitData}>
      <div className="mb-4" style={{margin:"0px 20px"}}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">Name</label>
        <input
          type="text"
          name="name"
          className="mt-1 p-2  w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none "
          id="name"
          placeholder="Enter Your Name"
          value={user.name}
          onChange={onValueChange}
          ref={validName}
        />
      </div>

      <div className="mb-4" style={{margin:"0px 20px"}}>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
        <input
          type="text"
          name="mobile"
          className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          id="mobile"
          placeholder="Enter Your Mobile Number"
          value={user.mobile}
          onChange={onValueChange}
          ref={validMobile}
        />
      </div>

      <div className="mb-4" style={{margin:"0px 20px"}}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          id="email"
          placeholder="Enter Your Email"
          value={user.email}
          onChange={onValueChange}
          ref={validEmail}
        />
      </div>

      <div className="mb-4" style={{margin:"0px 20px"}}>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          id="password"
          placeholder="Enter Your 6 Digit Password "
          value={user.password}
          onChange={onValueChange}
          ref={validPassword}
        />
      </div>

      <div className="text-center  " style={{margin:"30px 40px" }}>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white w-full rounded-full hover:bg-blue-600 transition" >
          Register
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default Register;
