import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const InnerItem = styled(motion.div)`
  background-color: #00a5ff;
  height: 50px;
  width: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const LayoutProps = () => {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <>
      <Wrapper onClick={toggleClicked}>
        <Box>
          {clicked ? (
            <InnerItem layoutId="innerItem" style={{ borderRadius: 50 }} />
          ) : null}
        </Box>
        <Box>
          {!clicked ? (
            <InnerItem
              layoutId="innerItem"
              style={{ borderRadius: 0, scale: 1.5 }}
            />
          ) : null}
        </Box>
      </Wrapper>
    </>
  );
};

export default LayoutProps;

/***************************************************************************************************
 * Layout Properties
 *
 * motion item 에 layoutId 를 같은 것으로 지정하면 프레이머에서는 같은 컴포넌트로 취급하고 애니메이션을 적용한다
 * 위의 예제 코드에서 InnerItem 컴포넌트가 두개 있는데, layoutId 가 같기 때문에 클릭을 할때 마다 애니메이션이
 * 동작하는 것이다
 ***************************************************************************************************/
