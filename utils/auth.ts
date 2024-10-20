import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function isAuthenticated(req?: IncomingMessage): boolean {
  const token = req ? getTokenFromCookies(req) : getCookie('token');
  console.log('Token:', token);

  if (!token) {
    console.log('No token found');
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    console.log('Token verified successfully');
    return true;
  } catch (error) {
    console.log('Token verification failed:', error);
    return false;
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  const cookieValue = parts.length === 2 ? parts.pop()?.split(';').shift() : undefined;
  console.log(`Cookie [${name}]:`, cookieValue);
  return cookieValue;
}

function getTokenFromCookies(req: IncomingMessage): string | null {
  const cookie = req.headers.cookie;
  console.log('Cookies from request headers:', cookie);

  if (!cookie) {
    console.log('No cookies found in request headers');
    return null;
  }

  const token = cookie.split('; ').find(c => c.startsWith('token='));
  const tokenValue = token ? token.split('=')[1] : null;
  console.log('Token from cookies:', tokenValue);
  return tokenValue;
}