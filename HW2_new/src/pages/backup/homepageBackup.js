import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CommentsSidebar from '../CommentsSidebar';
import { Post } from '../../entities/Post';
import { Comment } from '../../entities/Comment';
import { Like } from '../../entities/Like';
import axios from '../../api/axios';

function HomePage() {
  const location = useLocation();
  const initialState = location.state?.user || { user_id: 1, user_name: 'You' }; // Use the user from location state or a default value
  const [currentUser, setCurrentUser] = useState(initialState);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarContent, setSidebarContent] = useState([]);
  const [sidebarTitle, setSidebarTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/fetch-data');
        const { posts, comments, likes, users } = response.data;

        const postsWithDetails = posts.map(post => {
          const postLikes = likes.filter(like => like.post_id === post.post_id);
          const postComments = comments.filter(comment => comment.post_id === post.post_id);
          return new Post(
            post.user_id,
            post.post_id,
            post.post_content,
            post.post_date,
            postLikes.map(like => new Like(like.post_id, like.user_id)),
            postComments.map(comment => new Comment(comment.post_id, comment.user_id, comment.comment_content, comment.comment_id))
          );
        });

        setPosts(postsWithDetails);
        setUsers(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addPost = async () => {
    if (postContent.trim()) {
      const newPost = {
        user_id: currentUser.user_id,
        post_content: postContent,
        post_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        likes_num: 0,
        comments_num: 0
      };

      try {
        const response = await axios.post('/add-post', newPost);
        if (response.data.message === 'Post added successfully') {
          setMessage('Post added successfully');
          setPosts([
            new Post(
              currentUser.user_id,
              response.data.post_id,
              postContent,
              new Date().toLocaleString(),
              [],
              []
            ),
            ...posts
          ]);
          setPostContent('');
        } else {
          setMessage('Failed to add post');
        }
      } catch (error) {
        console.error('Error adding post:', error);
        setMessage('Failed to add post');
      }
    }
  };

  const toggleLike = async (postId) => {
    try {
      const response = await axios.post('/toggle-like', { post_id: postId, user: currentUser });
      if (response.data.message === 'Like toggled successfully') {
        const updatedPosts = posts.map(post => {
          if (post.post_id === postId) {
            const userHasLiked = post.likes.some(like => like.user === currentUser.user_id);
            if (userHasLiked) {
              post.likes = post.likes.filter(like => like.user !== currentUser.user_id);
            } else {
              post.likes.push(new Like(postId, currentUser.user_id));
            }
          }
          return post;
        });
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const addComment = async (postId, commentContent) => {
    const commentData = {
      post_id: postId,
      user_id: currentUser.user_id,
      comment_content: commentContent,
      comment_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    try {
      const response = await axios.post('/add-comment', { ...commentData, user: currentUser });
      if (response.data.message === 'Comment added successfully') {
        const updatedPosts = posts.map(post => {
          if (post.post_id === postId) {
            post.comments.push(new Comment(postId, currentUser.user_id, commentContent, `comment_${post.comments.length + 1}`));
            post.comments_num += 1;
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        setMessage('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setMessage('Failed to add comment');
    }
  };

  const showComments = (comments) => {
    setSidebarContent(comments);
    setSidebarTitle('Comments');
    setShowSidebar(true);
  };

  const showLikes = (likes) => {
    setSidebarContent(likes);
    setSidebarTitle('Likes');
    setShowSidebar(true);
  };

  const findUserName = (userId) => {
    if (!users || users.length === 0) return 'Unknown User';
    const user = users.find(user => user.user_id === userId);
    return user ? user.user_name : 'Unknown User';
  };

  return (
    <div className="flex-grow p-6">
      <h1 className="text-3xl mb-6">Welcome to the Home Page</h1>
      
      <div className="mb-6">
        {message && <p className="text-red-500">{message}</p>}
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="What's on your mind?"
        />
        <button onClick={addPost} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Post</button>
      </div>
  
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.post_id} className="bg-white p-6 rounded-lg shadow-md relative">
            <span className="absolute top-2 right-2 text-gray-600 text-sm">{post.post_date}</span>
            <h2 className="font-semibold mb-2">{post.username}</h2>
            <p>{post.post_content}</p>
            <div className="mt-4">
              <span
                onClick={() => showLikes(post.likes)}
                className="cursor-pointer text-blue-500 mr-4"
              >
                Likes: {post.likes.length}
              </span>
              <span
                onClick={() => showComments(post.comments)}
                className="cursor-pointer text-blue-500 mr-4"
              >
                Comments: {post.comments.length}
              </span>
            </div>
            <CommentSection post={post} addComment={addComment} toggleLike={toggleLike} users={users} currentUser={currentUser} />
          </div>
        ))}
      </div>
      {showSidebar && (
        <CommentsSidebar
          title={sidebarTitle}
          content={sidebarContent}
          users={users}
          currentUser={currentUser}
          onClose={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
  
}

function CommentSection({ post, addComment, toggleLike, users, currentUser }) {
  const [commentContent, setCommentContent] = useState('');

  const handleAddComment = () => {
    if (commentContent.trim()) {
      addComment(post.post_id, commentContent);
      setCommentContent('');
    }
  };

  const findUserName = (userId) => {
    if (!users || users.length === 0) return 'Unknown User';
    const user = users.find(user => user.user_id === userId);
    return user ? user.user_name : 'Unknown User';
  };

  return (
    <div className="flex flex-col mt-4">
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Write a comment..."
      />
      <div className="flex items-center mt-2">
        <button
          onClick={() => toggleLike(post.post_id)}
          className="bg-blue-500 text-white px-3 py-1 rounded mr-4"
        >
          {post.likes.some(like => like.user === currentUser.user_id) ? 'Unlike' : 'Like'}
        </button>
        <button
          onClick={handleAddComment}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300"
        >
          Add Comment
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {post.comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <strong>{comment.user_id === currentUser.user_id ? currentUser.user_name : findUserName(comment.user_id)}:</strong> {comment.comment_content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
