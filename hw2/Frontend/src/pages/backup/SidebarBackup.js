import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const currentUser = { user_id: 20 }; // Replace this with the actual current user ID

  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2"><Link to="/home" className="text-blue-600">Home</Link></li>
        <li className="mb-2"><Link to={`/profile/${currentUser.user_id}`} className="text-blue-600">Profile</Link></li>
        <li className="mb-2"><Link to="/settings" className="text-blue-600">Settings</Link></li>
        <li className="mb-2"><Link to="/notifications" className="text-blue-600">Notifications</Link></li>
        <li className="mb-2"><Link to="/messages" className="text-blue-600">Messages</Link></li>
        <li className="mb-2"><Link to="/friends" className="text-blue-600">Friends</Link></li>
        <li className="mb-2"><Link to="/logout" className="text-blue-600">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
