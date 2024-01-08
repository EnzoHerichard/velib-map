import React, { useState } from "react";
import * as S from "../styles";
import handleRegister from "../../../helpers/Auth/register";
import Alert from "../../Alert/Alert";

const Register = ({ switchForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const registerData = await handleRegister({ username, password });

    if (registerData.success) {
      console.log("Register success:", registerData.user);
      switchForm("login");
    } else {
      console.log("Register error:", registerData.message);
      setAlert({ show: true, message: "Erreur lors de l'inscription", color: "#FF6347" });

    }
  };

  return (
    <S.Container>
      <S.FormContainer>
        <S.Title>Signup</S.Title>
        {alert.show && <Alert message={alert.message} color={alert.color} />}
        <form>
          <S.Label>
            Username:
            <S.Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </S.Label>
          <S.Label>
            Password:
            <S.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </S.Label>
          <S.Button type="button" onClick={handleRegisterForm}>
            S'inscrire
          </S.Button>
          <S.AlternateText>
            Avez-vous déja un compte ?{" "}
            <S.AlternateLink onClick={() => switchForm("login")}>
              Se connecter
            </S.AlternateLink>
          </S.AlternateText>
        </form>
      </S.FormContainer>
    </S.Container>
  );
};

export default Register;
