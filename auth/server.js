const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const verifyRoutes = require('./routes/verify');
const updateUserName = require('./routes/updateUserName');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


const db = new sqlite3.Database('velib')

registerRoutes(app, db)
loginRoutes(app, db)
logoutRoutes(app, db)
verifyRoutes(app, db)
updateUserName(app, db)
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3042, () => console.log('Server running on port 3042'))