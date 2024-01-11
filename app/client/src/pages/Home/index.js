import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import verify from "../../helpers/verify";
import { useNavigate } from "react-router-dom";
import { Button, DivButtons, Svg } from "./styles";

const Home = () => {
  const [username, setUsername] = useState(null);
  const [randomGreeting, setRandomGreeting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = Cookies.get("authToken");
        const getUsername = await verify(token);

        if (getUsername && getUsername.user && getUsername.user.username) {
          const fetchedUsername = getUsername.user.username;
          setUsername(fetchedUsername);
          setRandomGreeting(generateRandomGreeting());
        } else {
          console.error("Unable to get username");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUsername();
  }, []);

  const generateRandomGreeting = () => {
    const greetings = [
      "Prêt à pédaler vers de nouvelles aventures ?",
      "N'oublie pas, la vie c'est comme le vélo, pour garder l'équilibre, il faut avancer !",
      "En selle pour une journée pleine de découvertes ",
      "À vélo, la vie est toujours plus belle !",
       "Pédale vers le bonheur, c'est la meilleure destination !",
       "La vie est un voyage, et le vélo est le meilleur moyen de l'explorer."
    ];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  };

  return (
    <div>
      {username ? (
        <>
          <h1>Bonjour {username} ! {randomGreeting}</h1>
        </>
      ) : (
        <p>Chargement du nom d'utilisateur...</p>
      )}
      <DivButtons>
        <Button onClick={() => navigate("/new-itinerary")}>
          <Svg src="https://www.svgrepo.com/show/513321/map.svg" />
          Nouvel itinéraire
        </Button>
        <Button onClick={() => navigate("/list-stations")}>
          <Svg src="https://www.svgrepo.com/show/503793/bike.svg" />
          Liste des stations
        </Button>
        <Button onClick={() => navigate("/my-itineraries")}>
          <Svg src="https://www.svgrepo.com/show/76942/files.svg" />
          Mes itinéraires sauvegardés
        </Button>
        <Button onClick={() => navigate("/settings")}>
          <Svg src="https://www.svgrepo.com/show/395644/settings.svg" />
          Settings
        </Button>
      </DivButtons>
    </div>
  );
};

export default Home;
