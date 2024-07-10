import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();

    // Simulate sending an email
    if (email === 'user@example.com') {
      setMessage('A password reset link has been sent to your email.');
    } else {
      setMessage('Email not found.');
    }

    // Redirect to login after some time
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleForgotPassword}>
        <h2 className="text-2xl mb-4">Forgot Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send Reset Link</button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
