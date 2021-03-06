import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid #d4a6ae;
  border-right: 2px solid #d4a6ae;
  border-bottom: 2px solid #d4a6ae;
  border-left: 4px solid #be85a6;
  background: transparent;
  width: 34px;
  height: 34px;
  position: absolute;
  margin-right: 10px;
  top: 5%;
  right: 0;
  border-radius: 50%;
`;
