"use client"


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import the useRouter hook from next/navigation

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();  // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://34.123.207.48/users/login/', {
    // const response = await fetch('https://web.tok2dbs.com/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Login successful!');
      localStorage.setItem('token', data.token);
      router.push('/connect2dbs');  // Redirect to the connectToDB page
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 rounded-md text-white font-semibold hover:bg-blue-900 focus:outline-none focus:bg-blue-700"
          >
            Login
          </button>
        </form>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
