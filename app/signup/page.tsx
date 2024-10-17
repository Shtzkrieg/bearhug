"use client"; // Mark this as a client component

import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('Account created successfully!');
    } else {
      alert('Failed to create account.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-bg text-primary-text">
      <h1 className="text-4xl mb-6 text-accent-orange">Create a Bearhub Account</h1>
      <form onSubmit={handleSignup} className="bg-light-accent p-8 rounded-lg shadow-lg w-full max-w-sm">
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
          Sign Up
        </button>
      </form>
    </div>
  );
}
