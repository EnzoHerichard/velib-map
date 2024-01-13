import React from 'react';

import styled from 'styled-components';

export const BackButton = styled.button`
    background-color: #0D1321;
    color: #fff;
    border: 1px solid #0D1321;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
    align-items: center;
    &:hover {
        background-color: #fff;
        color: #0D1321;
        border: 1px solid #0D1321;
    }
`;

export const Svg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const handleBack = () => {
    window.history.back();
    }

const BackToHome = () => {
  return (
      <BackButton onClick={handleBack}><Svg src="https://www.svgrepo.com/show/286678/arrow-back.svg"></Svg>Retour à la page d'accueil</BackButton>

  );
};


export default BackToHome;
