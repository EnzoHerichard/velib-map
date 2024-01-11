const createRoute = (app, db) => {
  app.post("/itinerary", async function (req, res) {
    const {
      user_id,
      startPointLng,
      startPointLat,
      nearestStartStationPointLng,
      nearestStartStationPointLat,
      nearestEndStationPointLng,
      nearestEndStationPointLat,
      endPointLng,
      endPointLat,
    } = req.body;

    db.get(
      "SELECT * FROM itinerary WHERE user_id = ? AND startPointLng = ? AND startPointLat = ? AND nearestStartStationPointLng = ? AND nearestStartStationPointLat = ? AND nearestEndStationPointLng = ? AND nearestEndStationPointLat = ? AND endPointLng = ? AND endPointLat = ?",
      [
        user_id,
        startPointLng,
        startPointLat,
        nearestStartStationPointLng,
        nearestStartStationPointLat,
        nearestEndStationPointLng,
        nearestEndStationPointLat,
        endPointLng,
        endPointLat,
      ],
      async (err, row) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (row) {
          return res.status(409).send("Itineraire déjà enregistré");
        }

        try {
          db.run(
            "INSERT INTO itinerary (user_id, startPointLng,startPointLat, nearestStartStationPointLng,nearestStartStationPointLat, nearestEndStationPointLng,nearestEndStationPointLat, endPointLng, endPointLat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              user_id,
              startPointLng,
              startPointLat,
              nearestStartStationPointLng,
              nearestStartStationPointLat,
              nearestEndStationPointLng,
              nearestEndStationPointLat,
              endPointLng,
              endPointLat,
            ],
            (err) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(201).send({ message: "Itinéraire créé avec succès" });
            }
          );
        } catch (hashError) {
          return res.status(500).send(hashError);
        }
      }
    );
  });
};
module.exports = createRoute;
