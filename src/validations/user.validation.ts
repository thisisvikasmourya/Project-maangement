import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const updateRoleSchema = z.object({
  role: z.enum(['user', 'admin', 'manager']),
});
