import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// We must declare the socket outside the component to avoid re-creating it on every render
const socket = io('http://localhost:4000');

const Chat = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Join the chat when the component mounts
    socket.emit('join', username);

    // Listen for incoming messages
    const messageListener = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on('message', messageListener);

    // Clean up on component unmount
    return () => {
      socket.off('message', messageListener);
      // We don't disconnect here because the socket connection is shared
    };
  }, [username]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Live Chat Room</h2>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === username ? 'my-message' : ''} ${msg.user === 'admin' ? 'admin-message' : ''}`}>
            <span className="username">{msg.user}</span>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
