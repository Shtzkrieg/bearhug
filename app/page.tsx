"use client"; // Mark this as a client component

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const isLoggedInCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('isLoggedIn='))
      ?.split('=')[1];

    setIsLoggedIn(isLoggedInCookie === 'true');
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg text-primary-text font-sans">
      <header className="bg-dark-grey text-white text-center py-10">
        <h1 className="text-4xl text-accent-orange tracking-wide">Bearhub</h1>
        <p className="text-lg mt-3 text-gray-300">Track the wildest, friendliest bears in your area!</p>
        <div className="absolute top-4 right-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="bg-accent-orange text-white py-2 px-4 rounded-lg"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                My Account
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-accent-orange text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition ease-in-out duration-300">
                Log In
              </button>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center text-center p-4">
        <section className="bg-light-accent p-10 rounded-lg shadow-lg max-w-lg">
          <p className="mb-6 text-lg">
            Join the community to share and track bear sightings. Explore bears in the wild, in zoos, or right in your neighborhood.
          </p>
          <button className="bg-accent-orange text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition ease-in-out duration-300">
            Get Started
          </button>

          {!isLoggedIn && (
            <div className="flex justify-center space-x-6 mt-6">
              <Link href="/login">
                <button className="bg-dark-grey text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition ease-in-out duration-300">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-accent-orange text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition ease-in-out duration-300">
                  Sign Up
                </button>
              </Link>
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