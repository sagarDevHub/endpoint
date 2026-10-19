import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Workspace = {
  id: string;
  name: string;
};

interface WorkspaceState {
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: (workspace: Workspace | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    set => ({
      selectedWorkspace: null,
      setSelectedWorkspace: workspace => set({ selectedWorkspace: workspace }),
    }),
    {
      name: 'endpoint-active-workspace', // localstorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
