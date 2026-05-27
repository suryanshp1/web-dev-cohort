import { Worker } from "bullmq";
import { connection } from "./queue.js";

const worker = new Worker("emails", async (job) => {
    console.log(`Processing email job ${job.id}... ${job.name} ... ${job.data}`)
    await new Promise((res) => setTimeout(res, 1500));
    console.log(`Finished email job ${job.id}... ${job.name} ... ${job.data}`)
}, { connection });

worker.on('completed', (job) => {
    console.log(`Completed email job ${job.id}... ${job.name} ... ${job.data}`)
});

worker.on('failed', (job) => {
    console.log(`Failed email job ${job.id}... ${job.name} ... ${job.data}`)
});