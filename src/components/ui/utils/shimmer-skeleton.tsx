import { cn } from '@/lib/utils';

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        'animate-shimmer bg-[linear-gradient(90deg,transparent_0%,theme(colors.zinc.800/50)_50%,transparent_100%)] bg-[length:200%_100%]',
        className
      )}
      {...props}
    />
  );
}
