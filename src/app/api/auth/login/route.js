import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/storage';
import { verifyPassword, signToken, attachAuthCookie } from '@/lib/auth';

const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown-client';
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();
    const attemptRecord = loginAttempts.get(ip);

    if (attemptRecord && attemptRecord.count >= MAX_ATTEMPTS) {
      if (now - attemptRecord.lastAttempt < LOCKOUT_MS) {
        const remainingMin = Math.ceil((LOCKOUT_MS - (now - attemptRecord.lastAttempt)) / 60000);
        return NextResponse.json(
          { error: `Too many failed login attempts. For security, your access is locked. Please try again in ${remainingMin} minute(s).` },
          { status: 429 }
        );
      } else {
        loginAttempts.delete(ip);
      }
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    const isMatch = user ? await verifyPassword(password, user.passwordHash) : false;

    if (!user || !isMatch) {
      const current = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
      current.count += 1;
      current.lastAttempt = now;
      loginAttempts.set(ip, current);

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Clear failed attempts on successful authentication
    loginAttempts.delete(ip);

    const token = signToken(user);

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    attachAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed. Please try again.' },
      { status: 500 }
    );
  }
}
