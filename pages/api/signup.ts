import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Log to check if data is being received
    console.log("Email received:", email);
    console.log("Password received:", password);

    if (email && password) {
      res.status(200).json({ message: 'User created successfully' });
    } else {
      res.status(400).json({ message: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
