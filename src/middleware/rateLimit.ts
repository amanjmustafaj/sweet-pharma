import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production for distributed systems)
const store: RateLimitStore = {};

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 10 * 60 * 1000);

interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds
  max?: number; // Max requests per window
  message?: string; // Error message
  skipSuccessfulRequests?: boolean;
}

/**
 * Rate limiting middleware
 */
export function rateLimit(options: RateLimitOptions = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // 100 requests per window
    message = 'Too many requests, please try again later',
    skipSuccessfulRequests = false,
  } = options;

  return async function rateLimitMiddleware(
    request: NextRequest,
    handler: (request: NextRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    // Get client identifier (IP address)
    const identifier = getClientIdentifier(request);
    const key = `ratelimit:${identifier}`;
    const now = Date.now();

    // Initialize or get existing record
    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    // Increment counter
    store[key].count++;

    // Check if limit exceeded
    if (store[key].count > max) {
      const resetTime = new Date(store[key].resetTime).toISOString();
      return NextResponse.json(
        {
          error: message,
          retryAfter: Math.ceil((store[key].resetTime - now) / 1000),
          resetTime,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': max.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': store[key].resetTime.toString(),
            'Retry-After': Math.ceil((store[key].resetTime - now) / 1000).toString(),
          },
        }
      );
    }

    // Execute handler
    const response = await handler(request);

    // If skipSuccessfulRequests is true and request was successful, decrement counter
    if (skipSuccessfulRequests && response.status >= 200 && response.status < 300) {
      store[key].count--;
    }

    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', max.toString());
    response.headers.set('X-RateLimit-Remaining', (max - store[key].count).toString());
    response.headers.set('X-RateLimit-Reset', store[key].resetTime.toString());

    return response;
  };
}

/**
 * Strict rate limit for sensitive endpoints (login, registration)
 */
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many attempts, please try again after 15 minutes',
});

/**
 * Standard rate limit for API endpoints
 */
export const standardRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
});

/**
 * Relaxed rate limit for public endpoints
 */
export const relaxedRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per 15 minutes
});

/**
 * Get client identifier from request (IP address)
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from headers (for proxied requests)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Clear rate limit for a specific identifier (useful for testing)
 */
export function clearRateLimit(identifier: string): void {
  const key = `ratelimit:${identifier}`;
  delete store[key];
}
