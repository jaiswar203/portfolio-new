import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    
    return NextResponse.json({ 
      authenticated: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: { email: (payload as any).email }
    }, { status: 200 });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred while verifying session' },
      { status: 500 }
    );
  }
} 