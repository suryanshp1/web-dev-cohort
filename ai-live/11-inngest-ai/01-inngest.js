import { inngest } from "./inngest-client.js";

export const onOrderPlaced = inngest.createFunction({
    id: "on-order-placed",
    retries: 3,
    triggers: [
        {
            event: "order.placed",
        }
    ]
    },
    async ({event, step}) => {
        const {orderId, customer} = event.data

        const greeting = await step.run("greet", async () => {
            return `Hello ${customer.name}! Thank you for your order #${orderId}`
        });

        await step.run("log-greeting", async () => {
            console.log(greeting)
        })

        return { ok: true, greeting }
    }
)