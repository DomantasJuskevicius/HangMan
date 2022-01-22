import styled from "styled-components";

export const GameName = styled.h1`
  font-size: 60px;
  margin: 0;
  color: white;
`;

export const Text = styled.p`
  font-size: 20px;
  padding: 20px 0;
  color: white;
  visibility: ${(props) => (props.newGame ? "visible" : "hidden")};
`;
