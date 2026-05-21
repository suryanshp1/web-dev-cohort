const { drizzle } = require('drizzle-orm/node-postgres')

// postgres url schema : postgres://<user>:<password>@<host>:<port>/<database>
const db = drizzle(process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/mydb')

module.exports = db;