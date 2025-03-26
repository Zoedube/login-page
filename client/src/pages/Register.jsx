import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import signupImage from '../assets/signupImage.jpg';
import googleLogo from '../assets/googleLogo.jpg';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [err,setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  //Code for popup after logging in successfully
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    const googleSuccess = urlParams.get("googleSuccess");

    if (token && googleSuccess === "true") {
      localStorage.setItem("access_token", token);
      toast.success("Successfully registered/logged in with Google!");
      window.history.replaceState({}, document.title, "/register");
    }
  }, [location.search]);

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending registration request with:", inputs); 
      const res = await axios.post("https://login-page-1-g98u.onrender.com/api/auth/register", inputs);
      console.log("Registration response:", res.data); 
      toast.success("Successfully registered! Please log in.", {
        position: "top-right",
        autoClose: 3000,
      }); 
      setInputs({ username: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 2000); 
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data);
      toast.error("Registration failed. Please try again.");
    }
  };
  
  // Function to Google OAuth
  const handleGoogleLogin = () => {
    window.location.href = "https://login-page-1-g98u.onrender.com/api/auth/google?returnTo=register";
  };

  return (
    <div className="auth-container">
      <div className="auth">
        <div className="form-container">
          <h1>Sign Up</h1>
          <h2>Create an account to get started.</h2>

          <button className="google-btn" onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google Logo" />
            Continue With Google
          </button>

          <p className="divider">— Or —</p>

          <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="Name" name="username" onChange={handleChange} />
            <input required type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input required type="password" placeholder="Password" name="password" onChange={handleChange} />

            <div className="checkbox-container">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button type="submit" className="register-btn">Register</button>
            {err && <p className="error-message">This is an error!</p>}
            <span>Already have an account? <Link to="/login">Log in</Link></span>
          </form>

        </div>
      </div>

  
      <div className="image-container">
        <img src={signupImage} alt="Abstract Design" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

