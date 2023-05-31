import { motion } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const Chapter = styled(motion.div)`
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.theme.circleColor};
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  place-self: center;
`;

const boxMotion = {
  start: {
    opacity: 0,
    scale: 0.5
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  }
};

const circleMotion = {
  start: {
    opacity: 0,
    y: 10
  },
  end: {
    opacity: 1,
    y: 0
  }
};

const NomalBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(223, 230, 233, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

// 제스쳐와 variants 결합
const variantsWithGesture = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: {
    scale: 1,
    borderRadius: "100px"
  },
  drag: {
    backgroundColor: "rgba(255, 234, 167,1.0)",
    transition: { duration: 10 }
  }
};

// 제약 박스
const BiggerBox = styled(motion.div)`
  width: 350px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <Box variants={boxMotion} initial={"start"} animate={"end"}>
        <Circle variants={circleMotion}></Circle>
        <Circle variants={circleMotion}></Circle>
        <Circle variants={circleMotion}></Circle>
        <Circle variants={circleMotion}></Circle>
      </Box>
      <Chapter>
        <span>8.5 제스쳐</span>
        <NomalBox
          // whileHover={{ scale: 1.5, rotateZ: 90 }}
          // whileTap={{ scale: 1, borderRadius: "100px" }}
          drag
          variants={variantsWithGesture}
          whileHover={"hover"}
          whileTap={"click"}
          whileDrag={"drag"}
        ></NomalBox>
      </Chapter>
      <Chapter>
        <span>8.6 드래그 제약조건</span>
        <BiggerBox ref={biggerBoxRef}>
          <NomalBox
            drag
            // dragSnapToOrigin
            dragElastic={0.5}
            dragConstraints={biggerBoxRef}
            variants={variantsWithGesture}
            whileHover={"hover"}
            whileTap={"click"}
          ></NomalBox>
        </BiggerBox>
      </Chapter>
    </Wrapper>
  );
}

export default App;

/*************************************************************************************************
 * step2
 * variants
 * - variants 는 컴포넌트가 가질 수 있는 미리 정의된 시각적 state 이다
 * - https://www.framer.com/motion/introduction/##variants
 *
 *************************************************************************************************/

/*************************************************************************************************
 * Gestures
 *
 * whileHover
 * - 마우스 호버시
 * whileTap
 * - 마우스 클릭시
 * whileDrag
 * - 마우스 드래그시
 * drag
 * - 이 객체를 드래그 가능하게 해준다
 *
 * variants 와 결합하여 사용 가능
 *************************************************************************************************/
