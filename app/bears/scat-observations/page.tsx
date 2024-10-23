"use client";

import { useState, useEffect } from 'react';
import { Bear } from '@prisma/client';

function CreateScatObservation() {
  const [bears, setBears] = useState<Bear[]>([]);
  const [bearId, setBearId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [consistency, setConsistency] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  useEffect(() => {
    fetch('/api/bears')
      .then((response) => response.json())
      .then((data: Bear[]) => setBears(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/scat-observations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bearId, date, color, consistency, contents }),
    });

    if (response.ok) {
      alert('Scat observation created successfully!');
    } else {
      alert('Failed to create scat observation.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg text-primary-text font-sans">
      <header className="bg-dark-grey text-white text-center py-10">
        <h1 className="text-4xl text-accent-orange tracking-wide">Bearhub</h1>
        <p className="text-lg mt-3 text-gray-300">Track the health of our furry friends!</p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <section className="bg-light-accent p-10 rounded-lg shadow-lg max-w-3xl w-full">
          <h1 className="text-3xl font-bold mb-6">Create Scat Observation</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Bear</label>
              <select
                value={bearId}
                onChange={(e) => setBearId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Bear</option>
                {bears.map((bear) => (
                  <option key={bear.id} value={bear.id}>
                    {bear.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Consistency</label>
              <input
                type="text"
                value={consistency}
                onChange={(e) => setConsistency(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contents</label>
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Create Observation
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-dark-grey text-white text-center py-4">
        <p>🐻 Keeping Bears Healthy, One Scat at a Time! 🐻</p>
      </footer>
    </div>
  );
}

export default CreateScatObservation;