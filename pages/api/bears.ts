import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/client';
import { findOrCreateLocation } from '../../utils/location';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handleCreateBear(req, res);
    case 'DELETE':
      return handleDeleteBear(req, res);
    case 'GET':
        return handleGetBears(req, res);
    default:
      res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleCreateBear(req: NextApiRequest, res: NextApiResponse) {
  const { name, city, state, country, description, size, lastSighting } = req.body;

  try {
    const location = await findOrCreateLocation(city, state, country);

    const newBear = await prisma.bear.create({
      data: {
        name,
        locationId: location.id,
        description,
        size,
        lastSighting: new Date(lastSighting),
      },
    });

    res.status(201).json(newBear);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create bear profile.' });
  }
}

async function handleDeleteBear(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    await prisma.bear.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete bear profile.' });
  }
}

async function handleGetBears(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const bears = await prisma.bear.findMany({
      include: {
        location: true,
      },
    });
    res.status(200).json(bears);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch bears.' });
  }
}