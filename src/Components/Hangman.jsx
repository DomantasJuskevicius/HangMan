import React from "react";
import styled from "styled-components";
import notStarted from "../images/notStarted.png";
import gameOver from "../images/gameOver.png";
import Left_1 from "../images/1left.png";
import Left_2 from "../images/2left.png";
import Left_3 from "../images/3left.png";
import Left_4 from "../images/4left.png";
import Left_5 from "../images/5left.png";
import Left_6 from "../images/6left.png";
import Left_7 from "../images/7left.png";
import Left_8 from "../images/8left.png";
import Left_9 from "../images/9left.png";
import Left_10 from "../images/10left.png";

const Pictures = styled.div`
    background: url(${notStarted}) no-repeat center center;
    display: ${props => (props.newGame ? 'block' : 'none')};
    opacity: ${props => (props.newGame ? 1: 0)};
    transition: all 0.3s linear;
    $[stage='11']{
      background-image: url(${notStarted});
    }
    $[stage='10']{
      background-image: url(${Left_10});
    }
    $[stage='9']{
      background-image: url(${Left_9});
    }
    $[stage='8']{
      background-image: url(${Left_8});
    }
    $[stage='7']{
      background-image: url(${Left_7});
    }
    $[stage='6']{
      background-image: url(${Left_6});
    }
    $[stage='5']{
      background-image: url(${Left_5});
    }
    $[stage='4']{
      background-image: url(${Left_4});
    }
    $[stage='3']{
      background-image: url(${Left_3});
    }
    $[stage='2']{
      background-image: url(${Left_2});
    }
    $[stage='1']{
      background-image: url(${Left_1});
    }
    $[stage='0']{
      background-image: url(${gameOver});
    }
`;

const Hangman = props => {
  return <Pictures {...props} stage={props.currentStage}/>;
};

export default Hangman;
