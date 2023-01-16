import styled, { keyframes } from "styled-components";
// =============================================================================
// #2.4 Animations and Pseudo selectors
// ## Animations
// - 스타일 컴포넌트에 애니메이션을 사용하려면 keyframes 를 사용해야 한다
//
// ## Pseudo selectors
// 내부에 중첩해서 값을 넣으면, 추측하여 앨리먼트를 알아서 선택한다
// =============================================================================

const Parent = styled.div`
  display: flex;
`;

const customAnimation = keyframes`
  /* from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  } */
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
    opacity: 0.9;
  }
  25% {
    transform: rotate(90deg);
    border-radius: 10px;
    opacity: 0.8;
  }
  50% {
    transform: rotate(180deg);
    border-radius: 30px;
    opacity: 0.7;
  }
  75% {
    transform: rotate(270deg);
    border-radius: 50px;
    opacity: 0.6;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 100px;
    opacity: 0.5;
  }   
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: orangered;
  animation: ${customAnimation} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 32px;
    &:hover {
      font-size: 48px;
      cursor: pointer;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Parent>
      <Box>
        <span>😄</span>
      </Box>
    </Parent>
  );
}

export default App;
