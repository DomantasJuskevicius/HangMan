import React from "react";
import {GameName, Text} from "./Styles/Hangman.styled";

const Header = () => {
  return (
    <>
      <GameName>Hangman</GameName>
      <Text newGame={this.state.newGame}>Guess the word</Text>
    </>
  );
};

export default Header;
