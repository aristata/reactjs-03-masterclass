import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50%;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 100px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlayVariants = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" }
};

const LayoutPlusAnimatePresence = () => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    console.log("current id: " + id);
  }, [id]);

  return (
    <>
      <Wrapper>
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <Box onClick={() => setId(n)} key={n} layoutId={n} />
          ))}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              variants={overlayVariants}
              initial={"hidden"}
              animate={"visible"}
              exit={"exit"}
            >
              <Box layoutId={id} style={{ width: 200, height: 100 }} />
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
};

export default LayoutPlusAnimatePresence;

/***************************************************************************************************
 * Final
 *
 * Layout + Animate Presence
 ***************************************************************************************************/
