import React, { useState } from 'react';
import * as S from '../styles';
import Alert from '../../Alert/Alert';
import handleLogin from '../../../helpers/Auth/login';
import { useNavigate } from "react-router-dom";

const Login = ({ switchForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', color: '' });

  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();
    const loginData = await handleLogin({ username, password });
    if (loginData.success) {
      navigate('/');
      //ajouter le token dans la session
    } else {
      console.error('Échec de la connexion:', loginData.message);
      setAlert({ show: true, message: 'Échec de la connexion', color: '#FF6347' });
    }
  };

  return (
    <S.Container>
    <S.FormContainer>
      <S.Title>Login</S.Title>
      {alert.show && <Alert message={alert.message} color={alert.color} />}
      <form>
        <S.Label>
          Username:
          <S.Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </S.Label>
        <S.Label>
          Password:
          <S.Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </S.Label>
        <S.Button type="button" onClick={handleLoginForm}>
          Connexion
        </S.Button>
        <S.AlternateText>
          Vous n'avez pas de comtpe ?{' '}
          <S.AlternateLink onClick={() => switchForm('signup')}>S'inscrire</S.AlternateLink>
        </S.AlternateText>
      </form>
    </S.FormContainer>
  </S.Container>
  );
};

export default Login;
