const pdfUrl  = require("./pdfUrl");
const express = require("express");

const getItineraryByIdRoute = express.Router();

getItineraryByIdRoute.get("/itinerary/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const pdfServerResponse = await fetch(`${pdfUrl}/itinerary/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

module.exports = getItineraryByIdRoute;
