import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/login';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { serialize } from 'cookie';

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
      user: {
        findUnique: jest.fn(),
      },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
  });

jest.mock('jsonwebtoken');
jest.mock('argon2');
jest.mock('cookie', () => ({
  serialize: jest.fn(),
}));

const prisma = new PrismaClient();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/login', () => {
    it('should log in a user with valid credentials', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
            email: 'test@example.com',
            password: 'password123',
            },
        });
        
        // Mock the Prisma client's findUnique function to return a valid user
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword123', // This should match the hashed password
        });
        
        // Mock password verification to return true (valid password)
        (argon2.verify as jest.Mock).mockResolvedValue(true);
        
        // Mock JWT token generation
        (jwt.sign as jest.Mock).mockReturnValue('fake-jwt-token');
        
        // Mock cookie serialization
        (serialize as jest.Mock).mockReturnValue('token=fake-jwt-token; Path=/; HttpOnly; Max-Age=3600');
        
        // Invoke the handler
        await handler(req, res);
        
        // Assertions
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Login successful!', token: 'fake-jwt-token' });
        expect(res._getHeaders()['set-cookie']).toContain('token=fake-jwt-token; Path=/; HttpOnly; Max-Age=3600');
        });

  it('should return an error if the email is invalid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'invalid-email',
        password: 'password123',
      },
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Invalid email or password.' });
  });

  it('should return an error if the password is incorrect', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword123',
    });

    (argon2.verify as jest.Mock).mockResolvedValue(false);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData()).toEqual({ message: 'Invalid email or password.' });
  });

  it('should return an error if the method is not POST', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' });
  });

  it('should return an error if email or password is missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: '',
        password: '',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Email and password are required.' });
  });
});