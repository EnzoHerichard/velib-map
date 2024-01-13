const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("itinerary");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS itinerary (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT, name TEXT, startPointLng FLOAT,startPointLat FLOAT, endPointLng FLOAT,endPointLat FLOAT, created_date DATETIME DEFAULT CURRENT_TIMESTAMP)"
  );
});
