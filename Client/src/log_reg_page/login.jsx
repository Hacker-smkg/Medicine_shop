import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { loginUser } from "../loginapi/api";
import useGetItem from "../hooks/useGetItem";
import { useAuth } from "../utils/contextapi";


function Login() {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const{ setRender}=useGetItem()
    const { auth } = useAuth();
// console.log(user) 
    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await loginUser(user);
        // console.log(response)//
        if (response.status === 200) {
            Swal.fire("Success!", "Login successful", "success");
            auth.login(response.data);
            localStorage.setItem("token", response.data.token); 

            setRender(response)
            sessionStorage.setItem("storage",JSON.stringify(response.data))
            navigate("/"); // Redirect to home page
        } else {
            Swal.fire("Error!", response.data.message, "error");
        }
    };

    return (
        <div className="container flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg ">
                <h6 className="text-center font-semibold mb-4 mt-4" style={{fontSize:"40px"}}>Login</h6>
                <form onSubmit={handleLogin} >
                    <div className="mb-3 "  style={{margin:"0px 20px"}}>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            onChange={onValueChange}
                            placeholder="Enter Email id"
                        />
                    </div>

                    <div className="mb-3"  style={{margin:"0px 20px"}}>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            onChange={onValueChange}
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="flex justify-between"  style={{margin:"0px 20px"}}>
                     <p>if you do not<NavLink to="/register">Register?</NavLink></p>

                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mb-3">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
