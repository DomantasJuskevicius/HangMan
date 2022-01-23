import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Letters from "./Components/Letters";
import Hangman from "./Components/Hangman";
import Stroke from "./Components/Stroke";
import { Container } from "./Components/Styles/Container.styled";
import { GameName, Text } from "./Components/Styles/Hangman.styled";
import styled from "styled-components";
import { socket } from "./service/socket";
import ReactDOM from "react-dom";

const START = styled.button`
  display: ${(props) => (props.newGame ? "none" : "START")};
`;

const QUIT = styled.button`
  display: ${(props) => (props.newGame ? "QUIT" : "none")};
`;

const INPUT = styled.ul`
  display: ${(props) => (props.newGame ? "INPUT" : "none")};
`;

const GamePlaying = styled.div`
  display: ${(props) => (props.gameFinished ? "none" : "GamePlaying")};
`;

const GameEnded = styled.div`
  display: ${(props) => (props.gameFinished ? "gameEnded" : "none")};
`;

const GameLost = styled.div`
  display: ${(props) => (props.gameLost ? "gameEnded" : "none")};
`;

const STROKES = styled.div`
  display: flex;
  flex-direction: row;
`;

const LETTERS = styled.div`
  position: absolute;
  margin: 15px;
  margin-top: 2px;
`;

function App() {
  let [wordLength, setwordLength] = useState("");
  let [newGame, setnewGame] = useState("");
  let [gameData, setgameData] = useState("");
  let [gameFinished, setgameFinished] = useState("");
  let [gameWon, setgameWon] = useState("");
  let [gameLost, setgameLost] = useState("");
  const [sendRequest, setSendRequest] = useState(false);
  const [sendGame, setsendGame] = useState(false);

  useEffect(() => {
    socket.on("new user", setwordLength);
    socket.on("sendAnswer", setgameData);
    if (sendGame) {
      socket.emit("startGame", newGame);
      socket.on("sendAnswer", setgameData);
      console.log("Send game");
      setgameFinished(false);
      setsendGame(false);
    }
    if (sendRequest) {
      socket.on("sendAnswer", setgameData);
      console.log(socket.id);
      console.log("Send request");
      setSendRequest(false);
    }
    if (gameData.lettersFoundCount == wordLength) {
      setgameWon(true);
      setgameFinished(true);
    }
    if (gameData.stage == 0){
      setgameFinished(true);
      setgameLost(true);
    }
    return () => {
      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    };
  }, [sendRequest, sendGame, gameLost, gameWon, gameFinished]);

  function startGame(e) {
    console.log(socket.id);
    e.preventDefault();
    setnewGame(true);
    setgameLost(false);
    setgameFinished(false);
    setsendGame(true);
  }

  function endGame(e) {
    e.preventDefault();
    setnewGame(false);
    setsendGame(true);
  }

  function refreshPage() {
    window.location.reload(false);
  }
  
  function Strokes(props) {
    console.log(props);
    return (
      <STROKES>
        {Array.from(Array(wordLength), (e, i) => {
          return (
            <span key={(e, i)}>
              <LETTERS>{props.letters && props.letters[i]}</LETTERS>
              <Stroke newGame={newGame} />
            </span>
          );
        })}
      </STROKES>
    );
  }
  console.log(gameData);
  return (
    <Container>
      <GameName>Hangman</GameName>
      <START onClick={startGame} newGame={newGame}>
        NEW GAME
      </START>
      <GamePlaying gameFinished={gameFinished}>
        <QUIT onClick={endGame} newGame={newGame}>
          GIVE UP
        </QUIT>
        <Text newGame={newGame}>Guess the word</Text>
        <Text newGame={newGame}>
          Letters guessed: {gameData.lettersFoundCount}
        </Text>
        <Hangman currentStage={gameData.stage} />
        <Strokes letters={gameData.correct} />
        <Letters newGame={newGame} onClick={() => setSendRequest(true)} />
      </GamePlaying>
      <GameEnded gameFinished={gameWon}>
        <h1>YOU WIN</h1>
        <button onClick={refreshPage}>Click to play again!</button>
      </GameEnded>
      <GameLost gameLost={gameLost}>
        <h1>YOU LOST</h1>
        <button onClick={refreshPage}>Click to play again!</button>
      </GameLost>
    </Container>
  );
}

export default App;
