import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useUser } from '../UserContext';

function FriendsPage() {
  const { currentUser } = useUser();
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.post('/fetch-friends', { user_id: currentUser.user_id });
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    const fetchFollowers = async () => {
      try {
        const response = await axios.post('/fetch-followers', { friend_id: currentUser.user_id });
        setFollowers(response.data.followers);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFriends();
    fetchFollowers();
  }, [currentUser.user_id]);

  const visitProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const removeFriend = async (friendId) => {
    try {
      const response = await axios.post('/remove-friend', { user_id: currentUser.user_id, friend_id: friendId });
      if (response.data.message === 'Friend removed successfully') {
        setMessage('Friend removed successfully');
        setFriends(friends.filter(friend => friend.user_id !== friendId));
        setFollowers(followers.filter(follower => follower.user_id !== friendId));
      } else {
        setMessage('Failed to remove friend');
      }
    } catch (error) {
      console.error('Error removing friend:', error);
      setMessage('Failed to remove friend');
    }
  };

  const followUser = async (userId) => {
    try {
      const response = await axios.post('/add-friend', { user_id: currentUser.user_id, friend_id: userId });
      if (response.data.message === 'Friend added successfully') {
        setMessage('Friend added successfully');
        setFriends([...friends, response.data.friend]);
      } else {
        setMessage('Failed to add friend');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      setMessage('Failed to add friend');
    }
  };

  const searchUsers = async () => {
    try {
      const response = await axios.post('/search-users', { username: searchUsername });
      setSearchResults(response.data.users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="flex-grow p-6">
      <h1 className="text-3xl mb-6">Friends</h1>
      
      {message && <p className={`text-${message.includes('successfully') ? 'green' : 'red'}-500`}>{message}</p>}

      {/* Section 1: Search */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Search</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            placeholder="Enter username"
            className="flex-grow p-2 border rounded"
          />
          <button onClick={searchUsers} className="bg-blue-600 text-white px-4 py-2 rounded ml-2">Search</button>
        </div>
        {searchResults.length > 0 && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map(user => (
                <tr key={user.user_id}>
                  <td className="py-2 px-4 border-b">{user.user_name}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => followUser(user.user_id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Follow
                    </button>
                    <button
                      onClick={() => visitProfile(user.user_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Section 2: Following */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Following</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {friends.map(friend => (
              <tr key={friend.user_id}>
                <td className="py-2 px-4 border-b">{friend.user_name}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => removeFriend(friend.user_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => visitProfile(friend.user_id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Followers */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Followers</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {followers.map(follower => (
              <tr key={follower.user_id}>
                <td className="py-2 px-4 border-b">{follower.user_name}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => removeFriend(follower.user_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => visitProfile(follower.user_id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FriendsPage;
