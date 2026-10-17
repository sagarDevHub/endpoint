// export const instant = false;

// import { currentUser } from '@/modules/authentication/actions';
// import UserButton from '@/modules/authentication/components/user-button';
// import { Suspense } from 'react';

// const Home = async () => {
//   const user = await currentUser();
//   return (
//     <div className="flex h-screen flex-col items-center justify-center">
//       {/* <Suspense fallback={<div className="h-10 w-10 rounded-full bg-muted animate-pulse" />}>
//         <UserButton user={user} />
//       </Suspense> */}
//       <UserButton user={user} />
//     </div>
//   );
// };

// export default Home;

import { LogIn } from 'lucide-react';
import { currentUser } from '@/modules/authentication/actions';
import UserButton from '@/modules/authentication/components/user-button';

// Opt out of prerendering — this route depends on runtime session data.
export const instant = false;

const Home = async () => {
  const user = await currentUser();

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-8">
      {/* Subtle grid backdrop (matches login page) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)',
        }}
      />

      <div className="relative flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
          <LogIn className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {user ? `Welcome back, ${user.name?.split(' ')[0] ?? 'there'}` : 'Welcome to Endpoint'}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {user
            ? 'Your workspace is ready. Pick a project or create a new one to get started.'
            : 'Sign in to access your workspace.'}
        </p>

        {user && (
          <div className="mt-6">
            <UserButton user={user} size="md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
