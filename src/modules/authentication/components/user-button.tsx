// // 'use client';

// // import { useState } from 'react';
// // import { CreditCard, LogOut, Settings, User as UserIcon, type LucideIcon } from 'lucide-react';
// // import { useRouter } from 'next/navigation';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Badge } from '@/components/ui/badge';
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuGroup,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from '@/components/ui/dropdown-menu';
// // import { authClient } from '@/lib/auth/auth-client';
// // import { cn } from '@/lib/utils';
// // import {
// //   AVATAR_FALLBACK_TEXT_SIZES,
// //   AVATAR_SIZES,
// //   formatMemberSince,
// //   getUserInitials,
// //   type AvatarSize,
// // } from './user-button.utils';

// // // ---------- Types ----------

// // export interface UserData {
// //   id: string;
// //   email: string | null;
// //   name: string | null;
// //   image: string | null;
// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // export interface UserButtonProps {
// //   user: UserData | null;
// //   onLogout?: () => void | Promise<void>;
// //   onSettings?: () => void;
// //   onProfile?: () => void;
// //   onBilling?: () => void;
// //   showBadge?: boolean;
// //   badgeText?: string;
// //   badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
// //   size?: AvatarSize;
// //   showEmail?: boolean;
// //   showMemberSince?: boolean;
// //   redirectTo?: string;
// // }

// // // ---------- Subcomponents (local — not reused elsewhere) ----------

// // interface AvatarWithBadgeProps {
// //   name: string | null;
// //   email: string | null;
// //   image: string | null;
// //   size?: AvatarSize;
// //   showBadge?: boolean;
// //   badgeText?: string;
// //   badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
// // }

// // function AvatarWithBadge({
// //   name,
// //   email,
// //   image,
// //   size = 'md',
// //   showBadge,
// //   badgeText = 'Pro',
// //   badgeVariant = 'default',
// // }: AvatarWithBadgeProps) {
// //   return (
// //     <div className="relative inline-flex">
// //       <Avatar
// //         className={cn(
// //           AVATAR_SIZES[size],
// //           'ring-2 ring-border transition-all duration-200',
// //           'group-hover/trigger:ring-emerald-500/50'
// //         )}
// //       >
// //         <AvatarImage src={image ?? undefined} alt={name ?? 'User avatar'} />
// //         <AvatarFallback
// //           className={cn(
// //             'border border-border bg-linear-to-br from-muted to-muted/50 font-medium',
// //             'text-emerald-600 dark:text-emerald-400',
// //             AVATAR_FALLBACK_TEXT_SIZES[size]
// //           )}
// //         >
// //           {getUserInitials(name, email)}
// //         </AvatarFallback>
// //       </Avatar>

// //       {showBadge && (
// //         <Badge
// //           variant={badgeVariant}
// //           className="absolute -right-1 -bottom-1 h-5 min-w-5 justify-center rounded-full border border-background px-1.5 text-[10px] font-semibold shadow-sm"
// //         >
// //           {badgeText}
// //         </Badge>
// //       )}
// //     </div>
// //   );
// // }

// // interface MenuItemProps {
// //   icon: LucideIcon;
// //   label: string;
// //   onClick?: () => void;
// //   disabled?: boolean;
// //   destructive?: boolean;
// // }

// // function MenuItem({ icon: Icon, label, onClick, disabled, destructive }: MenuItemProps) {
// //   return (
// //     <DropdownMenuItem
// //       onClick={onClick}
// //       disabled={disabled}
// //       className={cn(
// //         'group/item cursor-pointer gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors',
// //         destructive
// //           ? 'text-destructive focus:bg-destructive/10 focus:text-destructive'
// //           : 'text-popover-foreground focus:bg-accent focus:text-accent-foreground'
// //       )}
// //     >
// //       <Icon className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover/item:opacity-100" />
// //       <span>{label}</span>
// //     </DropdownMenuItem>
// //   );
// // }

// // // ---------- Main component ----------

// // export default function UserButton({
// //   user,
// //   onLogout,
// //   onSettings,
// //   onProfile,
// //   onBilling,
// //   showBadge = false,
// //   badgeText = 'Pro',
// //   badgeVariant = 'default',
// //   size = 'md',
// //   showEmail = true,
// //   showMemberSince = true,
// //   redirectTo = '/sign-in',
// // }: UserButtonProps) {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const router = useRouter();

