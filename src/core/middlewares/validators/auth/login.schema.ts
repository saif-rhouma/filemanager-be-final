import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8),
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;
