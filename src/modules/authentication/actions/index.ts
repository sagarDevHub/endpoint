'use server';

import { auth } from '@/lib/auth/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';
import { cache } from 'react';

export const currentUser = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return null;
    }

    // Only needed if you have custom database columns not present in session.user
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
});
