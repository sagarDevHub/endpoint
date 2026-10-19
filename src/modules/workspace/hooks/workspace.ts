import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createWorkspaces, getWorkspaceByID, getWorkspaces } from '../actions';
import { Workspace } from '@/modules/layout/store';

export function useWorkspaces() {
  return useQuery<Workspace[]>({
    queryKey: ['workspaces'],
    queryFn: async () => getWorkspaces(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => createWorkspaces(name),
    onSuccess: newWorkspace => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      if (newWorkspace?.id) {
        queryClient.setQueryData(['workspace', newWorkspace.id], newWorkspace);
      }
    },
  });
}

export function useGetWorkspace(id: string) {
  return useQuery({
    queryKey: ['workspace', id],
    queryFn: async () => getWorkspaceByID(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
