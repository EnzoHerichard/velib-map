const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('velib');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, token TEXT)');
});
