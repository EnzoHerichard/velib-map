const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('velib')

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (username, password, token)')
})