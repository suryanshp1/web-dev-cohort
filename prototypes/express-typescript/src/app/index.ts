import express from "express";
import type { Application } from "express";

// Routes



export function createServerApplication(): Application {
    const app = express()

    app.use(express.json())

    //#region //*================ Routes ===================
    app.get('/', function (req, res) {
        return res.json({message: "Hello ji kaise ho..."})
    })

    app.get('/hello', function (req, res) {
        return res.json({message: "Bye"})
    })
    //#endregion //*================ Routes ===================

    return app
}