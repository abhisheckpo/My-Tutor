import React from 'react'
import '../App.css';
import { useState } from 'react';
import App from '../App';

const Login1 = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [done,setDone] =useState(true);
    const handleSignupClick = () => {
      setIsLogin(false);
    };
  
    const handleLoginClick = () => {
      setIsLogin(true);
    };
  
    return (
      <>
      {done ? <App/> : 
      <div className="wrapper">
        <div className="title-text">
          <div
            className="title login"
            style={{ marginLeft: isLogin ? '16%' : '-50%' }}
          >
            Login 
          </div>
          <div
            className="title signup"
            style={{ marginLeft: isLogin ? '50%' : '0%' }}
          >
            Signup
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={handleLoginClick}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={handleSignupClick}
            />
            <label
              htmlFor="login"
              className="slide login"
            >
              Login
            </label>
            <label
              htmlFor="signup"
              className="slide signup"
            >
              Signup
            </label>
            <div
              className="slider-tab"
              style={{ left: isLogin ? '0%' : '50%' }}
            ></div>
          </div>
          <div className="form-inner">
            {isLogin ? (
              <form className="login" onSubmit={()=>setDone(true)}>
                <div className="field">
                  <input type="text" placeholder="Email Address" required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" required />
                </div>
                <div className="pass-link">
                  <a href="#">Reset password?</a>
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Don't Have Account?{' '}
                  <a href="#" onClick={handleSignupClick}>
                    Create A New
                  </a>
                </div>
              </form>
            ) : (
              <form className="signup" onSubmit={()=>setDone(true)}>
                <div className="field">
                  <input type="text" placeholder="Email Address" required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" required />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>}
      </>
    );
  


  
}

export default Login1;