import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  display: ${(props) => (props.newGame ? "Container" : "none")};
`;

function Stroke(props) {
  return (
    <SVG height="80" width="40" {...props}>
      <g fill="none" stroke="black">
        <path strokeLinecap="round" strokeWidth="4" d="M5 20 l215 0" />
      </g>
    </SVG>
  );
}

export default Stroke;
