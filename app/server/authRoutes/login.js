const express = require("express");
const authUrl = require("./authUrl");
const loginRoute = express.Router();

loginRoute.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const authServerResponse = await fetch(`${authUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (authServerResponse.ok) {
      const authServerData = await authServerResponse.json();

      res.status(authServerResponse.status).json(authServerData);
    } else {
      res.status(authServerResponse.status).send("Échec de l'authentification");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'authentification");
  }
});

module.exports = loginRoute;
