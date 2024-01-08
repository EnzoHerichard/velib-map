import React from "react";
import { StyledMessageBox } from "./styles";

const MessageBox = ({ message, color }) => {
  return <StyledMessageBox color={color}>{message}</StyledMessageBox>;
};

export default MessageBox;
