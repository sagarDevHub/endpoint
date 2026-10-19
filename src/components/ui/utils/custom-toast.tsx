import { CheckCircle2, XCircle, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'loading';
  message: string;
  description?: string;
}

export function CustomToast({ type, message, description }: CustomToastProps) {
  const icons = {
    success: <CheckCircle2 className="size-5 text-emerald-500" />,
    error: <XCircle className="size-5 text-red-500" />,
    info: <Info className="size-5 text-blue-500" />,
    loading: <Loader2 className="size-5 animate-spin text-zinc-400" />,
  };

  const borders = {
    success: 'border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]',
    error: 'border-red-500/30 shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]',
    info: 'border-blue-500/30 shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]',
    loading: 'border-border/50',
  };

  return (
    <div
      className={cn(
        // Dark glassmorphism base
        'flex w-[350px] items-start gap-3 rounded-xl border bg-zinc-950/95 p-4 backdrop-blur-xl transition-all',
        borders[type]
      )}
    >
      <div className="mt-0.5 shrink-0">{icons[type]}</div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold tracking-tight text-zinc-100">{message}</p>
        {description && <p className="text-xs font-medium text-zinc-400">{description}</p>}
      </div>
    </div>
  );
}
