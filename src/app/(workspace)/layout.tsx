// import { currentUser } from '@/modules/authentication/actions';
// import Header from '@/modules/layout/components/header';
// import React from 'react';

// const RootLayout = async ({ children }: { children: React.ReactNode }) => {
//   const user = await currentUser();
//   return (
//     <>
//       <Header user={user} />
//       <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
//         <div className="flex h-full w-full">
//           <div className="w-12 border-r border-zinc-800 bg-zinc-900">
//             {/* <TabbedLeftPanel /> */}
//             TabbedLeftPanel
//           </div>
//           <div className="flex-1 bg-zinc-950">{children}</div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default RootLayout;

import { currentUser } from '@/modules/authentication/actions';
import Header from '@/modules/layout/components/header';

const WorkspaceLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header user={user} />

      <main className="flex flex-1 overflow-hidden">
        {/* Left rail — will host the real sidebar component */}
        <aside className="w-12 shrink-0 border-r border-border bg-sidebar">
          <div className="flex h-full items-center justify-center">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase [writing-mode:vertical-rl]">
              Panel
            </span>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 overflow-y-auto bg-background">{children}</section>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
