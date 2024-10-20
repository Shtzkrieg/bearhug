"use client"; // Mark this as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message);
        document.cookie = `token=${data.token}; path=/; max-age=3600`; // Set token in cookies
        setTimeout(() => {
          router.push('/');
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
    <div className="flex flex-col min-h-screen bg-primary-bg text-primary-text font-sans">
      <header className="bg-dark-grey text-white text-center py-10">
        <h1 className="text-4xl text-accent-orange tracking-wide">Bearhub</h1>
        <p className="text-lg mt-3 text-gray-300">Track the wildest, friendliest bears in your area!</p>
      </header>

      <main className="flex-grow flex items-center justify-center text-center p-4">
        <section className="bg-light-accent p-10 rounded-lg shadow-lg max-w-lg">
          <h2 className="text-2xl mb-6 text-accent-orange">Log In to Bearhub</h2>
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
              className="bg-accent-orange text-white p-2 w-full rounded-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <div className="loader"></div> : 'Log In'}
            </button>
          </form>
          {message && (
            <div className={`mt-4 p-2 w-full max-w-sm text-center rounded-lg ${isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {message}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-dark-grey text-white text-center py-4">
        <p>🐻 All the Bears. All the Time. 🐻</p>
      </footer>
    </div>
  );
}