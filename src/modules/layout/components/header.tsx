// 'use client';

// import UserButton from '@/modules/authentication/components/user-button';
// import { UserProps } from '../types';
// import SearchBar from './search-bar';
// import { Unplug } from 'lucide-react';
// import InviteMember from './invite-member';
// import Workspace from './workspace';

// interface Props {
//   user: UserProps | null;
// }

// const Header = ({ user }: Props) => {
//   return (
//     <header className="grid grid-cols-5 grid-rows-1 gap-2 overflow-x-auto overflow-hidden p-2 border">
//       <div className="col-span-2 flex items-center justify-between space-x-2 hover:cursor-pointer hover:opacity-80 ml-4">
//         <Unplug size={28} className="text-indigo-400" />
//       </div>

//       <div className="col-span-1 flex items-center justify-between space-x-2">
//         <div
//           className="border-animation relative p-[1px] rounded flex-1 self-stretch overflow-hidden flex items-center justify-center"
//           aria-hidden="true"
//         >
//           <SearchBar />
//         </div>
//       </div>

//       <div className="col-span-2 flex items-center justify-end space-x-2 hover:cursor-pointer hover:opacity-80">
//         <InviteMember />
//         <Workspace />
//         <UserButton user={user} size="sm" />
//       </div>
//     </header>
//   );
// };

// export default Header;

'use client';

import { Unplug } from 'lucide-react';
import UserButton from '@/modules/authentication/components/user-button';
import type { UserProps } from '../types';
import InviteMember from './invite-member';
import SearchBar from './search-bar';
import Workspace from './workspace';

interface HeaderProps {
  user: UserProps | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
      {/* Left — logo */}
      <div className="flex shrink-0 items-center">
        <button
          type="button"
          aria-label="Home"
          className="flex items-center rounded-md p-1.5 text-indigo-400 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:outline-none"
        >
          <Unplug size={22} />
        </button>
      </div>

      {/* Center — search */}
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-md">
          <SearchBar />
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex shrink-0 items-center gap-2">
        <InviteMember />
        <Workspace />
        <UserButton user={user} size="sm" />
      </div>
    </header>
  );
};

export default Header;
