import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Keyframes for bubble animation
const bubblePop = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

// Keyframes for color transition (optional)
const colorTransition = keyframes`
  0% { background: rgba(255, 105, 180, 0.5); }
  25% { background: rgba(0, 255, 255, 0.5); }
  50% { background: rgba(255, 215, 0, 0.5); }
  75% { background: rgba(255, 69, 0, 0.5); }
  100% { background: rgba(255, 105, 180, 0.5); }
`;

// Styled components with animation
const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center horizontally and vertically */
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #000000 0%, #1c1c1c 100%);
  color: #e0e0e0;
  overflow: hidden;
  position: relative;
`;

const AnimatedBackground = styled.div`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 105, 180, 0.5) 10%, transparent 30%),
              radial-gradient(circle, rgba(0, 255, 255, 0.5) 10%, transparent 30%),
              radial-gradient(circle, rgba(255, 215, 0, 0.5) 10%, transparent 30%),
              radial-gradient(circle, rgba(255, 69, 0, 0.5) 10%, transparent 30%),
              radial-gradient(circle, rgba(0, 128, 0, 0.5) 10%, transparent 30%),
              radial-gradient(circle, rgba(255, 0, 0, 0.5) 10%, transparent 30%),
              radial-gradient(circle, rgba(75, 0, 130, 0.5) 10%, transparent 30%),
              radial-gradient(circle, rgba(255, 20, 147, 0.5) 10%, transparent 30%);
  background-position: 10% 10%, 30% 30%, 50% 50%, 70% 70%, 90% 90%, 10% 80%, 80% 20%, 50% 90%;
  background-size: 20% 20%, 20% 20%, 20% 20%, 20% 20%, 20% 20%, 20% 20%, 20% 20%, 20% 20%;
  background-repeat: no-repeat;
  animation: ${colorTransition} 15s linear infinite;
  z-index: 0;
`;

const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color};
  animation: ${bubblePop} 4s ease-in-out infinite;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
`;

const Header = styled.header`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #111111;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out;
  position: absolute; /* Position header at the top */
  top: 0;
  left: 0;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #1e90ff;
  animation: ${slideUp} 1s ease-out;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background-color: #111111;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${fadeIn} 1s ease-out;
  z-index: 1;
  margin-top: 100px; /* Space for header */
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #000000;
  color: #e0e0e0;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:focus {
    background-color: #1e1e1e;
    transform: scale(1.02);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #000000;
  color: #e0e0e0;
  resize: vertical;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:focus {
    background-color: #1e1e1e;
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #1e90ff;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #1c86ee;
    transform: scale(1.05);
  }

  &:active {
    background-color: #1a77d7;
  }
`;

const ResponseMessage = styled.p`
  margin-top: 20px;
  font-size: 1.2em;
  color: ${(props) => (props.success ? '#32cd32' : '#ff4500')};
  animation: ${fadeIn} 1s ease-out;
  z-index: 1;
`;

const bubbles = [
  { size: '60px', color: 'rgba(255, 105, 180, 0.5)' },
  { size: '80px', color: 'rgba(0, 255, 255, 0.5)' },
  { size: '100px', color: 'rgba(255, 215, 0, 0.5)' },
  { size: '120px', color: 'rgba(255, 69, 0, 0.5)' },
  { size: '140px', color: 'rgba(0, 128, 0, 0.5)' },
  { size: '160px', color: 'rgba(255, 0, 0, 0.5)' },
  { size: '180px', color: 'rgba(75, 0, 130, 0.5)' },
  { size: '200px', color: 'rgba(255, 20, 147, 0.5)' }
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8090/contact', {
        name,
        email,
        message
      });
      if (response.status === 200) {
        setResponseMessage('Message sent successfully!');
      }
    } catch (error) {
      setResponseMessage('Failed to send message.');
    }
  };

  return (
    <Container>
      <AnimatedBackground />
      {bubbles.map((bubble, index) => (
        <Bubble
          key={index}
          color={bubble.color}
          style={{
            width: bubble.size,
            height: bubble.size,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      ))}
      <Header>
        <Title>Contact Us</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextArea
          rows="6"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit">Send Message</Button>
        {responseMessage && (
          <ResponseMessage success={responseMessage.includes('successfully')}>
            {responseMessage}
          </ResponseMessage>
        )}
      </Form>
    </Container>
  );
};

export default Contact;
