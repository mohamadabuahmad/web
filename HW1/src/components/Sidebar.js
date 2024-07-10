import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-gray-800 text-white w-64 p-6 flex flex-col">
    <div className="mb-6">
      <img src="/logo.png" alt="Logo" className="w-full h-auto" />
    </div>
    <nav className="flex-grow">
      <Link to="/home" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Home</Link>
      <Link to="/network" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">My Network</Link>
      <Link to="/messaging" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Messaging</Link>
      <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</Link>
    </nav>
  </div>
);

export default Sidebar;
