import React from 'react';
import { Link } from 'react-router-dom';
import signupImage from '../assets/signupImage.jpg';
import googleLogo from '../assets/googleLogo.jpg';
import axios from "axios";
import { useState } from "react";


const Register = () => {

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
    e.preventDefault()

    try {
      const res = await axios.post("/auth/register", inputs)
      console.log(res)
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth">
        <div className="form-container">
          <h1>Sign Up</h1>
          <h2>Create an account to get started.</h2>

          <button className="google-btn">
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
            {err & <p className="error-message">This is an error!</p>}
            <span>Already have an account? <Link to="/login">Log in</Link></span>
          </form>

        </div>
      </div>

      {/* Right-side image */}
      <div className="image-container">
        <img src={signupImage} alt="Abstract Design" />
      </div>
    </div>
  );
};

export default Register;

