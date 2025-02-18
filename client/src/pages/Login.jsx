import React from 'react'
import { Link } from "react-router-dom";
import signupImage from '../assets/signupImage.jpg'; 
import googleLogo from '../assets/googleLogo.jpg'; 

const Login = () => {
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
            <input required type="email" placeholder="Email" />
            <input required type="password" placeholder="Password" />
            <button className="login-btn">Sign in</button>
            <p className="error-message">This is an error!</p>
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
