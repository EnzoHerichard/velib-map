import React, { useEffect, useState } from "react";
import Logout from "../../components/Logout/Logout";
import Cookies from "js-cookie";
import verify from "../../helpers/verify";
import handleUpdateUser from "../../helpers/updateUser";
import * as S from "./styles";

const Settings = () => {
  const [username, setUsername] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [token, setToken] = useState(Cookies.get("authToken"));

  useEffect(() => {
    const fetchUsername = async () => {
      try {
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
  }, [token]); 

  const handleUpdateUserForm = async (e) => {
    e.preventDefault();
    const getUsername = await verify(token);

    if (getUsername) {
      const id = getUsername.user.id;
      const updateUser = await handleUpdateUser(newUsername, id );
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
            <S.Input type="text" name="newUsername" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </S.Label>
          <S.Button type="button" onClick={handleUpdateUserForm}>Modifier</S.Button>
        </form>
      </S.FormContainer>
    </div>
  );
};

export default Settings;
