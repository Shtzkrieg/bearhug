import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handleCreateScatObservation(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleCreateScatObservation(req: NextApiRequest, res: NextApiResponse) {
  const { bearId, date, color, consistency, contents } = req.body;

  try {
    const newScatObservation = await prisma.scatObservation.create({
      data: {
        bearId,
        date: new Date(date),
        color,
        consistency,
        contents,
      },
    });

    res.status(201).json(newScatObservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create scat observation.' });
  }
}