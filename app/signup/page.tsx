"use client"; // Mark this as a client component

import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log values before sending the request to ensure they're correct
    console.log("Email:", email);
    console.log("Password:", password);

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // Make sure email and password are being sent
    });

    if (response.ok) {
      alert('Account created successfully!');
    } else {
      alert('Failed to create account.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create a Bearhub Account</h1>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email} // Ensure this is tied to the state
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password} // Ensure this is tied to the state
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    width: '300px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};
