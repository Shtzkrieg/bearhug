import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { fetchTLDs } from '../../utils/fetchTLDs';

const prisma = new PrismaClient();
let validTLDs: string[] = [];
let tldsFetched = false;

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }

  const domain = email.split('.').pop();
  if (!validTLDs.includes(domain || '')) {
    return { valid: false, message: 'The email address has an invalid domain. Please use a common domain like .com or .org.' };
  }

  return { valid: true };
};

// Fetch the list of TLDs on startup
const fetchTLDsOnStartup = async () => {
  try {
    validTLDs = await fetchTLDs();
    tldsFetched = true;
    console.log('Fetched TLDs:', validTLDs);
  } catch (error) {
    console.error('Failed to fetch TLDs:', error);
  }
};

fetchTLDsOnStartup();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Ensure TLDs are fetched before proceeding
    if (!tldsFetched) {
      await fetchTLDsOnStartup();
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return res.status(400).json({ message: emailValidation.message });
    }

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ message: 'An account with this email already exists.' });
      }

      // Hash the password
      const hashedPassword = await argon2.hash(password);

      // Create new user
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json({ message: 'Account created successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}