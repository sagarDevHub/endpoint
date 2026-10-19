import React from 'react';
import { Shimmer } from '@/components/ui/utils/shimmer-skeleton';

const LoadingPage = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-8">
      {/* Matching grid backdrop from the main page */}
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

      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        {/* Icon Container Skeleton */}
        <Shimmer className="mb-6 h-14 w-14 rounded-2xl border border-border bg-card shadow-sm" />

        {/* Heading Skeleton */}
        <Shimmer className="mb-3 h-8 w-[60%] rounded-md" />

        {/* Paragraph Skeletons */}
        <div className="flex w-full flex-col items-center gap-2">
          <Shimmer className="h-4 w-[80%] rounded-md" />
          <Shimmer className="h-4 w-[40%] rounded-md" />
        </div>

        {/* Avatar Button Skeleton */}
        <Shimmer className="mt-8 h-10 w-10 rounded-full border border-border shadow-sm" />
      </div>
    </div>
  );
};

export default LoadingPage;
