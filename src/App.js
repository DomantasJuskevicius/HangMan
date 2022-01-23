import React, { useState, useEffect } from "react";
import { socket } from "./service/socket";
import "./App.css";
import Letters from "./Components/Letters";
import Hangman from "./Components/Hangman";
import Stroke from "./Components/Stroke";
import { Container } from "./Components/Styles/Container.styled";
import { GameName, Text } from "./Components/Styles/Hangman.styled";
import styled from "styled-components";

const START = styled.button`
  display: ${(props) => (props.newGame ? "none" : "START")};
`;

const QUIT = styled.button`
  display: ${(props) => (props.newGame ? "QUIT" : "none")};
`;

function App() {
  var [wordLength, setwordLength] = useState("");
  const [state, setState] = useState({
    currentStage: 11,
    guessedLetters: [],
    correct: [],
    incorrect: [],
    newGame: false,
  });

  useEffect(() => {
    socket.on("new user", setwordLength);
    socket.on("user left", setwordLength);
    return () => {
      socket.on("disconnect", () => {
        registerDisconnectHandler();
      });
    };
  }, []);

  function startGame(e) {
    e.preventDefault();
    socket.on("new user", setwordLength);
    console.log(state.currentStage);
    setState(() => {
      return { newGame: true, currentStage: state.currentStage - 1 };
    });
  }
  function registerDisconnectHandler() {
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
    setState(() => {
      return { newGame: false, currentStage: 11 };
    });
  }
  function Strokes() {
    return (
      <ul>
        {Array.from(Array(wordLength), (e, i) => {
          return (
            <span key={(e, i)}>
              <Stroke newGame={state.newGame} />
            </span>
          );
        })}
      </ul>
    );
  }
  return (
    <>
      <Container>
        <GameName>Hangman</GameName>
        <START onClick={startGame} newGame={state.newGame}>
          NEW GAME
        </START>
        <QUIT onClick={registerDisconnectHandler} newGame={state.newGame}>
          GIVE UP
        </QUIT>
        <Text newGame={state.newGame}>Guess the word</Text>
        <Hangman currentStage={state.currentStage} />
        <Strokes />
        <Letters newGame={state.newGame} />
      </Container>
    </>
  );
}

export default App;
