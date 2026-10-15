export const AVATAR_SIZES = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
} as const;

export const AVATAR_FALLBACK_TEXT_SIZES = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
} as const;

export type AvatarSize = keyof typeof AVATAR_SIZES;

export function getUserInitials(name: string | null, email: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    const initials =
      parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0].slice(0, 2);
    return initials.toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return 'U';
}

// Hoisted — instantiated once, not on every render.
const MEMBER_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export function formatMemberSince(date: Date | string): string {
  return MEMBER_DATE_FORMATTER.format(new Date(date));
}
