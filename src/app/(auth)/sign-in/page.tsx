'use client';
import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth/auth-client';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 py-16">
      {/* Fine grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)',
        }}
      />

      {/* Soft top glow — like a spotlight from above */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 rounded-full bg-emerald-500/6 blur-[130px]" />

      {/* Thin horizon line */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-full max-w-4xl -translate-x-1/2 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative w-full max-w-105">
        <div className="relative rounded-2xl border border-white/8 bg-white/2 p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          {/* Subtle top highlight line on card */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent" />

          {/* Logo & Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <Link href="/" className="group/logo mb-6">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-linear-to-b from-white/6 to-white/1 transition-all duration-500 group-hover/logo:border-emerald-500/40 group-hover/logo:shadow-[0_0_24px_-4px_rgba(16,185,129,0.4)]">
                {/* Inner glow dot */}
                <div className="absolute inset-0 rounded-xl bg-emerald-500/0 transition-colors duration-500 group-hover/logo:bg-emerald-500/6" />
                <span className="relative text-lg font-semibold tracking-tight text-white">E</span>
                {/* Tiny accent dot in corner */}
                <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
              </div>
            </Link>

            <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-white">
              Sign in to Endpoint
            </h1>
            <p className="mt-2 text-sm text-zinc-500">Welcome back. Let&apos;s get you in.</p>
          </div>

          {/* Social Buttons */}
          <div className="space-y-2.5">
            <Button
              variant="outline"
              className="group/btn relative h-11 w-full overflow-hidden rounded-xl border border-white/8 bg-white/2 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-white/16 hover:bg-white/5 hover:text-white"
              onClick={() =>
                signIn.social({
                  provider: 'github',
                  callbackURL: '/',
                })
              }
            >
              <FaGithub className="mr-2.5 h-4 w-4 text-zinc-300 transition-colors group-hover/btn:text-white" />
              <span>Continue with GitHub</span>
              {/* Arrow appears on hover */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/btn:translate-x-0 group-hover/btn:opacity-60"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>

            <Button
              variant="outline"
              className="group/btn relative h-11 w-full overflow-hidden rounded-xl border border-white/8 bg-white/2 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-white/16 hover:bg-white/5 hover:text-white"
              onClick={() =>
                signIn.social({
                  provider: 'google',
                  callbackURL: '/',
                })
              }
            >
              <FaGoogle className="mr-2.5 h-4 w-4 text-zinc-300 transition-colors group-hover/btn:text-white" />
              <span>Continue with Google</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/btn:translate-x-0 group-hover/btn:opacity-60"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/8" />
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
              Secure auth
            </span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/8" />
          </div>

          {/* Footer */}
          <p className="text-center text-xs leading-relaxed text-zinc-500">
            By continuing, you agree to our{' '}
            <Link
              href="/terms"
              className="text-zinc-300 underline-offset-4 transition-colors hover:text-emerald-400 hover:underline"
            >
              Terms
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-zinc-300 underline-offset-4 transition-colors hover:text-emerald-400 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
