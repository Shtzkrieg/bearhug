import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import handler from '../pages/api/signup';
import { createMockRequest, createMockResponse } from './mocks';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS ${process.env.DATABASE_SCHEMA_TEST}`);
  await prisma.$executeRawUnsafe(`SET search_path TO ${process.env.DATABASE_SCHEMA_TEST}`);
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS ${process.env.DATABASE_SCHEMA_TEST} CASCADE`);
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.user.deleteMany(); // Clean up the test database
});

describe('POST /api/signup', () => {
  it('should respond with 200 for a valid request', async () => {
    const req = createMockRequest({
      email: 'test@example.com',
      password: 'password123',
    });

    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return an error if the email is invalid', async () => {
    const req = createMockRequest({
      email: 'invalid-email',
      password: 'password123',
    });

    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please enter a valid email address.' });
  });

  it('should return an error if the email domain is invalid', async () => {
    const req = createMockRequest({
      email: 'test@invalid-domain.xyzasjkacnds',
      password: 'password123',
    });

    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'The email address has an invalid domain. Please use a common domain like .com or .org.' });
  });

  it('should return an error if the email already exists', async () => {
    await prisma.user.create({
      data: {
        email: 'existing@example.com',
        password: 'hashedpassword123',
      },
    });

    const req = createMockRequest({
      email: 'existing@example.com',
      password: 'password123',
    });

    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'An account with this email already exists.' });
  });

  it('should return an error if the password is missing', async () => {
    const req = createMockRequest({
      email: 'test@example.com',
    });

    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required.' });
  });

  it('should return an error if the email is missing', async () => {
    const req = createMockRequest({
      password: 'password123',
    });

    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required.' });
  });

  it('should return an error if the method is not POST', async () => {
    const req = createMockRequest({});
    req.method = 'GET';

    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method Not Allowed' });
  });
});