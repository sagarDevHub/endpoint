import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const redis = Redis.fromEnv();

// Sensitive endpoints (auth routes, signin, token endpoints)
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  prefix: 'ratelimit:auth',
  analytics: true,
});

// General API / Proxy routes
export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '60 s'),
  prefix: 'ratelimit:api',
  analytics: true,
});

// Auto-jail helper: Checks if an IP is temporarily banned
export async function isIPBanned(ip: string): Promise<Boolean> {
  const banned = await redis.get(`banned:${ip}`);
  return Boolean(banned);
}

// Ban aggressive offenders for 15 minutes (900 seconds)
export async function banIP(ip: string, durationSec = 900) {
  await redis.set(`banned:${ip}`, 'true', { ex: durationSec });
}
