import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production';

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string, cookieToken: string): boolean {
  if (!token || !cookieToken) {
    return false;
  }
  
  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(cookieToken));
  } catch {
    return false;
  }
}

/**
 * Set CSRF cookie
 */
export function setCsrfCookie(response: NextResponse): NextResponse {
  const token = generateCsrfToken();
  
  response.cookies.set({
    name: 'csrf_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return response;
}

/**
 * CSRF protection middleware for state-changing requests (POST, PUT, DELETE, PATCH)
 */
export async function csrfProtection(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const method = request.method;

  // Only check CSRF for state-changing methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return handler(request);
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get('csrf_token')?.value;
  const csrfHeader = request.headers.get('x-csrf-token');

  if (!csrfCookie || !csrfHeader) {
    return NextResponse.json(
      { error: 'CSRF token missing' },
      { status: 403 }
    );
  }

  if (!verifyCsrfToken(csrfHeader, csrfCookie)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }

  return handler(request);
}

/**
 * Get CSRF token from cookie (for client-side)
 */
export async function getCsrfToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('csrf_token')?.value;
}

/**
 * Middleware to ensure CSRF token exists
 */
export async function ensureCsrfToken(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get('csrf_token')?.value;

  const response = await handler(request);

  // If no CSRF token exists, set one
  if (!csrfCookie) {
    return setCsrfCookie(response);
  }

  return response;
}
