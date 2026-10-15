export const instant = false;

import { currentUser } from '@/modules/authentication/actions';
import UserButton from '@/modules/authentication/components/user-button';
import { Suspense } from 'react';

const Home = async () => {
  const user = await currentUser();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Suspense fallback={<div className="h-10 w-10 rounded-full bg-muted animate-pulse" />}>
        <UserButton user={user} />
      </Suspense>
    </div>
  );
};

export default Home;