// //   // Hooks must always run — bail out after them, never before.
// //   if (!user) return null;

// //   const handleLogout = async () => {
// //     if (isLoading) return;
// //     setIsLoading(true);
// //     try {
// //       // Consumer hook runs first, but a thrown error here must not block sign-out.
// //       try {
// //         await onLogout?.();
// //       } catch (err) {
// //         console.error('onLogout callback error:', err);
// //       }

// //       await authClient.signOut({
// //         fetchOptions: {
// //           onSuccess: () => router.push(redirectTo),
// //         },
// //       });
// //     } catch (error) {
// //       console.error('Logout error:', error);
// //       // Only reset the flag on failure — on success the component unmounts.
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <DropdownMenu>
// //       <DropdownMenuTrigger
// //         disabled={isLoading}
// //         aria-label="Open user menu"
// //         className={cn(
// //           'group/trigger relative inline-flex shrink-0 items-center justify-center rounded-full p-0',
// //           'border border-transparent bg-clip-padding outline-none select-none',
// //           'transition-all duration-200',
// //           AVATAR_SIZES[size],
// //           'hover:bg-accent focus-visible:ring-2 focus-visible:ring-emerald-500/40',
// //           'disabled:pointer-events-none disabled:opacity-50',
// //           'aria-expanded:bg-accent'
// //         )}
// //       >
// //         <AvatarWithBadge
// //           name={user.name}
// //           email={user.email}
// //           image={user.image}
// //           size={size}
// //           showBadge={showBadge}
// //           badgeText={badgeText}
// //           badgeVariant={badgeVariant}
// //         />
// //       </DropdownMenuTrigger>

// //       <DropdownMenuContent
// //         align="end"
// //         sideOffset={8}
// //         className={cn(
// //           'w-64 rounded-xl border border-border bg-popover/95 p-1.5 backdrop-blur-xl',
// //           'shadow-lg shadow-black/5 dark:shadow-black/40'
// //         )}
// //       >
// //         <DropdownMenuGroup>
// //           <DropdownMenuLabel className="p-2 font-normal">
// //             <div className="flex flex-col gap-3">
// //               <div className="flex items-center gap-3">
// //                 <Avatar className="h-12 w-12 ring-2 ring-border">
// //                   <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'User avatar'} />
// //                   <AvatarFallback className="border border-border bg-linear-to-br from-muted to-muted/50 text-lg font-medium text-emerald-600 dark:text-emerald-400">
// //                     {getUserInitials(user.name, user.email)}
// //                   </AvatarFallback>
// //                 </Avatar>
// //                 <div className="flex min-w-0 flex-col gap-1">
// //                   <p className="truncate text-sm leading-none font-medium text-popover-foreground">
// //                     {user.name ?? 'User'}
// //                   </p>
// //                   {showEmail && user.email && (
// //                     <p className="truncate text-xs leading-none text-muted-foreground">
// //                       {user.email}
// //                     </p>
// //                   )}
// //                   {showBadge && (
// //                     <Badge
// //                       variant={badgeVariant}
// //                       className="mt-1 w-fit border-emerald-500/30 bg-emerald-500/10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
// //                     >
// //                       {badgeText}
// //                     </Badge>
// //                   )}
// //                 </div>
// //               </div>
// //               {showMemberSince && (
// //                 <p className="text-[11px] tracking-wider text-muted-foreground uppercase">
// //                   Member since {formatMemberSince(user.createdAt)}
// //                 </p>
// //               )}
// //             </div>
// //           </DropdownMenuLabel>
// //         </DropdownMenuGroup>

// //         <DropdownMenuSeparator className="my-1" />

// //         {onProfile && <MenuItem icon={UserIcon} label="Profile" onClick={onProfile} />}
// //         {onBilling && <MenuItem icon={CreditCard} label="Billing" onClick={onBilling} />}
// //         {onSettings && <MenuItem icon={Settings} label="Settings" onClick={onSettings} />}

// //         {(onProfile || onBilling || onSettings) && <DropdownMenuSeparator className="my-1" />}

// //         <MenuItem
// //           icon={LogOut}
// //           label={isLoading ? 'Logging out…' : 'Log out'}
// //           onClick={handleLogout}
// //           disabled={isLoading}
// //           destructive
// //         />
// //       </DropdownMenuContent>
// //     </DropdownMenu>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { CreditCard, LogOut, Settings, User as UserIcon, type LucideIcon } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { authClient } from '@/lib/auth/auth-client';
// import { cn } from '@/lib/utils';
// import {
//   AVATAR_FALLBACK_TEXT_SIZES,
//   AVATAR_SIZES,
//   formatMemberSince,
//   getUserInitials,
//   type AvatarSize,
// } from './user-button.utils';

