import { createServer } from "node:http"
import { createApplication } from "./app/index.js" 

async function main() {
    try {
        const PORT: number = 8080

        const app = createApplication()
        const server = createServer(app)

        server.listen(PORT, () => {
            console.log(`Http server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Error on starting http server")
        throw error
    }
}

main()