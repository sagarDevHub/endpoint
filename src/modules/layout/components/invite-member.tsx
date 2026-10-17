// import { Button } from '@/components/ui/button';
// import { Hint } from '@/components/ui/hint';
// import { UserPlus } from 'lucide-react';
// import React from 'react';

// const InviteMember = () => {
//   return (
//     <Hint label="Invite Members">
//       <Button className="border border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300">
//         <UserPlus className="size-4 text-emerald-400" />
//       </Button>
//     </Hint>
//   );
// };

// export default InviteMember;

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
        className="border-emerald-500/40 text-emerald-600 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        <UserPlus className="size-4" />
      </Button>
    </Hint>
  );
};

export default InviteMember;
