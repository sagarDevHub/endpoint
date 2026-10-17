// 'use client';

// import { Button } from '@/components/ui/button';
// import { Hint } from '@/components/ui/hint';
// import { Loader, Plus, User } from 'lucide-react';
// import React, { useEffect, useState } from 'react';

// // import CreateWorkspace from './create-workspace';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Separator } from '@/components/ui/separator';
// const Workspace = () => {
//   return (
//     <>
//       <Hint label="Change Workspace">
//         <Button className="border border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300">
//           <User className="size-4 text-indigo-400" />
//           <span className="text-sm text-indigo-400">Personal workspace</span>
//         </Button>
//       </Hint>
//     </>
//   );
// };

// export default Workspace;

'use client';

import { ChevronsUpDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';

interface WorkspaceProps {
  name?: string;
  onSwitch?: () => void;
}

const Workspace = ({ name = 'Personal workspace', onSwitch }: WorkspaceProps) => {
  return (
    <Hint label="Change workspace">
      <Button
        type="button"
        variant="outline"
        onClick={onSwitch}
        className="h-9 gap-2 border-border bg-transparent text-sm font-normal text-foreground hover:bg-accent"
      >
        <User className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span className="max-w-35 truncate">{name}</span>
        <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
      </Button>
    </Hint>
  );
};

export default Workspace;
