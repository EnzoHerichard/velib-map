import React from "react";
import * as S from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import handleLogout from "../../helpers/logout";
import verify from "../../helpers/verify";
import Cookies from "js-cookie";

const Logout = () => {
  const { logout } = useAuth();
  const handleLogoutButton = async () => {
    const token = Cookies.get("authToken");
    const getUsername = await verify(token);
    console.log(getUsername.user.username);
    if (getUsername && getUsername.user.username) {
      const username = getUsername.user.username;

      const logoutData = await handleLogout({ username });
      if (logoutData.success) {
        logout();
      }
    } else {
      console.error("Unable to get username");
    }
  };

  return (
    <S.LogoutButton onClick={handleLogoutButton}>Se déconnecter</S.LogoutButton>
  );
};

export default Logout;
