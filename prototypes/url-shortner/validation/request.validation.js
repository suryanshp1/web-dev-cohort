import { z } from "zod"

export const signupPostRequestBodySchema = z.object({
    firstname: z.string().min(1).max(70),
    lastname: z.string(),
    email: z.email(),
    password: z.string().min(6)
})

export const loginPostRequestBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const shortenPostRequestBodySchema = z.object({
    url: z.string().url(),
})