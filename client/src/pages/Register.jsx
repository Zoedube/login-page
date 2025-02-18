import React from 'react';
import { Link } from 'react-router-dom';
import signupImage from '../assets/signupImage.jpg'; 
import googleLogo from '../assets/googleLogo.jpg'; 

const Register = () => {
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

          <form>
            <input required type="text" placeholder="Name" />
            <input required type="email" placeholder="Email" />
            <input required type="password" placeholder="Password" />

            <div className="checkbox-container">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button className="register-btn">Register</button>
            <p className="error-message">This is an error!</p>
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

