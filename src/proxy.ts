import { NextRequest, NextResponse } from 'next/server';
import { apiRateLimit, authRateLimit, banIP, isIPBanned } from './lib/redis/rate-limit';
import { isbot } from 'isbot';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get('user-agent') || '';
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  // 1. Check Auto-Jail in Redis
  if (await isIPBanned(ip)) {
    return NextResponse.json(
      { error: 'Access forbidden: IP temporarily banned.' },
      { status: 403 }
    );
  }

  // 2. Bot Protection for API routes
  if (pathname.startsWith('/api') && isbot(userAgent)) {
    return NextResponse.json({ error: 'Automated agent or scraper detected.' }, { status: 403 });
  }

  // 3. Base response with security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // 4. Rate Limiting for API routes
  const isOauthCallback = pathname.startsWith('/api/auth/callback');

  if (pathname.startsWith('/api') && !isOauthCallback) {
    const isAuthRoute = pathname.startsWith('/api/auth');
    const limiter = isAuthRoute ? authRateLimit : apiRateLimit;

    const { success, limit, remaining, reset } = await limiter.limit(`${ip}:${pathname}`);

    if (!success) {
      // Auto-ban repeat offenders for 10 minutes
      await banIP(ip, 600);
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }

    // Attach rate limit headers on SUCCESSFUL responses
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', reset.toString());
  }

  // 5. Auth Redirect
  const sessionToken =
    req.cookies.get('better-auth.session_token')?.value ||
    req.cookies.get('__Secure-better-auth.session_token')?.value;

  if (sessionToken && pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return response;
}

export default proxy;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
