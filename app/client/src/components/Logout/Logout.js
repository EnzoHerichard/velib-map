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
    const { username } = await verify(token);
    console.log(username);
    const logoutData = await handleLogout({ username });
    console.log(logoutData);
    if (logoutData.success) {
      logout();
    }
  };

  return (
    <S.LogoutButton onClick={handleLogoutButton}>Se déconnecter</S.LogoutButton>
  );
};

export default Logout;
