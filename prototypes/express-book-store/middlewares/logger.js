const fs = require('fs');

exports.loggerMiddleware = function(req, res, next) {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.path}`
    fs.appendFileSync('logs.txt', log + '\n')
    next()
}