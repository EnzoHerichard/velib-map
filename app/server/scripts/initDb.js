const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("itinerary");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS itinerary (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT, startPointLng FLOAT,startPointLat FLOAT, nearestStartStationPointLng FLOAT,nearestStartStationPointLat FLOAT, nearestEndStationPointLng FLOAT,nearestEndStationPointLat FLOAT, endPointLng FLOAT,endPointLat FLOAT)"
  );
});
