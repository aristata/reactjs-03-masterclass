import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";

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
`;

function App() {
  const x = useMotionValue(0);
  return (
    <Wrapper>
      <Box style={{ x }} drag="x" dragSnapToOrigin></Box>
    </Wrapper>
  );
}

export default App;

/***************************************************************************************************
 * Motion value (이하 모션밸류)
 *
 * 모든 `motion` 컴포넌트들은 내부적으로 모션밸류를 사용한다.
 * 모션밸류는 애니메이션의 상태와 속도를 추적하는 값이다.
 *
 * 보통 모션밸류는 자동으로 만들어지는데, 경우에 따라 `useMotionValue()` hook 을 사용하여 수동으로 구현할 수 있다.
 * 모션밸류를 수동으로 구현함으로써 다음과 같은 일을 할 수 있다.
 * - 그들의 스테이트를 get 하거나 set 할 수 있다.
 * - 여러 컴포넌트에 모션밸류를 전달하여 그들을 동기화 시킬 수 있다.
 * - React 랜더링 사이클을 트리거하지 않고 시각적 속성들을 업데이트 할 수 있다.(중요)
 ***************************************************************************************************/
