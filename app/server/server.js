const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const createRoute = require('./routes/create')
const getUserItineraries = require('./routes/getUserItineraries')
const getItineraryById = require('./routes/getItineraryById')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


const db = new sqlite3.Database('itinerary')

createRoute(app, db)
getUserItineraries(app, db)
getItineraryById(app, db)


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3050, () => console.log('Server running on port 3050'))