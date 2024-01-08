import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export const FormContainer = styled.div`  
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
`;

export const Title = styled.h2`
  color: #0d1321;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #0d1321;
`;

export const Input = styled.input`
  width: calc(100% - 16px);
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #0d1321;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #c2eabd;
  color: #0d1321;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4062bb;
    color: #ffffff;
  }
`;

export const AlternateText = styled.p`
  margin-top: 16px;
  color: #0d1321;
`;

export const AlternateLink = styled.span`
  color: #4062bb;
  cursor: pointer;
`;
