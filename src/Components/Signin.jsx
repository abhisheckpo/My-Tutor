import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import signinImage from './undraw_sign_up_n6im.svg';
import { GoogleLogin } from 'react-google-login';
import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background: #121212;
    color: #e0e0e0;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(45deg, #1c1c1c, #121212);
  position: relative;
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1c1c1c, #121212);
  z-index: -1;
  animation: backgroundAnimation 20s linear infinite;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const Header = styled.h1`
  color: #87cefa; /* Light Blue Color */
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: bold;
  animation: headerAnimation 5s ease-in-out infinite;
`;

const Highlight = styled.span`
  color: #00bfff; /* Brighter Light Blue Color */
`;

const PageImage = styled.img`
  width: 70%;
  max-width: 400px;
  margin-top: 20px;
  animation: imageAnimation 6s ease-in-out infinite;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f1f1f;
  border-radius: 10px;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
  padding: 30px;
  position: relative;
  z-index: 1;
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const FormContainer = styled.div`
  width: 100%;
  transition: opacity 0.5s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #2e2e2e;
  color: #e0e0e0;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;
  
  &:focus {
    background-color: #3c3c3c;
    outline: none;
    border-color: #87cefa;
  }
`;

const Button = styled.button`
  padding: 15px;
  border-radius: 5px;
  border: none;
  background-color: #87cefa;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: #00bfff;
    transform: scale(1.05);
  }
`;

const BottomPrompt = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const PromptText = styled.span`
  color: #e0e0e0;
  margin-right: 10px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #87cefa;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s, transform 0.3s;
  
  &:hover {
    color: #00bfff;
    transform: scale(1.05);
  }
`;

const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  accent-color: #87cefa;
`;

const TermsLabel = styled.label`
  color: #e0e0e0;
  font-size: 14px;
`;

const TermsLink = styled.a`
  color: #87cefa;
  text-decoration: underline;
`;

const SocialLoginContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const animations = `
  @keyframes backgroundAnimation {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }

  @keyframes headerAnimation {
    0% { text-shadow: 0 0 5px #87cefa; }
    50% { text-shadow: 0 0 15px #00bfff, 0 0 30px #00bfff; }
    100% { text-shadow: 0 0 5px #87cefa; }
  }

  @keyframes imageAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = animations;
document.head.appendChild(styleSheet);

const Signin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    termsAccepted: false,
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { username, email, name, password, termsAccepted } = signupData;
    if (username && email && name && password && termsAccepted) {
      try {
        await axios.post('http://localhost:8090/register', signupData);
        alert('User Created');
        toggleForm();
      } catch (error) {
        alert('Error creating user');
      }
    } else if (!termsAccepted) {
      alert('You must accept the terms and conditions');
    } else {
      alert('Please fill all the fields');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email && password) {
      try {
        const response = await axios.get('http://localhost:8090/get');
        const userExist = response.data.some(
          (data) => data.email === email && data.password === password
        );
        if (userExist) {
          alert('Login successful');
          navigate('/home');
        } else {
          alert('User Not Found');
        }
      } catch (error) {
        console.error('Error fetching users', error);
        alert('Error logging in');
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  const handleGoogleResponse = (response) => {
    console.log('Google response', response);
    // Handle Google login response here
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundAnimation />
        <LeftSection>
          <Header>
            Welcome to <Highlight>MY TUTOR</Highlight>! Your personal AI-based assistance.
          </Header>
          <PageImage src={signinImage} alt="learning" />
        </LeftSection>
        <RightSection>
          <AuthContainer>
            <FormContainer>
              {isLogin ? (
                <div style={{ width: '100%' }}>
                  <Form onSubmit={handleLoginSubmit}>
                    <label htmlFor="chk" aria-hidden="true" style={{ color: '#e0e0e0', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                      Login
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <Button type="submit">Login</Button>
                  </Form>
                  <BottomPrompt>
                    <PromptText>Don't have an account?</PromptText>
                    <ToggleButton onClick={toggleForm}>Sign Up</ToggleButton>
                  </BottomPrompt>
                </div>
              ) : (
                <div style={{ width: '100%' }}>
                  <Form onSubmit={handleSignupSubmit}>
                    <label htmlFor="chk" aria-hidden="true" style={{ color: '#e0e0e0', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                      Sign Up
                    </label>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={signupData.username}
                      onChange={handleSignupChange}
                      required
                    />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={signupData.name}
                      onChange={handleSignupChange}
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                    />
                    <TermsContainer>
                      <Checkbox
                        type="checkbox"
                        name="termsAccepted"
                        checked={signupData.termsAccepted}
                        onChange={handleSignupChange}
                        required
                      />
                      <TermsLabel>
                        I agree to the <TermsLink href="#">Terms and Conditions</TermsLink>
                      </TermsLabel>
                    </TermsContainer>
                    <Button type="submit">Sign Up</Button>
                  </Form>
                  <BottomPrompt>
                    <PromptText>Already have an account?</PromptText>
                    <ToggleButton onClick={toggleForm}>Login</ToggleButton>
                  </BottomPrompt>
                </div>
              )}
              <SocialLoginContainer>
                <GoogleLogin
                  clientId="92013434432-q0kjpr265lld2ivnnv7jku08t13pjb31.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={handleGoogleResponse}
                  onFailure={handleGoogleResponse}
                  cookiePolicy={'single_host_origin'}
                />
              </SocialLoginContainer>
            </FormContainer>
          </AuthContainer>
        </RightSection>
      </Container>
    </>
  );
};

export default Signin;
