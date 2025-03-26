import React, { useState, useEffect } from "react"; 
import { Link, useLocation } from "react-router-dom";
import signupImage from '../assets/signupImage.jpg';
import googleLogo from '../assets/googleLogo.jpg';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const location = useLocation();

//Code to create popup after login
useEffect(() => {
  const urlParams = new URLSearchParams(location.search); 
  const token = urlParams.get("token");
  const googleSuccess = urlParams.get("googleSuccess");

  if (token && googleSuccess === "true") {
    localStorage.setItem("access_token", token);
    toast.success("Successfully logged in with Google!");
    window.history.replaceState({}, document.title, "/login");
  }
}, [location.search]);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://login-page-1-g98u.onrender.com/api/auth/login", {
        username: inputs.username,
        password: inputs.password,
      });
      localStorage.setItem("access_token", res.data.access_token); 
      toast.success("Successfully logged in!"); 
      console.log(res.data);
      setInputs({ username: "", password: "" }); 
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError("User not found!");
      toast.error("Login failed. Please check your credentials."); 
    }
  };

// Code for function to Google OAuth
const handleGoogleLogin = () => {
  window.location.href = "https://login-page-1-g98u.onrender.com/api/auth/google?returnTo=login";
};

  return (
    <div className="auth-container">
      <div className="auth">
        <div className="form-container">
          <h1>Welcome back</h1>
          <h2>Please enter your details to sign in</h2>

          <button className="google-btn" onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google Logo" />
            Continue With Google
          </button>
          <div className="divider">or</div>

          <form onSubmit={handleSubmit}>
            <input
              required
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username} 
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password} 
              onChange={handleChange}
            />
            <button type="submit" className="login-btn">Sign in</button>
            {err && <p className="error-message">{err}</p>}
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
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

export default Login;

