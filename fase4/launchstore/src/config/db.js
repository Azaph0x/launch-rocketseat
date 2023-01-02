const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: "tony",
    host: "localhost",
    port: 5432,
    database: "launchstore"
})