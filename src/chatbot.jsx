import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for Chatbot
const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 60px; /* Adjust this to position it above the chatbot symbol */
  left: 450px;
  width: 300px;
  height: 400px;
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;

  @media (max-width: 768px) {
    width: 80%;
    max-width: 320px;
    height: 350px;
  }

  @media (max-width: 480px) {
    width: 90%;
    max-width: 280px;
    height: 300px;
  }
`;

const ChatHeader = styled.div`
  background-color: #00bcd4;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5em;
    cursor: pointer;
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 0.9em;

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const ChatInput = styled.input`
  border: none;
  padding: 10px;
  width: calc(100% - 20px);
  border-top: 1px solid #444;
  background-color: #222;
  color: #fff;
  font-size: 0.9em;

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const Message = styled.div`
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isBot ? '#444' : '#00bcd4')};
  color: #fff;
  max-width: 80%;
  align-self: ${(props) => (props.isBot ? 'flex-start' : 'flex-end')};
`;

const Chatbot = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, isBot: false }];
      setMessages(newMessages);
      setMessage('');
      // Generate bot response based on rules
      setTimeout(() => {
        const botResponse = generateBotResponse(message);
        setMessages([...newMessages, { text: botResponse, isBot: true }]);
      }, 500); // Simulate delay
    }
  };

  const generateBotResponse = (userMessage) => {
    const lowercasedMessage = userMessage.toLowerCase();

    if (lowercasedMessage.includes('study') || lowercasedMessage.includes('learn')) {
      return 'Great! What topic or subject would you like to focus on?';
    } else if (lowercasedMessage.includes('help') || lowercasedMessage.includes('assist')) {
      return 'I’m here to help! What do you need assistance with?';
    } else if (lowercasedMessage.includes('quiz') || lowercasedMessage.includes('test')) {
      return 'Would you like to take a quiz or practice test?';
    } else if (lowercasedMessage.includes('notes') || lowercasedMessage.includes('summary')) {
      return 'I can provide summaries or notes on various topics. Let me know what you need!';
    } else if (lowercasedMessage.includes('hello') || lowercasedMessage.includes('hi')) {
      return 'Hello! How can I assist you today?';
    } else if (lowercasedMessage.includes('bye') || lowercasedMessage.includes('goodbye')) {
      return 'Goodbye! Have a great day!';
    } else {
      return 'I’m not sure how to help with that. Can you provide more details?';
    }
  };

  return (
    <ChatbotContainer visible={visible}>
      <ChatHeader>
        Chatbot
        <button onClick={onClose}>×</button>
      </ChatHeader>
      <ChatBody>
        {messages.map((msg, index) => (
          <Message key={index} isBot={msg.isBot}>
            {msg.text}
          </Message>
        ))}
      </ChatBody>
      <ChatInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
        placeholder="Type a message..."
      />
    </ChatbotContainer>
  );
};

export default Chatbot;
