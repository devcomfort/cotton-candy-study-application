import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const LotsBoxWrap = styled.div`
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const DefaultLotsBox = styled.div`
  width: 200px;
  height: 150px;
  margin: 0.4rem;
  background: #febf00;
  transform-origin: 50% 0%;
  border-radius: 0.5rem;
`;

const shake = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(5px, 5px) rotate(5deg); }
  50% { transform: translate(0, 0) rotate(0eg); }
  75% { transform: translate(-5px, 5px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

export const ShakingLotsBox = styled.div`
  width: 200px;
  height: 150px;
  margin: 0.4rem;
  background: #febf00;
  transform-origin: 50% 0%;
  border-radius: 0.5rem;
  animation-name: ${shake};
  animation-duration: 0.15s;
  animation-iteration-count: infinite;
  animation-delay: 0.2s;
`;

export const LotsBtn = styled.button`
  font-weight: 600;
  color: white;
  border: 1px solid #b43939;
  background-color: #ff6868;
  border-radius: 0.5rem;
  padding: 1rem;
`;
