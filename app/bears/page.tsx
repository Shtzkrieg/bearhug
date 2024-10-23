"use client";

import { useState, useEffect } from 'react';
import { Bear } from '@prisma/client';
import CreateBearProfile from '../components/CreateBearProfile';
import CollapsibleContainer from '../components/CollapsibleContainer';

function BearsList() {
  const [bears, setBears] = useState<Bear[]>([]);

  const fetchBears = () => {
    fetch('/api/bears')
      .then((response) => response.json())
      .then((data: Bear[]) => setBears(data));
  };

  useEffect(() => {
    fetchBears();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg text-primary-text font-sans">
      <header className="bg-dark-grey text-white text-center py-10">
        <h1 className="text-4xl text-accent-orange tracking-wide">Bearhub</h1>
        <p className="text-lg mt-3 text-gray-300">Track the wildest, friendliest bears in your area!</p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <section className="bg-light-accent p-10 rounded-lg shadow-lg max-w-3xl w-full">
          <CollapsibleContainer title="Create a New Bear Profile">
            <CreateBearProfile />
          </CollapsibleContainer>
          <CollapsibleContainer title="Current Known Bears">
            <button
              onClick={fetchBears}
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            >
              Refresh Bears
            </button>
            <ul>
              {bears.map((bear) => (
                <li key={bear.id} className="mb-4 p-4 border border-gray-300 rounded">
                  <h2 className="text-xl font-bold">{bear.name}</h2>
                  <p>{bear.description}</p>
                  <p>Location ID: {bear.locationId}</p>
                  <p>Size: {bear.size}</p>
                  <p>Last Sighting: {new Date(bear.lastSighting).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </CollapsibleContainer>
        </section>
      </main>

      <footer className="bg-dark-grey text-white text-center py-4">
        <p>🐻 All the Bears. All the Time. 🐻</p>
      </footer>
    </div>
  );
}

export default BearsList;