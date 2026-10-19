'use client';

import { Unplug } from 'lucide-react';
import UserButton from '@/modules/authentication/components/user-button';
import type { UserProps } from '../types';
import InviteMember from './invite-member';
import SearchBar from './search-bar';
import Workspace from './workspace-button';

interface HeaderProps {
  user: UserProps | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
      {/* Left — logo */}
      <div className="flex items-center justify-start">
        <button
          type="button"
          aria-label="Home"
          className="flex items-center rounded-md p-1.5 text-indigo-400 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:outline-none"
        >
          <Unplug size={22} />
        </button>
      </div>

      {/* Center — search (auto width, bounded by max-w) */}
      <div className="w-full min-w-[300px] max-w-md">
        <SearchBar />
      </div>

      {/* Right — actions (push to the right edge) */}
      <div className="flex items-center justify-end gap-2">
        <InviteMember />
        <Workspace />
        <UserButton user={user} size="sm" />
      </div>
    </header>
  );
};

export default Header;
