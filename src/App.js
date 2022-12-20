import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;

const Box1 = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const Box2 = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
  font-size: large;
`;

function App() {
  // 일반적인 스타일 사용법
  // return (
  //   <div style={{ display: "flex" }}>
  //     <div style={{ backgroundColor: "teal", width: 100, height: 100 }}></div>
  //     <div style={{ backgroundColor: "tomato", width: 100, height: 100 }}></div>
  //   </div>
  // );
  return (
    <Parent>
      <Box1>
        <Text>스타일 컴포넌트 사용 텍스트</Text>
      </Box1>
      <Box2 />
    </Parent>
  );
}

export default App;
