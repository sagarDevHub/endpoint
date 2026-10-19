// 'use client';

// import { useEffect, useState } from 'react';
// import { ChevronsUpDown, Plus, User } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Hint } from '@/components/ui/hint';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectSeparator,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { useWorkspaces } from '@/modules/workspace/hooks/workspace';
// import { useWorkspaceStore } from '../store';
// import CreateWorkspace from './create-workspace';
// import { cn } from '@/lib/utils';
// import { toast } from '@/lib/toast'; // ✅ Import our custom toast

// const WorkspaceButton = () => {
//   const { data: workspaces, isLoading } = useWorkspaces();
//   const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
//       setSelectedWorkspace(workspaces[0]);
//     }
//   }, [workspaces, selectedWorkspace, setSelectedWorkspace]);

//   if (isLoading) {
//     return <div className="h-9 w-[180px] animate-pulse rounded-md bg-muted" />;
//   }

//   if (!workspaces || workspaces.length === 0) {
//     return (
//       <Button
//         variant="outline"
//         onClick={() => setIsModalOpen(true)}
//         className="h-9 gap-2 border-emerald-500/40 text-emerald-600 transition-all duration-300 hover:bg-emerald-500/10 dark:text-emerald-400"
//       >
//         <Plus className="size-4" />
//         <span>Create Workspace</span>
//       </Button>
//     );
//   }

//   return (
//     <>
//       <Select
//         value={selectedWorkspace?.id}
//         onValueChange={id => {
//           const ws = workspaces.find(w => w.id === id);
//           if (ws && ws.id !== selectedWorkspace?.id) {
//             setSelectedWorkspace(ws);
//             toast.success('Workspace switched', `You are now in ${ws.name}`);
//           }
//         }}
//       >
//         <Hint label="Switch Workspace" side="bottom" align="end">
//           <SelectTrigger
//             className={cn(
//               'h-9 max-w-[200px] gap-2 border-border bg-transparent px-3 text-sm font-normal [&>svg:last-child]:hidden',
//               'transition-all duration-300',
//               'hover:border-emerald-500/30 hover:bg-accent hover:shadow-[0_0_15px_-2px_rgba(16,185,129,0.2)]',
//               'focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] focus:ring-offset-0'
//             )}
//           >
//             <div className="flex items-center gap-2 truncate">
//               <User className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
//               <SelectValue placeholder="Select workspace" />
//             </div>
//             <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground opacity-50" />
//           </SelectTrigger>
//         </Hint>

//         <SelectContent align="end" className="w-[200px]">
//           {workspaces.map(ws => (
//             <SelectItem key={ws.id} value={ws.id} className="cursor-pointer">
//               {ws.name}
//             </SelectItem>
//           ))}

//           <SelectSeparator />

//           <div className="p-1">
//             <Button
//               variant="ghost"
//               className="w-full justify-start gap-2 h-8 px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-emerald-400"
//               onClick={e => {
//                 e.preventDefault();
//                 setIsModalOpen(true);
//               }}
//             >
//               <Plus className="size-3.5" />
//               Create Workspace
//             </Button>
//           </div>
//         </SelectContent>
//       </Select>

//       <CreateWorkspace isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
//     </>
//   );
// };

// export default WorkspaceButton;

'use client';

import { useEffect } from 'react';
import { ChevronsUpDown, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/select';
import { useWorkspaces } from '@/modules/workspace/hooks/workspace';
import { useWorkspaceStore } from '../store';
import { cn } from '@/lib/utils';
import { toast } from '@/lib/toast';

const WorkspaceButton = () => {
  const { data: workspaces } = useWorkspaces();
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      setSelectedWorkspace(workspaces[0]);
    }
  }, [workspaces, selectedWorkspace, setSelectedWorkspace]);

  return (
    <Select
      value={selectedWorkspace?.id || ''}
      onValueChange={id => {
        const ws = workspaces?.find(w => w.id === id);
        if (ws && ws.id !== selectedWorkspace?.id) {
          setSelectedWorkspace(ws);
          toast.success('Workspace switched', `You are now in ${ws.name}`);
        }
      }}
    >
      <Hint label="Switch Workspace" side="bottom" align="end">
        <SelectTrigger
          disabled={!selectedWorkspace}
          className={cn(
            'h-9 max-w-[200px] gap-2 border-border bg-transparent px-3 text-sm font-normal [&>svg:last-child]:hidden',
            'transition-all duration-300',
            'hover:border-emerald-500/30 hover:bg-accent hover:shadow-[0_0_15px_-2px_rgba(16,185,129,0.2)]',
            'focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <User className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate">{selectedWorkspace?.name || 'Loading...'}</span>
          </div>
          <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground opacity-50" />
        </SelectTrigger>
      </Hint>

      <SelectContent align="end" className="w-[200px]">
        {workspaces?.map(ws => (
          <SelectItem key={ws.id} value={ws.id} label={ws.name} className="cursor-pointer">
            {ws.name}
          </SelectItem>
        ))}

        <SelectSeparator />

        <div className="p-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 h-8 px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-emerald-400"
            onClick={e => {
              e.preventDefault();
              console.log('Trigger Create Workspace Modal');
              // setIsModalOpen(true); <- removed for now
            }}
          >
            <Plus className="size-3.5" />
            Create Workspace
          </Button>
        </div>
      </SelectContent>
    </Select>
  );
};

export default WorkspaceButton;
