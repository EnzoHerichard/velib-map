import React, { useEffect, useState } from "react";
import Logout from "../../components/Logout/Logout";
import Cookies from "js-cookie";
import verify from "../../helpers/verify";
import handleUpdateUser from "../../helpers/updateUser";
import * as S from "./styles";

const Settings = () => {
  const [username, setUsername] = useState(null);
  const [newUsername, setNewUsername] = useState('');

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

  const handleUpdateUser = async () => {
    const token = Cookies.get("authToken");
    const getUsername = await verify(token);
    if (getUsername && getUsername.user.username) {
        const id = getUsername.user.id;
        const updateUser = await handleUpdateUser({ newUsername, id });
        if (updateUser.success) {
            setUsername(newUsername);
            setNewUsername('');
        }
    } else {
        console.error("Unable to get username");
    }
    };

  return (
    <div>
      {username ? (
        <h1>Bonjour {username}</h1>
      ) : (
        <p>Chargement du nom d'utilisateur...</p>
      )}
      <Logout />
      <S.FormContainer>
        <form>
          <S.Label>
            Username:
            <S.Input type="text" name="username"  value={newUsername} onChange={(e) => setUsername(e.target.value)}/>
          </S.Label>
          <S.Button type="button" onClick={handleUpdateUser}>Modifier</S.Button>
        </form>
      </S.FormContainer>
    </div>
  );
};

export default Settings;