// export interface UserData {
//   id: string;
//   email: string | null;
//   name: string | null;
//   image: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface UserButtonProps {
//   user: UserData | null;
//   onLogout?: () => void | Promise<void>;
//   onSettings?: () => void;
//   onProfile?: () => void;
//   onBilling?: () => void;
//   showBadge?: boolean;
//   badgeText?: string;
//   badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
//   size?: AvatarSize;
//   showEmail?: boolean;
//   showMemberSince?: boolean;
//   redirectTo?: string;
// }

// interface AvatarWithBadgeProps {
//   name: string | null;
//   email: string | null;
//   image: string | null;
//   size?: AvatarSize;
//   showBadge?: boolean;
//   badgeText?: string;
//   badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
// }

// function AvatarWithBadge({
//   name,
//   email,
//   image,
//   size = 'md',
//   showBadge,
//   badgeText = 'Pro',
//   badgeVariant = 'default',
// }: AvatarWithBadgeProps) {
//   return (
//     <div className="relative inline-flex">
//       <Avatar
//         className={cn(
//           AVATAR_SIZES[size],
//           'ring-2 ring-border transition-all duration-300',
//           'group-hover/trigger:ring-emerald-500/50 group-hover/trigger:shadow-[0_0_10px_rgba(16,185,129,0.2)]'
//         )}
//       >
//         <AvatarImage src={image ?? undefined} alt={name ?? 'User avatar'} />
//         <AvatarFallback
//           className={cn(
//             'border border-border bg-linear-to-br from-muted to-muted/50 font-medium',
//             'text-emerald-600 dark:text-emerald-400',
//             AVATAR_FALLBACK_TEXT_SIZES[size]
//           )}
//         >
//           {getUserInitials(name, email)}
//         </AvatarFallback>
//       </Avatar>

//       {showBadge && (
//         <Badge
//           variant={badgeVariant}
//           className="absolute -right-1 -bottom-1 h-5 min-w-5 justify-center rounded-full border border-background px-1.5 text-[10px] font-semibold shadow-sm"
//         >
//           {badgeText}
//         </Badge>
//       )}
//     </div>
//   );
// }

// interface MenuItemProps {
//   icon: LucideIcon;
//   label: string;
//   onClick?: () => void;
//   disabled?: boolean;
//   destructive?: boolean;
// }

// function MenuItem({ icon: Icon, label, onClick, disabled, destructive }: MenuItemProps) {
//   return (
//     <DropdownMenuItem
//       onClick={onClick}
//       disabled={disabled}
//       className={cn(
//         'group/item cursor-pointer gap-2.5 rounded-lg px-2 py-2 text-sm transition-all duration-200',
//         destructive
//           ? 'text-destructive focus:bg-destructive/10 focus:text-destructive'
//           : 'text-popover-foreground focus:bg-accent focus:text-accent-foreground',
//         'focus:ring-1 focus:ring-inset focus:ring-emerald-500/20' // Subtle inner glow on focus
//       )}
//     >
//       <Icon
//         className={cn(
//           'h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover/item:opacity-100',
//           !destructive && 'group-hover/item:text-emerald-500'
//         )}
//       />
//       <span>{label}</span>
//     </DropdownMenuItem>
//   );
// }

// export default function UserButton({
//   user,
//   onLogout,
//   onSettings,
//   onProfile,
//   onBilling,
//   showBadge = false,
//   badgeText = 'Pro',
//   badgeVariant = 'default',
//   size = 'md',
//   showEmail = true,
//   showMemberSince = true,
//   redirectTo = '/sign-in',
// }: UserButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   if (!user) return null;

//   const handleLogout = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
//     try {
//       try {
//         await onLogout?.();
//       } catch (err) {
//         console.error('onLogout callback error:', err);
//       }

