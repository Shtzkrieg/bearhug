// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your_jwt_secret');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const response = NextResponse.next();

  if (!token) {
    console.log('No token found');
    response.cookies.set('isLoggedIn', 'false', { path: '/' });
    return response;
  }

  try {
    await jwtVerify(token.value, JWT_SECRET);
    console.log('Token verified successfully');
    response.cookies.set('isLoggedIn', 'true', { path: '/' });
  } catch (error) {
    console.log('Token verification failed:', error);
    response.cookies.set('isLoggedIn', 'false', { path: '/' });
  }

  return response;
}

export const config = {
  matcher: ['/'], // Apply middleware to the home page
};