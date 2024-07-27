import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Sidebar from '../pages/Sidebar'; // Adjust the path as necessary

const MessagingPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('/conversations');
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations', error);
      }
    };

    fetchConversations();
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async () => {
    if (selectedConversation && message) {
      try {
        await axios.post(`/conversations/${selectedConversation.id}/messages`, { content: message });
        setMessage('');
        // Optionally, fetch messages again to update the conversation
      } catch (error) {
        console.error('Error sending message', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1>Messaging Page</h1>
        <div className="conversations">
          <ul>
            {conversations.map(convo => (
              <li key={convo.id} onClick={() => handleSelectConversation(convo)}>
                {convo.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedConversation && (
          <div className="messages">
            <h2>{selectedConversation.name}</h2>
            <ul>
              {selectedConversation.messages.map(msg => (
                <li key={msg.id}>{msg.content}</li>
              ))}
            </ul>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;
