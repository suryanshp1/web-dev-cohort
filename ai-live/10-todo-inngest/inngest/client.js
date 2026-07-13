import { Inngest } from 'inngest'
import dotenv from "dotenv";

dotenv.config();


export const inngest = new Inngest({
    id: 'todo-app',
    isDev: (process.env.INNGEST_DEV === "1") ? true : false,
})