//       await authClient.signOut({
//         fetchOptions: {
//           onSuccess: () => router.push(redirectTo),
//         },
//       });
//     } catch (error) {
//       console.error('Logout error:', error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         disabled={isLoading}
//         aria-label="Open user menu"
//         className={cn(
//           'group/trigger relative inline-flex shrink-0 items-center justify-center rounded-full p-0',
//           'border border-transparent bg-clip-padding outline-none select-none',
//           'transition-all duration-300',
//           AVATAR_SIZES[size],
//           'hover:bg-accent hover:border-emerald-500/30 hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]',
//           'focus-visible:ring-2 focus-visible:ring-emerald-500/50',
//           'disabled:pointer-events-none disabled:opacity-50',
//           'aria-expanded:bg-accent aria-expanded:border-emerald-500/50'
//         )}
//       >
//         <AvatarWithBadge
//           name={user.name}
//           email={user.email}
//           image={user.image}
//           size={size}
//           showBadge={showBadge}
//           badgeText={badgeText}
//           badgeVariant={badgeVariant}
//         />
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         align="end"
//         sideOffset={8}
//         className={cn(
//           'w-64 rounded-xl border border-border bg-popover/95 p-1.5 backdrop-blur-xl',
//           'shadow-lg shadow-black/5 dark:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)]' // Subtle emerald shadow on dark mode
//         )}
//       >
//         <DropdownMenuGroup>
//           <DropdownMenuLabel className="p-2 font-normal">
//             <div className="flex flex-col gap-3">
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-12 w-12 ring-2 ring-border transition-colors">
//                   <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'User avatar'} />
//                   <AvatarFallback className="border border-border bg-linear-to-br from-muted to-muted/50 text-lg font-medium text-emerald-600 dark:text-emerald-400">
//                     {getUserInitials(user.name, user.email)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex min-w-0 flex-col gap-1">
//                   <p className="truncate text-sm leading-none font-medium text-popover-foreground">
//                     {user.name ?? 'User'}
//                   </p>
//                   {showEmail && user.email && (
//                     <p className="truncate text-xs leading-none text-muted-foreground">
//                       {user.email}
//                     </p>
//                   )}
//                   {showBadge && (
//                     <Badge
//                       variant={badgeVariant}
//                       className="mt-1 w-fit border-emerald-500/30 bg-emerald-500/10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
//                     >
//                       {badgeText}
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//               {showMemberSince && (
//                 <p className="text-[11px] tracking-wider text-muted-foreground uppercase">
//                   Member since {formatMemberSince(user.createdAt)}
//                 </p>
//               )}
//             </div>
//           </DropdownMenuLabel>
//         </DropdownMenuGroup>

//         <DropdownMenuSeparator className="my-1" />

//         {onProfile && <MenuItem icon={UserIcon} label="Profile" onClick={onProfile} />}
//         {onBilling && <MenuItem icon={CreditCard} label="Billing" onClick={onBilling} />}
//         {onSettings && <MenuItem icon={Settings} label="Settings" onClick={onSettings} />}

//         {(onProfile || onBilling || onSettings) && <DropdownMenuSeparator className="my-1" />}

//         <MenuItem
//           icon={LogOut}
//           label={isLoading ? 'Logging out…' : 'Log out'}
//           onClick={handleLogout}
//           disabled={isLoading}
//           destructive
//         />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

'use client';

