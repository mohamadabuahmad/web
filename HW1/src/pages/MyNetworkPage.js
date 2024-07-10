import React from 'react';

const friendsData = [
  { name: 'Alice Johnson' },
  { name: 'Bob Smith' },
  { name: 'Charlie Brown' }
];

function MyNetworkPage() {
  return (
    <div>
      <h1 className="text-3xl mb-6">My Network</h1>
      <ul className="space-y-4">
        {friendsData.map((friend, index) => (
          <li key={index} className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
            <span>{friend.name}</span>
            <div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Chat</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyNetworkPage;
