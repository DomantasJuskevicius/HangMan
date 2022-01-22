import React from 'react';
import './App.css';
import Header from './Components/Header';
import Hangman from './Components/Hangman';
import Interactions from './Components/Interactions';
import {Container} from './Components/Styles/Container.styled'

function App() {
  return (
    <Container>
      <Header />
      <Container>
        <Hangman />
      </Container>
      <Interactions />
    </Container>
  );
}

export default App;
