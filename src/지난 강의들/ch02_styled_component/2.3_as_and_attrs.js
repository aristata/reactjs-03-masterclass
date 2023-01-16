import styled from "styled-components";

// =============================================================================
// #2.3 'As' and Attrs
// ## as
// 만약 같은 스타일의 다른 태그를 사용하고 싶다면 어떻게 해야 할까?
// `as` 를 사용하여 같은 스타일드 컴포넌트를 사용하되,
// 실제 HTML 태그는 다른 것으로 그려지도록 할 수 있다
//
// ## attrs
// 만들어진 컴포넌트에 속성을 추가 하고 싶다면?
// `attrs` 를 체인 메소드로 호출하면, 속성을 추가 할 수 있다
// =============================================================================

const Parent = styled.div`
  display: flex;
`;

const Btn = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 8px;
  margin: 2px;
`;

const Input = styled.input.attrs({ required: true, maxLength: 10 })`
  background-color: orange;
  color: white;
`;

function App() {
  return (
    <Parent>
      <Btn>버튼</Btn>
      <Btn as={"a"}>링크</Btn>
      <Input />
    </Parent>
  );
}

export default App;
