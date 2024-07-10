import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

function ProfilePage({ onLogout }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(null);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePicURL(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex min-h-screen">
     
      <div className="flex-grow p-6">
        <h1 className="text-3xl mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            {profilePicURL && <img src={profilePicURL} alt="Profile" className="w-32 h-32 rounded-full mb-4" />}
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          </div>
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button onClick={handleSaveChanges} className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          <button onClick={toggleTheme} className="bg-blue-600 text-white px-4 py-2 rounded">
            Toggle Theme
          </button>
          <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
