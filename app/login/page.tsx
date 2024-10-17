"use client"; // This file is a client-side script

import { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Logged in successfully!');
    } else {
      alert('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-bg text-primary-text">
      <h1 className="text-4xl mb-6 text-accent-orange">Log In to Bearhub</h1>
      <form onSubmit={handleLogin} className="bg-light-accent p-8 rounded-lg shadow-lg w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-accent-orange text-white rounded-lg hover:bg-orange-500 transition ease-in-out duration-300"
        >
          Log In
        </button>
      </form>

      {/* Updated Link without <a> tag */}
      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <Link href="/signup" className="text-accent-orange hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
