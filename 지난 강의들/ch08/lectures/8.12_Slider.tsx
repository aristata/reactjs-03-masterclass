import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  width: 100px;
  padding: 8px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const ButtonArea = styled.div`
  display: flex;
  column-gap: 4px;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxVariants = {
  invisible: (isBack: boolean) => {
    return {
      x: isBack ? -500 : 500,
      opacity: 0,
      scale: 0
    };
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: (isBack: boolean) => {
    return {
      x: isBack ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.5
      }
    };
  }
};

const Slider = () => {
  const [number, setNumber] = useState(1);
  const [isBack, setIsBack] = useState(false);
  const next = () => {
    setIsBack(false);
    setNumber((prev) => (prev === 10 ? 1 : prev + 1));
  };
  const prev = () => {
    setIsBack(true);
    setNumber((prev) => (prev === 1 ? 10 : prev - 1));
  };
  return (
    <>
      <Wrapper>
        <AnimatePresence>
          <Box
            variants={BoxVariants}
            initial="invisible"
            animate="visible"
            exit="exit"
            key={number}
            custom={isBack}
          >
            {number}
          </Box>
        </AnimatePresence>
      </Wrapper>
      <ButtonArea>
        <Button onClick={next}>next</Button>
        <Button onClick={prev}>prev</Button>
      </ButtonArea>
    </>
  );
};

export default Slider;
