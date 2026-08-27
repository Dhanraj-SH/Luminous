import z from 'zod';

export const Schemas = {
    NewUser:z.object({
        username: z.string().min(3).max(20).trim(),
        password: z.string().min(6).max(20)
    }),

    Login:z.object({
        username: z.string().min(3).max(20).trim(),
        password: z.string().min(6).max(20)
    })
};