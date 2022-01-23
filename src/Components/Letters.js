import React from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import {socket} from "../service/socket"

const Container = styled.ul`
  padding: 0;
  display: ${(props) => (props.newGame ? "Container" : "none")};
  list-style-type: none;
  margin: 5px 0;
  li {
    cursor: pointer;
    margin-right: 11px;
    padding: 1px;
    text-transform: uppercase;
    font-size: 22px;
    display: inline-block;
  }
  li[disabled] {
    text-decoration: line-through;
    opacity: 0.4;
    pointer-events: none;
  }
`;

function sendLetter(letter) {
  socket.emit("sendLetter", letter);
  console.log(letter);
}

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

function Letters(props) {
  return (
    <div>
      <Container {...props}>
        {letters.map((letter, i) => (
          <li key={i} onClick={(e) => {sendLetter(letter)}}>
            {letter}
          </li>
        ))}
      </Container>
    </div>
  );
}

export default Letters;
