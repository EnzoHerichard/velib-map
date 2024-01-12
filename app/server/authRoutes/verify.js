const express = require("express");
const authUrl = require("./authUrl");
const verifyRoute = express.Router();

verifyRoute.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    const authServerResponse = await fetch(`${authUrl}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (authServerResponse.ok) {
      const authServerData = await authServerResponse.json();

      res.status(authServerResponse.status).json(authServerData);
    } else {
      res
        .status(authServerResponse.status)
        .send("Échec de la verification du token");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la verification du token");
  }
});

module.exports = verifyRoute;
