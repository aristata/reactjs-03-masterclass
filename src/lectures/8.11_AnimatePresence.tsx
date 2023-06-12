import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100px;
  padding: 8px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50
  }
};

const Lecture = () => {
  const [isShow, setIsShow] = useState(false);
  const toggle = () => setIsShow((prev) => !prev);

  return (
    <>
      <Button onClick={toggle}>click</Button>
      <AnimatePresence>
        {isShow ? (
          <Box
            variants={boxVariants}
            initial={"initial"}
            animate={"visible"}
            exit={"leaving"}
          ></Box>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Lecture;
