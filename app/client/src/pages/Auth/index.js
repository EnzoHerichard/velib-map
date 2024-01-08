import React, { useState } from 'react';
import Login from '../../components/Auth/Login/Login';
import Register from '../../components/Auth/Register/Register';


const AuthPage = () => {
  const [activeForm, setActiveForm] = useState('login');

  const switchForm = (formType) => {
    setActiveForm(formType);
  };

  return (
    <div>
      {activeForm === 'login' ? <Login switchForm={switchForm} /> : <Register switchForm={switchForm} />}
    </div>
  );
};

export default AuthPage;
