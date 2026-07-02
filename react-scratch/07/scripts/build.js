import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import ReactDOMServer from 'react-dom/server'
import { teas } from '../src/data.js'
import App from '../src/App.js'
import React from 'react'

// GET __dirname

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define output path

const outputPath = path.resolve(__dirname, '../dist')
const htmlTemplatePath = path.resolve(__dirname, '../src/template.html')
const outputHtmlPath = path.resolve(outputPath, 'index.html')

const template = await fs.readFileSync(htmlTemplatePath, 'utf-8')


const appHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(App, { teas }))

const finalHtml = template.replace('<!--app-->', appHtml)

// Write output file 
fs.ensureDirSync(outputPath)
fs.writeFileSync(outputHtmlPath, finalHtml, "utf-8")

console.log("Build complete. Output written to dist/index.html")