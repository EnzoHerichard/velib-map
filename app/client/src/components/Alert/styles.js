import styled from 'styled-components';

export const StyledMessageBox = styled.div`
  padding: 16px;
  background-color: ${(props) => props.color || '#c2eabd'};
  color: #0d1321;
  border-radius: 4px;
  margin-bottom: 16px;
`;