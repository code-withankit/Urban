import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().trim().min(3, 'Name Shall be min 3 letters'),
    email: z.email('Please Provide a valid email').trim(),
    password: z.string().min(8, 'Password Shall be min 8 letters'),
    role: z.enum(['user', 'vendor'], 'Role shall either be user or vendor')
})

export const loginSchema=z.object({
    email: z.email('Please Provide a valid email').trim(),
    password: z.string().min(8, 'Password Shall be min 8 letters')
})