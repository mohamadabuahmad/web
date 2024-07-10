import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const friendsData = [
  { name: 'Alice Johnson', skills: ['JavaScript', 'React', 'Node.js'] },
  { name: 'Bob Smith', skills: ['Python', 'Django', 'Machine Learning'] },
  { name: 'Charlie Brown', skills: ['Java', 'Spring', 'Microservices'] }
];

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

  const addPost = () => {
    if (postContent.trim()) {
      setPosts([{ content: postContent, author: 'You' }, ...posts]);
      setPostContent('');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow p-6">
        <h1 className="text-3xl mb-6">Welcome to the Home Page</h1>
        
        <div className="mb-6">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="What's on your mind?"
          />
          <button onClick={addPost} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Post</button>
        </div>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-semibold mb-2">{post.author}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl mt-6">Friends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {friendsData.map((friend, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{friend.name}</h2>
              <p className="text-gray-700">Skills:</p>
              <ul className="list-disc list-inside">
                {friend.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
