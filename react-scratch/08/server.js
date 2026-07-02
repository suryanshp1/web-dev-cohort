import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import App from './src/App.js'


const app = express()

app.get('/', (req, res) => {
    res.send("Hello from express")
})

app.get("/chaicode", (req, res) => {
    const appHtml = ReactDOM.renderToString(React.createElement(App))
    res.setHeader("Content-Type", "text/html")
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div id="root">${appHtml}</div>
            </body>
        </html>
    `)
})

app.listen(3000, () => {
    console.log(`Your server is running on port 3000`)
})