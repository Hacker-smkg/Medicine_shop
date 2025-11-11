import { Link } from "react-router-dom";
import React from "react";
import "./footer.css";
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Us Section */}
                <div className="footer-section">
                    <h2>About Us</h2>
                    <div className="underline"></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eiusmod tempor incididunt ut labore dolore magna.</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-google"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-vimeo"></i></a>
                        <a href="#"><i className="fab fa-pinterest"></i></a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section">
                    <h2>Quick Links</h2>
                    <div className="underline"></div>
                    <ul>
                        <Link to="/" >Home</Link>
                        <Link to="/about" >About</Link>
                        <Link to="/shop" >Shop</Link>
                        <Link to="/contact" >Contact Us</Link>
                    </ul>
                </div>

                {/* Open Hours Section */}
                <div className="footer-section">
                    <h2>Open Hours</h2>
                    <div className="underline"></div>
                    <p>Monday - Friday: <span>8:00 - 20:00</span></p>
                    <p>Saturday: <span>9:00 - 18:30</span></p>
                    <p>Monday - Thursday: <span>9:00 - 15:00</span></p>
                </div>

                {/* Newsletter Section */}
                <div className="footer-section">
                    <h2>Newsletter</h2>
                    <div className="underline"></div>
                    <p>Subscribe to our newsletter to get updates in your inbox.</p>
                    <div className="newsletter">
                        <input type="email" placeholder="Email Address" />
                        <button><SendIcon/></button>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} | All Rights Reserved by <a href="#">YourWebsite.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;

{/* <Link to="/" >Home</Link>
                            <Link to="/about" >About</Link>
                            <Link to="/shop" >Shop</Link>
                            <Link to="/contact" >Contact Us</Link> */}