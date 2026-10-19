'use client';

import { useState } from 'react';
import Modal from '@/components/ui/utils/modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateWorkspace } from '@/modules/workspace/hooks/workspace';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

interface CreateWorkspaceProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const CreateWorkspace = ({ isModalOpen, setIsModalOpen }: CreateWorkspaceProps) => {
  const [name, setName] = useState('');
  const { mutateAsync, isPending } = useCreateWorkspace();

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Please enter a workspace name');
      return;
    }

    try {
      await mutateAsync(name);
      toast.success('Workspace created successfully');
      setName('');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to create workspace');
      console.error(err);
    }
  };

  return (
    <Modal
      title="Create Workspace"
      description="Create a new workspace to organize your projects."
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? 'Creating...' : 'Create Workspace'}
      submitVariant="default"
      isPending={isPending}
    >
      <div className="space-y-2 py-4">
        <Label htmlFor="workspace-name">Workspace Name</Label>
        <Input
          id="workspace-name"
          placeholder="e.g. Acme Corp"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={isPending}
          autoFocus
          // ✅ Input Glow (Matches button)
          className={cn(
            'transition-all duration-300',
            'focus-visible:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]'
          )}
        />
      </div>
    </Modal>
  );
};

export default CreateWorkspace;
