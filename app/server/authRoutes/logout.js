const express = require("express");
const authUrl = require("./authUrl");
const logoutRoute = express.Router();

logoutRoute.post("/logout", async (req, res) => {
  try {
    const { username } = req.body;

    const authServerResponse = await fetch(`${authUrl}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (authServerResponse.ok) {
      const authServerData = await authServerResponse.json();

      res.status(authServerResponse.status).json(authServerData);
    } else {
      res.status(authServerResponse.status).send("Échec de la deconnexion");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la deconnexion");
  }
});

module.exports = logoutRoute;
