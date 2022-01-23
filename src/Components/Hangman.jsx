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
  border: 1px solid #000;
  width: 300px;
  height: 300px;
  background: url(${({currentStage}) => handleStage(currentStage)}) center;
  background-size: 100%;
  margin: 0 15px;
  transition: all 0.3s linear;
`;

const handleStage =currentStage => {
  switch (currentStage) {
    case 11:
      return notStarted;
    case 10:
      return Left_10;
    case 9:
      return Left_9;
    case 8:
      return Left_8;
    case 7:
      return Left_7;
    case 6:
      return Left_6;
    case 5:
      return Left_5;
    case 4:
      return Left_4;
    case 3:
      return Left_3;
    case 2:
      return Left_2;
    case 1:
      return Left_1;
    case 0:
      return gameOver;
  }
}

// const Hangman = props => {
//   return  <Pictures {...props} currentStage={props.currentStage} className="Hangman"/>;
// };

export default Pictures;
