// src/components/CommentsSidebar.js
import React from 'react';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';

const CommentsSidebar = ({ title, content, users, currentUser, onClose }) => {
  const findUserName = (userId) => {
    const user = users.find(user => user.user_id === userId);
    return user ? user.user_name : 'Unknown User';
  };

  console.log('Sidebar Content:', content); // Debugging log

  return (
    <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto">
      <button onClick={onClose} className="bg-red-500 text-white px-3 py-1 rounded mb-4">
        Close
      </button>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {content.map((item, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <strong>
              {item instanceof Comment
                ? item.user_id === currentUser.user_id
                  ? currentUser.user_name
                  : findUserName(item.user_id)
                : item instanceof Like
                ? findUserName(item.user_id) // Ensure this matches the property in the Like object
                : ''}
            </strong>
            :{' '}
            {item instanceof Comment
              ? item.comment_content
              : item instanceof Like
              ? 'Liked this post'
              : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSidebar;
