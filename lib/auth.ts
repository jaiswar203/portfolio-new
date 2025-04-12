import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Check if admin credentials are valid
export const checkAdminCredentials = (email: string, password: string) => {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
};

// Generate JWT token
export const generateToken = (email: string) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
};

// Verify JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

// Set JWT token in cookie
export const setTokenCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
};

// Remove JWT token from cookie
export const removeTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
};

// Get token from cookie
export const getTokenFromCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('admin_token')?.value;
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const token = await getTokenFromCookie();
  if (!token) return false;
  
  const payload = verifyToken(token);
  return !!payload;
};

// Middleware to protect API routes
export const authMiddleware = async (req: NextRequest) => {
  const token = req.cookies.get('admin_token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return null; // No error, user is authenticated
}; 