import { useState } from 'react';
import { CreditCard, LogOut, Settings, User as UserIcon, type LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils';
import {
  AVATAR_FALLBACK_TEXT_SIZES,
  AVATAR_SIZES,
  formatMemberSince,
  getUserInitials,
  type AvatarSize,
} from './user-button.utils';

export interface UserData {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserButtonProps {
  user: UserData | null;
  onLogout?: () => void | Promise<void>;
  onSettings?: () => void;
  onProfile?: () => void;
  onBilling?: () => void;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: AvatarSize;
  showEmail?: boolean;
  showMemberSince?: boolean;
  redirectTo?: string;
}

interface AvatarWithBadgeProps {
  name: string | null;
  email: string | null;
  image: string | null;
  size?: AvatarSize;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function AvatarWithBadge({
  name,
  email,
  image,
  size = 'md',
  showBadge,
  badgeText = 'Pro',
  badgeVariant = 'default',
}: AvatarWithBadgeProps) {
  return (
    <div className="relative inline-flex">
      <Avatar
        className={cn(
          AVATAR_SIZES[size],
          'ring-2 ring-border transition-all duration-300',
          // ✅ Avatar Ring Glow
          'group-hover/trigger:ring-emerald-500/60 group-hover/trigger:shadow-[0_0_12px_rgba(16,185,129,0.3)]'
        )}
      >
        <AvatarImage src={image ?? undefined} alt={name ?? 'User avatar'} />
        <AvatarFallback
          className={cn(
            'border border-border bg-linear-to-br from-muted to-muted/50 font-medium',
            'text-emerald-600 dark:text-emerald-400',
            AVATAR_FALLBACK_TEXT_SIZES[size]
          )}
        >
          {getUserInitials(name, email)}
        </AvatarFallback>
      </Avatar>

      {showBadge && (
        <Badge
          variant={badgeVariant}
          className="absolute -right-1 -bottom-1 h-5 min-w-5 justify-center rounded-full border border-background px-1.5 text-[10px] font-semibold shadow-sm"
        >
          {badgeText}
        </Badge>
      )}
    </div>
  );
}

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

function MenuItem({ icon: Icon, label, onClick, disabled, destructive }: MenuItemProps) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group/item cursor-pointer gap-2.5 rounded-lg px-2 py-2 text-sm transition-all duration-200',
        destructive
          ? 'text-destructive focus:bg-destructive/10 focus:text-destructive'
          : 'text-popover-foreground focus:bg-accent focus:text-accent-foreground',
        // ✅ Inner Menu Item Glow
        'focus:ring-1 focus:ring-inset focus:ring-emerald-500/30'
      )}
    >
      <Icon
        className={cn(
          'h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover/item:opacity-100',
          !destructive && 'group-hover/item:text-emerald-500'
        )}
      />
      <span>{label}</span>
    </DropdownMenuItem>
  );
}

export default function UserButton({
  user,
  onLogout,
  onSettings,
  onProfile,
  onBilling,
  showBadge = false,
  badgeText = 'Pro',
  badgeVariant = 'default',
  size = 'md',
  showEmail = true,
  showMemberSince = true,
  redirectTo = '/sign-in',
}: UserButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      try {
        await onLogout?.();
      } catch (err) {
        console.error('onLogout callback error:', err);
      }

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push(redirectTo),
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isLoading}
        aria-label="Open user menu"
        className={cn(
          'group/trigger relative inline-flex shrink-0 items-center justify-center rounded-full p-0',
          'border border-transparent bg-clip-padding outline-none select-none',
          'transition-all duration-300',
          AVATAR_SIZES[size],
          'hover:bg-accent',
          'focus-visible:ring-2 focus-visible:ring-emerald-500/50',
          'disabled:pointer-events-none disabled:opacity-50',
          'aria-expanded:bg-accent'
        )}
      >
        <AvatarWithBadge
          name={user.name}
          email={user.email}
          image={user.image}
          size={size}
          showBadge={showBadge}
          badgeText={badgeText}
          badgeVariant={badgeVariant}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          'w-64 rounded-xl border border-border bg-popover/95 p-1.5 backdrop-blur-xl',
          // ✅ Dropdown Menu Ambient Glow
          'shadow-lg shadow-black/5 dark:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)]'
        )}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-2 font-normal">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-border transition-colors">
                  <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'User avatar'} />
                  <AvatarFallback className="border border-border bg-linear-to-br from-muted to-muted/50 text-lg font-medium text-emerald-600 dark:text-emerald-400">
                    {getUserInitials(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="truncate text-sm leading-none font-medium text-popover-foreground">
                    {user.name ?? 'User'}
                  </p>
                  {showEmail && user.email && (
                    <p className="truncate text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                  {showBadge && (
                    <Badge
                      variant={badgeVariant}
                      className="mt-1 w-fit border-emerald-500/30 bg-emerald-500/10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      {badgeText}
                    </Badge>
                  )}
                </div>
              </div>
              {showMemberSince && (
                <p className="text-[11px] tracking-wider text-muted-foreground uppercase">
                  Member since {formatMemberSince(user.createdAt)}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        {onProfile && <MenuItem icon={UserIcon} label="Profile" onClick={onProfile} />}
        {onBilling && <MenuItem icon={CreditCard} label="Billing" onClick={onBilling} />}
        {onSettings && <MenuItem icon={Settings} label="Settings" onClick={onSettings} />}

        {(onProfile || onBilling || onSettings) && <DropdownMenuSeparator className="my-1" />}

        <MenuItem
          icon={LogOut}
          label={isLoading ? 'Logging out…' : 'Log out'}
          onClick={handleLogout}
          disabled={isLoading}
          destructive
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
