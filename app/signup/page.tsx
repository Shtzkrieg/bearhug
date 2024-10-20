"use client"; // Mark this as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!validateEmail(email)) {
      setLoading(false);
      setIsSuccess(false);
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message);
        setTimeout(() => {
          router.push('/?signup=success');
        }, 3000); // Redirect to the main page after 3 seconds
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setIsSuccess(false);
      setMessage('An unexpected error occurred. Please try again later.');
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
          className="bg-accent-orange text-white p-2 w-full rounded-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <div className="loader"></div> : 'Sign Up'}
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-2 w-full max-w-sm text-center rounded-lg ${isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {message}
          {isSuccess && <p>You will be redirected to the main page shortly...</p>}
        </div>
      )}
    </div>
  );
}