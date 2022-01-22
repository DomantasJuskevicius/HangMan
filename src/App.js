import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import Header from "./Components/Header";
import Hangman from "./Components/Hangman";
import Interactions from "./Components/Interactions";
import { Container } from "./Components/Styles/Container.styled";
import { GameName, Text } from "./Components/Styles/Hangman.styled";

const ENDPOINT = "http://127.0.0.1:8123/";

function App() {
  const [response, setResponse] = useState("");
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
    const socket = socketIOClient(ENDPOINT);
    socket.on("new user", (data) => {
      setResponse(data);
    });

    return() => socket.disconnect();
  }, []);

  return (
    <>
      <Container>
        <GameName>Hangman</GameName>
        <Text newGame={state.newGame}>Guess the word</Text>
        <Container>
          <Hangman />
        </Container>
        <Interactions />
      </Container>
    </>
  );
}

export default App;
