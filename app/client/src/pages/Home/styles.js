import styled from 'styled-components';

export const DivButtons = styled.div`
    display: flex;
    margin-top: 20px;
`;

export const Svg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

export const Button = styled.button`
    background-color: #4062BB;
    color: #fff;
    border: 1px solid #4062BB;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
    margin-top: 20px;
    margin-right: 20px;

    display: flex;
    align-items: center;
    &:hover {
        background-color: #fff;
        color: #4062BB;
        border: 1px solid #4062BB;
    }
`;