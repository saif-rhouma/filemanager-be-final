import { z } from 'zod';

export const userSignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8),
});

export type UserSignUpSchema = z.infer<typeof userSignUpSchema>;
