'use server';

import db from '@/lib/db';
import { redis } from '@/lib/redis/rate-limit';
import { currentUser } from '@/modules/authentication/actions';
import { MEMBER_ROLE } from '@prisma/client';

export const initializeWorkspace = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  try {
    const workspace = await db.workspace.upsert({
      where: {
        name_ownerId: {
          ownerId: user.id,
          name: 'Personal Workspace',
        },
      },
      update: {},
      create: {
        name: 'Personal Workspace',
        description: 'Default Workspace for personal use',
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: MEMBER_ROLE.ADMIN,
          },
        },
      },
      include: {
        members: true,
      },
    });

    await redis.del(`user:${user.id}:workspaces`);

    return {
      success: true,
      workspace,
    };
  } catch (error) {
    console.error('Error initializing workspace:', error);
    return {
      success: false,
      error: 'Failed to create workspace',
    };
  }
};

export async function getWorkspaces() {
  const user = await currentUser();
  if (!user?.id) throw new Error('Unauthorized');

  const cacheKey = `user:${user.id}:workspaces`;

  try {
    const cached = await redis.get<string>(cacheKey);
    if (cached) {
      return typeof cached === 'string' ? JSON.parse(cached) : cached;
    }
  } catch (error) {
    console.warn('Redis read failed, falling back to database', error);
  }

  const workspaces = await db.workspace.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      members: {
        where: { userId: user.id },
        select: { role: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  try {
    await redis.set(cacheKey, JSON.stringify(workspaces), { ex: 600 });
  } catch (error) {
    console.warn('Redis write failed', error);
  }

  return workspaces;
}

export async function createWorkspaces(name: string, description?: string) {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  const trimmedName = name.trim();
  if (!trimmedName) throw new Error('Workspace name cannot be empty');

  const existing = await db.workspace.findUnique({
    where: {
      name_ownerId: {
        name: trimmedName,
        ownerId: user.id,
      },
    },
  });

  if (existing) {
    throw new Error('You already have a workspace with this name');
  }

  const workspace = await db.workspace.create({
    data: {
      name: trimmedName,
      description,
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: MEMBER_ROLE.ADMIN,
        },
      },
    },
    include: {
      members: true,
    },
  });

  await redis.del(`user:${user.id}:workspaces`);

  return workspace;
}

export const getWorkspaceByID = async (id: string) => {
  const user = await currentUser();
  if (!user?.id) return null;

  const cacheKey = `workspace:${id}`;

  try {
    const cached = await redis.get<string>(cacheKey);
    if (cached) {
      const parsed = typeof cached === 'string' ? JSON.parse(cached) : cached;
      const isMember = parsed.members.some((m: { userId: string }) => (m.userId = user.id));

      if (isMember) return parsed;
    }
  } catch (error) {
    console.warn('Redis read failed', error);
  }
  const workspace = await db.workspace.findFirst({
    where: {
      id,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
      },
    },
  });

  if (workspace) {
    try {
      await redis.set(cacheKey, JSON.stringify(workspace), { ex: 300 });
    } catch (error) {
      console.warn('Redis cache failed', error);
    }
  }

  return workspace;
};
