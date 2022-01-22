import React, { useState, useEffect } from "react";
import { socket } from "./service/socket";
import "./App.css";
import Letters from "./Components/Letters";
import Hangman from "./Components/Hangman";
import Interactions from "./Components/Interactions";
import Stroke from "./Components/Stroke";
import { Container } from "./Components/Styles/Container.styled";
import { GameName, Text } from "./Components/Styles/Hangman.styled";

function App() {
  const [wordLength, setwordLength] = useState("");
  const [state, setState] = useState({
    words: [],
    stage: 11,
    wordSelected: 0,
    guessedLetters: [],
    correct: [],
    incorrect: [],
    newGame: true,
  });

  useEffect(() => {
    socket.on("new user", setwordLength);
    socket.on("Letters guessed", setState.guessedLetters);
    return () => {
      socket.off("disconnect", setwordLength);
    };
  }, []);


  function Strokes() {
    return (
      <ul>
        {Array.from(Array(wordLength), (e, i) => {
          return (
            <span key={(e, i)}>
              <Stroke />
            </span>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <Container>
        <GameName>Hangman</GameName>
        <Text newGame={state.newGame}>Guess the word</Text>
        <Container>
          <Hangman />
        </Container>
        <Strokes />
        <Letters newGame={state.newGame} />
        <Interactions />
      </Container>
    </>
  );
}

export default App;
