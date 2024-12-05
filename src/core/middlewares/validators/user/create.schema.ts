import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
