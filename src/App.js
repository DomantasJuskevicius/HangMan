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

const INPUT = styled.ul`
  display: ${(props) => (props.newGame ? "INPUT" : "none")};
`;


function App() {
  var [wordLength, setwordLength] = useState("");
  var [newGame, setnewGame] = useState("");
  var [gameData, setgameData] = useState("");
  const [sendRequest, setSendRequest] = useState(false);
  const [sendGame, setsendGame] = useState(false);

  useEffect(() => {
    socket.on("new user", setwordLength);
    socket.on("user left", setwordLength);
    socket.on("sendAnswer", setgameData);
    if (sendRequest) {
      socket.on("sendAnswer", setgameData);
      setSendRequest(false);
    }
    if (sendGame) {
      socket.emit("startGame", newGame);
      socket.on("sendAnswer", setgameData);
      setsendGame(false);
    }

    return () => {
      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    };
  }, [sendRequest, sendGame]);

  function startGame(e) {
    e.preventDefault();
    socket.on("sendAnswer", setgameData);
    setnewGame(true);
    setsendGame(true);
  }

  function endGame(e) {
    e.preventDefault();
    socket.on("sendAnswer", setgameData);
    setnewGame(false);
    setsendGame(true);
  }

  function Strokes() {
    return (
      <div>
        {Array.from(Array(wordLength), (e, i) => {
          return (
            <span key={(e, i)}>
              {/* <INPUT newGame={newGame}>a</INPUT> */}
              <Stroke newGame={newGame} />
            </span>
          );
        })}
      </div>
    );
  }
  console.log(gameData);
  return (
    <Container>
      <GameName>Hangman</GameName>
      <START onClick={startGame} newGame={newGame}>
        NEW GAME
      </START>
      <QUIT onClick={endGame} newGame={newGame}>
        GIVE UP
      </QUIT>
      <Text newGame={newGame}>Guess the word</Text>
      <Hangman currentStage={gameData.stage} />
      <Strokes />
      <Letters newGame={newGame} onClick={() => setSendRequest(true)} />
    </Container>
  );
}

export default App;
