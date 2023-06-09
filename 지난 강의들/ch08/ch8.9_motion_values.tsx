import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 200vh;
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

  /*************************************************************************************************
   * useTransform
   *
   * - 특정 motion value 의 변화를 특정 값으로 매핑하여 output 으로 반환하는 훅
   * - 3개의 인자를 받는데,
   * - 첫번째 인자는 어떤 모션 밸류를 변환할 것인지
   * - 두번째 인자는 모션 밸류 값의 변화 범위를 배열로 받음
   * - 세번째 인자는 반환값의 변화 범위를 배열로 받음
   * - 두번째 인자의 배열 크기와 세번째 인자의 배열 크기가 같아야 함
   *************************************************************************************************/
  // const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);

  /*************************************************************************************************
   * 회전
   *************************************************************************************************/
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);

  /*************************************************************************************************
   * 배경색
   *
   * - Wrapper 의 백그라운드칼라를 변경할 계획이다
   * - styled.div 에 바로 사용할 수 없기 때문에 다음과 같이 수정한다
   * - styled(motion.div)
   *************************************************************************************************/
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(80, 219, 238), rgb(23, 97, 209))",
      "linear-gradient(135deg, rgb(53, 201, 102), rgb(200, 231, 59))"
    ]
  );

  /*************************************************************************************************
   * useScroll
   *
   * - 스크롤 이벤트의 모션밸류를 얻을 수 있는 핼퍼 펑션(훅)
   * - scrollX, scrollY, scrollXProgress, scrollYProgress 등 값을 반환한다
   * - scrollY 는 y축이 움직인 pixel 을 값으로 주고
   * - scrollYProgress 는 y축이 움직인 정도를 0 ~ 1 사이의 값으로 준다
   *************************************************************************************************/
  const { scrollY, scrollYProgress } = useScroll();
  // useEffect(() => {
  //   scrollY.on("change", () => {
  //     console.log("scrollY: " + scrollY.get());
  //     console.log("scrollYProgress: " + scrollYProgress.get());
  //   });
  // }, [scrollY, scrollYProgress]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.1, 2]);
  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin></Box>
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
 * - React 랜더링 사이클을 트리거하지 않고 시각적 속성들을 업데이트 할 수 있다.(중요) *
 ***************************************************************************************************/
