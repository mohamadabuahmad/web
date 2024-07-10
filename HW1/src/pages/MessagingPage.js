import React from 'react';

const friendsData = [
  { name: 'Alice Johnson' },
  { name: 'Bob Smith' },
  { name: 'Charlie Brown' }
];

const messagesData = [
  { from: 'Alice Johnson', message: 'Hey, how are you?' },
  { from: 'You', message: 'I am good, thanks!' },
  { from: 'Bob Smith', message: 'What are you working on?' }
];

function MessagingPage() {
  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Friends</h2>
        <ul>
          {friendsData.map((friend, index) => (
            <li key={index} className="py-2 px-4 rounded transition duration-200 hover:bg-gray-700">{friend.name}</li>
          ))}
        </ul>
      </div>
      <div className="flex-grow p-6">
        <h1 className="text-3xl mb-6">Messaging</h1>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {messagesData.map((msg, index) => (
            <div key={index}>
              <strong>{msg.from}:</strong>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessagingPage;
