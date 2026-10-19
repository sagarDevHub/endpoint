import { currentUser } from '@/modules/authentication/actions';
import Header from '@/modules/layout/components/header';
import { initializeWorkspace } from '@/modules/workspace/actions';

const WorkspaceLayout = async ({ children }: { children: React.ReactNode }) => {
  const workspace = await initializeWorkspace();
  const user = await currentUser();

  console.log(workspace);
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
