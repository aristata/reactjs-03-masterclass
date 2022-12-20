import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;

// props 를 활용하여 스타일 적용하기
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

// 스타일 재활용하기
// Box 컴포넌트의 스타일에 일부 스타일을 수정 또는 추가 하여 사용하려 한다면
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.span`
  color: white;
  font-size: large;
`;

function App() {
  return (
    <Parent>
      <Box bgColor="teal">
        <Text>스타일드 컴포넌트</Text>
      </Box>
      <Circle bgColor="tomato">
        <Text>스타일 재사용</Text>
      </Circle>
    </Parent>
  );
}

export default App;
