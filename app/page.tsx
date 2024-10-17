"use client"; // Mark as client component

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-bg text-primary-text font-sans">
      <header className="bg-dark-grey text-white text-center py-10">
        <h1 className="text-4xl text-accent-orange tracking-wide">Bearhub</h1>
        <p className="text-lg mt-3 text-gray-300">Track the wildest, friendliest bears in your area!</p>
      </header>

      <main className="flex-grow flex items-center justify-center text-center p-4">
        <section className="bg-light-accent p-10 rounded-lg shadow-lg max-w-lg">
          <p className="mb-6 text-lg">
            Join the community to share and track bear sightings. Explore bears in the wild, in zoos, or right in your neighborhood.
          </p>
          <button className="bg-accent-orange text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition ease-in-out duration-300">
            Get Started
          </button>

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
        </section>
      </main>

      <footer className="bg-dark-grey text-white text-center py-4">
        <p>🐻 All the Bears. All the Time. 🐻</p>
      </footer>
    </div>
  );
}
