import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import Chatbot from './chatbot';


const ChatbotButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #00bcd4;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  z-index: 1000;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00a8a8;
  }

  &:focus {
    outline: none;
  }
`;
const Chat = () => {
  const [chatVisible, setChatVisible] = useState(false);

  // Define the spring animation for the chatbot visibility
  const chatbotSpring = useSpring({
    opacity: chatVisible ? 1 : 0,
    transform: chatVisible ? 'translateY(0)' : 'translateY(100px)',
    config: { duration: 300 },
  });

  const handleChatbotClick = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div>
      {/* Your existing JSX */}
      <ChatbotButton onClick={handleChatbotClick}>
        <span>🤖</span>
      </ChatbotButton>
      <animated.div style={chatbotSpring}>
        <Chatbot visible={chatVisible} onClose={() => setChatVisible(false)} />
      </animated.div>
      {/* Rest of your JSX */}
    </div>
  );
};

export default Chat;
