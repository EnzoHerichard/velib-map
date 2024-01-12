const createRoute = (app, db) => {
  app.post("/itinerary", async function (req, res) {
    const {
      user_id,
      name,
      startPointLng,
      startPointLat,
      endPointLng,
      endPointLat,
    } = req.body;

    db.get(
      "SELECT * FROM itinerary WHERE user_id = ? AND name = ? AND startPointLng = ? AND startPointLat = ? AND endPointLng = ? AND endPointLat = ?",
      [
        user_id,
        name,
        startPointLng,
        startPointLat,
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
            "INSERT INTO itinerary (user_id,name, startPointLng,startPointLat, endPointLng, endPointLat) VALUES (?, ?, ?, ?, ?, ?)",
            [
              user_id,
              name,
              startPointLng,
              startPointLat,
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
