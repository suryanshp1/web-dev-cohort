const express = require("express")

function block_1_httpMethods() {
    return new Promise((resolve) => {
        const app = express()

        app.use(express.json())

        const routes = {
            1: {
                id: 1,
                name: "Dadar Andheri Express",
                direction: "North",
            },
            2: {
                id: 2,
                name: "Bandra Kurla Shuttle",
                direction: "East",
            }
        }

        let nextId = 3

        // list all trains
        app.get("/routes", (req, res) => {
            res.json(Object.values(routes))
        })

        // single rote by Id
        app.get("routes/:id", (req, res) => {
            const route = routes[req.params.id]

            if (!route) return res.status(404).json({error: "Train not found"})

            res.json(route)
        })

        app.post("/routes", (req, res) => {
            // no validation, no zod

            const newRoute = {id: nextId++, ...req.body}
            routes[newRoute.id] = newRoute

            res.status(201).json(newRoute)
        })

        app.put('/routes/:id', (req, res) => {
            const id = req.params.id
            if (!routes[id]) return res.status(404).json({error: "route not found"})

            routes[id] = {id: Number(id), ...req.body}

        })

        app.patch('/routes/:id', (req, res) => {
            const id = req.params.id
            if (!routes[id]) return res.status(404).json({error: "route not found"})

            // TODO: complete this
            routes[id]["name"] = req.body["name"]
        })

         app.delete('/routes/:id', (req, res) => {
            const id = req.params.id
            if (!routes[id]) return res.status(404).json({error: "route not found"})

            delete routes[id]
            res.status(204).end()
        })

        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `127.0.0.1:${port}`

            try {
                // TODO:
                const listRes = await fetch(`${base}/routes`)
                const listData = await listRes.json()

                const createResp = await fetch(`${base}/routes`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "appliation/json",
                        body: JSON.stringify({
                            name: "Colaba Worli",
                            direction: "South",
                        })
                    }
                })

                const createData = await createResp.json()

            } catch (error) {
                console.log(`Somthing went wrong | Error : ${error}`)
            }

            server.close(() => {
                console.log("Block 1 served .....")
                resolve()
            })
        })
    })
}


function block_1_httpMethods() {
    return new Promise((resolve) => {
        const app = express()

        const logs = []

        app.use(express.json({limit: "50KB"}))
        app.use(express.urlencoded({extended: true, limit: "50KB"}))
        app.use(express.static(root, {
            dotfiles: 'ignore'
        }))

        // /files/readme.txt
        // /files/abc/readme.txt
        app.get('/files/*filepath', (req, res) => {
            const filepath = req.params.filepath
            res.json({filepath, type: "wildcard"})
        })

        app
            .route("/schedule")
            .get((req, res) => {})
            .post((req, res) => {})
            .put((req, res) => {})
            .delete((req, res) => {})

        app.use('/api', (req, res) => {
            // its a prefetch match
        })

        app.use((req, res, next) => {
            // add to database
            // authenticate user
            // console log everything
            // write some file
            
            const logEntry = `${req.method} : ${req.url}`
            logs.push(logEntry)

            console.log(`[LOG] --- ${logEntry}`)

            // if your request hangs forever
            next()
        })

        app.use((req, res, next) => {
            req.startTime = Date.now()

            res.on('finish', () => {
                const duration = Date.now() - req.startTime
                console.log(`[TIMER] - ${req.method} - took ${duration}ms`)
            })
            next()
        })

        function authMe (req, res, next) {
            const token = req.headers['x-auth-token']

            if (!token) {
                return res.status(401).json({error: "no token, pls login"})
            }

            if (token != "secret-chaicode") {
                return res.status(403).json({error: "invalid token"})
            }

            req.user = {id: 1, name: "Surya", role: "admin"}

            next()
        }

        function getRole(role) {
            return (req, res, next) => {
                if (!req.user || req.user.role != role) {
                    return res.status(403).json({error: `Role ${role} required`})
                }
            }
        }

        function rateLimit(maxRequest) {
            let count = 0

            return (req, res, next) => {
                count++

                if (count > maxRequest) {
                    return res.status(429).json({error: "Too many request, pls try again"})
                }

                next()
            }
        }

        app.get('/profile', authMe, getRole("admin"), () => {})
        app.get('/profile', authMe, getRole("manager"), () => {})
        app.get('/profile', authMe, getRole("member"), () => {})

        app.get('/profile', authMe, getRole(["admin"]), () => {})
        app.get('/profile', authMe, getRole(["admin", "manager"]), () => {})



        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `127.0.0.1:${port}`

            try {
                // TODO:
                

            } catch (error) {
                console.log(`Somthing went wrong | Error : ${error}`)
            }

            server.close(() => {
                console.log("Block 1 served .....")
                resolve()
            })
        })
    })
}

async function main() {
    await block_1_httpMethods()

    process.exit(0)
}

main()