import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="auth-container">
        <div className="auth-content">
          <h1 className="heading">Welcome to My Tutor</h1>
          {isSignUp ? <SignUpForm /> : <SignInForm />}
          <p onClick={toggleForm} className="toggle-link">
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthPage;
