import React, { useEffect, useState } from "react";
import Logout from "../../components/Logout/Logout";
import Cookies from "js-cookie";
import verify from "../../helpers/verify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = Cookies.get("authToken");
        const getUsername = await verify(token);

        if (getUsername && getUsername.user && getUsername.user.username) {
          const fetchedUsername = getUsername.user.username;
          setUsername(fetchedUsername);
        } else {
          console.error("Unable to get username");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUsername(); 
  }, []); 

  return (
    <div>
      {username ? (
        <h1>Bonjour {username}</h1>
      ) : (
        <p>Chargement du nom d'utilisateur...</p>
      )}
      <Logout />
      <button onClick={() => navigate('/settings')}>Settings</button>
    </div>
  );
};

export default Home;
