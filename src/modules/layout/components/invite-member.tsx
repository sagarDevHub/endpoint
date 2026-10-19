import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';

const InviteMember = () => {
  return (
    <Hint label="Invite members">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Invite members"
        className="border-emerald-500/40 text-emerald-600 transition-all duration-300 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-500 hover:shadow-[0_0_15px_-2px_rgba(16,185,129,0.4)] focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        <UserPlus className="size-4" />
      </Button>
    </Hint>
  );
};

export default InviteMember;
