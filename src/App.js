import React, { useState } from 'react';
import './App.css';

function App() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [botResponse, setBotResponse] = useState('');

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Send user message to the backend
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const responseData = await response.json();

    // Update chat history
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setMessages([...messages, { role: 'bot', content: responseData.botResponse }]);

    setUserMessage('');
  };

  return (
    <div className="App">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={userMessage}
          onChange={e => setUserMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div className="response-area">
        <p>Bot: {botResponse}</p>
      </div>
    </div>
  );
}

export default App;
