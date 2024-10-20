import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

      // Set cookies
      res.setHeader('Set-Cookie', [
        serialize('token', token, {
          httpOnly: true, // Secure and inaccessible to client-side JS
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600,
          path: '/',
        }),
        serialize('isLoggedIn', 'true', {
          httpOnly: false, // Accessible by client-side JavaScript
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600,
          path: '/',
        }),
      ]);

      res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
