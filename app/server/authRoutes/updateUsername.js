const express = require("express");
const authUrl = require("./authUrl");
const updateUsernameRoute = express.Router();

updateUsernameRoute.post("/updateUsername/:id", async (req, res) => {
  try {
    const { username } = req.body;
    const id = req.params.id;

    const authServerResponse = await fetch(`${authUrl}/updateUsername/${id}`, {
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
      res
        .status(authServerResponse.status)
        .send("Échec de la modification du nom d'utilisateur");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la modification du nom d'utilisateur");
  }
});

module.exports = updateUsernameRoute;
