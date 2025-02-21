import React from 'react'
import { Link } from "react-router-dom";
import signupImage from '../assets/signupImage.jpg'; 
import googleLogo from '../assets/googleLogo.jpg'; 
import { useState } from "react";
import axios from "axios";


const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [err,setError] = useState(null)

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, inputs, {
        withCredentials: true
      });
      console.log(res);
    } catch (err) {
      setError(err.response.data);
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth">
        <div className="form-container">
          <h1>Welcome back</h1>
          <h2>Please enter your details to sign in</h2>
          
         <button className="google-btn">
                   <img src={googleLogo} alt="Google Logo" />
                     Continue With Google
                   </button>
          <div className="divider">or</div>
          
          <form>
            <input required type="username" placeholder="username" name="username" onChange={handleChange} />
            <input required type="password" placeholder="Password" name="password" onChange={handleChange} />
            <button onClick={handleSubmit}className="login-btn">Sign in</button>
            {err && <p className="error-message">This is an error!</p>}
            <span>Don't have an account? <Link to="/register">Register</Link></span>
          </form>
        </div>
      </div>
      
      <div className="image-container">
              <img src={signupImage} alt="Abstract Design" />
            </div>
          </div>
  )
}

export default Login
