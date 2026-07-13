import { inngest } from "./client.js";
import { auditLog } from "../store.js";

export const onTodoCreated = inngest.createFunction(
    {
        id: "on-todo-created",
        triggers: [
            {
                event: "todo/created",
                source: "todo-app",
            }
        ]
    },
    async ({ event, step }) => {
        return await step.run("audit", async () => {
            auditLog.push({
                action: "created",
                todoId: event.data.todo.id,
                title: event.data.todo.title,
                timeStamp: new Date().toISOString(),
            })
            return { ok: true }
        })
    }
)


export const onTodoDeleted = inngest.createFunction(
    {
        id: "on-todo-deleted",
        triggers: [
            {
                event: "todo/deleted",
                source: "todo-app",
            }
        ],
        retries: 3,
    },
    async ({ event, step, attempt }) => {
        const id = event.data.todo.id
        
        await step.run("cleanup", async () => {
            if (attempt == 0) {
                // Simulate a failure for first attempt
                throw new Error(`Failed to delete todo ${id}`)
            }
            return "cleaned up successfully"
        })

        await step.run("audit", async () => {
            auditLog.push({
                action: "deleted",
                todoId: id,
                timeStamp: new Date().toISOString(),
            })
            return { ok: true }
        })
    }
)