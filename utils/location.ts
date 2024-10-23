import { prisma } from '../prisma/client';

export async function findOrCreateLocation(city: string, state: string, country: string) {
  // Check if the location already exists
  let location = await prisma.location.findFirst({
    where: { city, state, country },
  });

  // If the location doesn't exist, create a new one
  if (!location) {
    location = await prisma.location.create({
      data: { city, state, country },
    });
  }

  return location;
}