import { z } from "zod"

export const todoValidationSchema = z.object({
    id: z.string().describe("ID of the todo"),
    title: z.string().describe("Title of the todo"),
    description: z.string().optional().describe("Description of the todo"),
    isCompleted: z.boolean().default(false).describe("If the todo item is completed"),

})

export type Todo = z.infer<typeof todoValidationSchema>