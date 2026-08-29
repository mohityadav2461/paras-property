import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies, headers } from 'next/headers.js';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'paras_property_super_secret_jwt_key_2026';
const TOKEN_NAME = 'paras_admin_token';

/**
 * Hash a plain password using bcrypt
 */
export async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Verify a plain password against a bcrypt hash
 */
export async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Sign a JWT token for an authenticated user
 */
export function signToken(user) {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'admin',
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verify a JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Get current authenticated admin session from cookies or Authorization header
 */
export async function getSession(request) {
  try {
    // 1. Check Authorization header first if present in request or headers()
    let authHeader = request?.headers?.get?.('authorization');
    if (!authHeader) {
      try {
        const headerStore = headers();
        authHeader = headerStore.get('authorization');
      } catch (e) {}
    }

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const verified = verifyToken(token);
      if (verified) return verified;
    }

    // 2. Check Cookie from request object
    let cookieToken = request?.cookies?.get?.(TOKEN_NAME)?.value || request?.cookies?.get?.('haven_admin_token')?.value;

    // 3. Fallback to next/headers cookies()
    if (!cookieToken) {
      try {
        const cookieStore = cookies();
        cookieToken = cookieStore.get(TOKEN_NAME)?.value || cookieStore.get('haven_admin_token')?.value;
      } catch (e) {}
    }

    if (cookieToken) {
      const verified = verifyToken(cookieToken);
      if (verified) return verified;
    }

    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Set HTTP-only authentication cookie on a response object
 */
export function attachAuthCookie(response, token) {
  response.cookies.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
  return response;
}

/**
 * Clear authentication cookie on a response object
 */
export function clearAuthCookie(response) {
  response.cookies.set(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
