import styled from 'styled-components';

export const LogoutButton = styled.button`
    background-color: #FF6347;
    color: #fff;
    border: 1px solid #FF6347;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    &:hover {
        background-color: #fff;
        color: #FF6347;
        border: 1px solid #FF6347;
    }
`;

export const Svg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;