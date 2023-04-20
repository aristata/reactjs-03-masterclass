import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
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

function App() {
  return (
    <Wrapper>
      <Box variants={boxMotion} initial={"start"} animate={"end"}>
        <Circle variants={circleMotion}></Circle>
        <Circle variants={circleMotion}></Circle>
        <Circle variants={circleMotion}></Circle>
        <Circle variants={circleMotion}></Circle>
      </Box>
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
