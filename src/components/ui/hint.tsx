// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// export interface HintProps {
//   label: string;
//   children: React.ReactNode;
//   side?: 'top' | 'bottom' | 'left' | 'right';
//   align?: 'start' | 'center' | 'end';
//   sideOffset?: number;
//   alignOffset?: number;
// }

// export const Hint = ({ label, children, side, align, sideOffset, alignOffset }: HintProps) => {
//   return (
//     <TooltipProvider>
//       <Tooltip delayDuration={100}>
//         <TooltipTrigger asChild>{children}</TooltipTrigger>

//         <TooltipContent side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
//           <p className="font-semibold capitalize">{label}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };
'use client';

import type { ReactElement } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface HintProps {
  label: string;
  children: ReactElement; // Must be a single element for Base UI's render prop
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
}

export const Hint = ({
  label,
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 6,
  alignOffset,
  className,
}: HintProps) => {
  return (
    <Tooltip>
      {/* ✅ Base UI uses the 'render' prop, NOT 'asChild' */}
      <TooltipTrigger render={children} />

      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(
          // 1. Reset default shadcn styles and hide the chunky arrow
          'border border-white/10 bg-zinc-900 px-2.5 py-1.5 text-zinc-200 shadow-xl [&>svg]:hidden',
          // 2. Modern Tech styling
          'rounded-md text-[11px] font-medium tracking-wide',
          // 3. Micro-animations
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
};
