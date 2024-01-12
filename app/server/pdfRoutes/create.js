const pdfUrl  = require("./pdfUrl");
const express = require("express");

const createItineraryRoute = express.Router();

createItineraryRoute.post("/create", async (req, res) => {
  try {
    const {
      name,
      user_id,
      startPointLng,
      startPointLat,
      endPointLng,
      endPointLat,
    } = req.body;
console.log(pdfUrl)
    const pdfServerResponse = await fetch(`${pdfUrl}/itinerary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        user_id,
        startPointLng,
        startPointLat,
        endPointLng,
        endPointLat,
      }),
    });

    if (pdfServerResponse.ok) {
      const pdfServerData = await pdfServerResponse.json();

      res.status(pdfServerResponse.status).json(pdfServerData);
    } else {
      res.status(pdfServerResponse.status).send("Échec de l'authentification");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'authentification");
  }
});

module.exports = createItineraryRoute;
