import { useQuery } from "@tanstack/react-query";
import getMoviesNowPlaying from "../apis/getMoviesNowPlaying";
import styled from "styled-components";
import { makeImagePath } from "../utils/makeImagePath";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: "500vh";
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  top: -100px;
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 20px;
  position: absolute;
`;

const Box = styled(motion.div)`
  background-color: whitesmoke;
  height: 200px;
  color: tomato;
  font-size: 64pt;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10
  },
  visible: {
    x: 0
  },
  exit: {
    x: -window.outerWidth - 10
  }
};

const Home = () => {
  const { data, isLoading } = useQuery(
    ["getMovies", "nowPlaying"],
    getMoviesNowPlaying
  );

  const [index, setIndex] = useState(0);
  const incrementIndex = () => setIndex((prev) => prev + 1);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incrementIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
              <Row
                variants={rowVariants}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box key={i}>{i}</Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Home;

/***************************************************************************************************
 * AnimatePresence (현재 상태 애니메이션)
 *
 * https://www.framer.com/motion/animate-presence/
 *
 * AnimatePresence 는 컴포넌트들이 리액트 트리에서 제거될 때 애니메이션 효과를 볼 수 있다
 * React 에서는 다음과 같은 생명 주기 메서드가 없기 때문에 종료 애니메이션을 활성화 해야 한다
 * - 마운트가 해제될 때 컴포넌트에 알리고
 * - 애니메이션이 완료될 때까지 마운트 해제를 연기할 수 있다
 ***************************************************************************************************/
