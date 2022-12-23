import styled, { keyframes } from "styled-components";
// =============================================================================
// #2.5 Pseudo selectors 2
// - 만약 스타일 컴포넌트 내부 엘리먼트의 종류에 상관없이 스타일을 적용하고 싶다면?
// - 만약 스타일 컴포넌트 내부에 또 다른 스타일 컴포넌트를 넣을 수 있다
// - 그리고 다음과 같은 방법으로 엘리먼트를 선택할 수 있다
// =============================================================================

const Parent = styled.div`
  display: flex;
`;

const customAnimation = keyframes`
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

const Emoji = styled.span`
  font-size: 32px;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: orangered;
  animation: ${customAnimation} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji}:hover {
    font-size: 98px;
    cursor: pointer;
  }
`;

function App() {
  return (
    <Parent>
      <Box>
        <Emoji>😄</Emoji>
      </Box>
      <Emoji>😥</Emoji>
    </Parent>
  );
}

export default App;
