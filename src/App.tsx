import styled from "styled-components";
import { GlobalStyle } from "./styles/global-styles";
import Ch811 from "./lectures/8.11_AnimatePresence";
import Ch812 from "./lectures/8.12_Slider";
import Ch814 from "./lectures/8.14_LayoutProps";
import Ch815 from "./lectures/8.15_LayoutPlusAnimatePresence";

const Title = styled.div`
  color: #424242;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  padding: 20px;
`;

const HrLine = styled.hr`
  border: 1px solid #7c7768;
  align-items: center;
  width: 75%;
`;

const Lecture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding: 20px;
`;

const LectureTitle = styled.h4`
  color: #424242;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Title>React Masterclass</Title>
      <HrLine />
      <Lecture>
        <LectureTitle>8.11 Animate Presence</LectureTitle>
        <Ch811 />
      </Lecture>
      <HrLine />
      <Lecture>
        <LectureTitle>8.12 Slider</LectureTitle>
        <Ch812 />
      </Lecture>
      <HrLine />
      <Lecture>
        <LectureTitle>8.14 Layout Props</LectureTitle>
        <Ch814 />
      </Lecture>
      <HrLine />
      <Lecture>
        <LectureTitle>8.15 Layout + animate presence</LectureTitle>
        <Ch815 />
      </Lecture>
    </>
  );
}

export default App;
