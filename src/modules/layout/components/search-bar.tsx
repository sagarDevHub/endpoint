'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className={cn(
          'group/search flex h-9 w-full cursor-text items-center justify-between gap-2 rounded-md',
          'border border-border bg-muted/40 px-3 text-sm text-muted-foreground',
          'transition-all duration-300',
          // ✅ Search Bar Glow (Matches button)
          'hover:border-emerald-500/30 hover:bg-muted hover:text-foreground hover:shadow-[0_0_15px_-2px_rgba(16,185,129,0.2)]',
          'focus-visible:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]'
        )}
      >
        <span className="inline-flex flex-1 items-center gap-2">
          <Search className="h-3.5 w-3.5 shrink-0 transition-colors group-hover/search:text-emerald-500 group-focus-visible/search:text-emerald-500" />
          <span className="text-xs">Search</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors group-hover/search:border-emerald-500/30">
            Ctrl
          </kbd>
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors group-hover/search:border-emerald-500/30">
            K
          </kbd>
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>Pre-request Script</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Tests</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Variables</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Documentation</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
