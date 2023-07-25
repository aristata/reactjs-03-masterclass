import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../utils/makeImagePath";
import { MoviesResult } from "../apis/types/Movie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  top: -100px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-left: 50px;
  top: -70px;
  position: relative;
`;

const Line = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 95%;
  gap: 10px;
  margin-left: 50px;
  margin-right: 50px;
  position: absolute;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5
  },
  visible: {
    x: 0
  },
  exit: {
    x: -window.outerWidth - 5
  }
};

const Box = styled(motion.div)<{ bg_photo: string }>`
  background-color: whitesmoke;
  background-image: url(${(props) => props.bg_photo});
  background-size: cover;
  background-position: center center;
  height: 150px;
  font-size: 64pt;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;

const boxVariants = {
  normal: {
    scale: 1
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween"
    }
  }
};

const BoxInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxInfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween"
    }
  }
};

const LeftArrow = styled(motion.svg)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const RightArrow = styled(motion.svg)`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const offset = 6;

interface Props {
  title: string;
  data: MoviesResult;
}

const Slider = ({ title, data }: Props) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderMoving, setSliderMoving] = useState(false);
  const navigate = useNavigate();

  // 슬라이더 이동 중 여부 변경 -------------------------------------------------------------------- 슬라이더 이동 중 여부 변경
  const toggleSliderMoving = () => setSliderMoving((prev) => !prev);

  // 슬라이더 오른쪽으로 이동 ---------------------------------------------------------------------- 슬라이더 오른쪽으로 이동
  const incrementIndex = () => {
    // 데이터가 없으면 리턴
    if (!data) return;
    console.log("data", data);

    // 슬라이더가 이동 중이면 리턴
    if (sliderMoving) return;
    console.log("sliderMoving", sliderMoving);

    // 슬라이더 이동 중 false 로 변경
    toggleSliderMoving();

    // 데이터 길이 파악해서 하나 뺴기
    // 하나 뺀 이유는 첫번째 데이터는 제일 큰 화면으로 이미 노출되었기 때문
    const totalMovies = data.results.length - 1;

    // 슬라이더 최대 인덱스 구하기
    const maxIndex = Math.floor(totalMovies / offset) - 1;

    // 현재 슬라이더 인덱스 세팅하기
    setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));

    console.log("incrementIndex", sliderIndex);
  };

  // 슬라이더 왼쪽으로 이동 ------------------------------------------------------------------------ 슬라이더 왼쪽으로 이동
  const decreamentIndex = () => {
    // 데이터가 없으면 리턴
    if (!data) return;

    // 슬라이더가 이동 중이면 리턴
    if (sliderMoving) return;

    // 슬라이더 이동 중 false 로 변경
    toggleSliderMoving();

    // 데이터 길이 파악해서 하나 뺴기
    // 하나 뺀 이유는 첫번째 데이터는 제일 큰 화면으로 이미 노출되었기 때문
    const totalMovies = data.results.length - 1;

    // 슬라이더 최대 인덱스 구하기
    const maxIndex = Math.floor(totalMovies / offset) - 1;

    // 슬라이더 최소 인덱스 구하기
    const minIndex = 0;

    // 현재 슬라이더 인덱스 세팅하기
    setSliderIndex((prev) => (prev === minIndex ? maxIndex : prev - 1));

    console.log("decreamentIndex", sliderIndex);
  };

  // 영화 박스 클릭 했을 때 ------------------------------------------------------------------------ 영화 박스 클릭 했을 때
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Wrapper>
      <Title>{title}</Title>

      <Line>
        <LeftArrow
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          onClick={decreamentIndex}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </LeftArrow>
        <AnimatePresence initial={false} onExitComplete={toggleSliderMoving}>
          <Row
            variants={rowVariants}
            initial={"hidden"}
            animate={"visible"}
            exit={"exit"}
            transition={{ type: "tween", duration: 1 }}
            key={sliderIndex}
          >
            {data?.results
              .slice(1)
              .slice(offset * sliderIndex, offset * sliderIndex + offset)
              .map((movie) => (
                <Box
                  key={movie.id}
                  variants={boxVariants}
                  initial={"normal"}
                  whileHover={"hover"}
                  transition={{ type: "tween" }}
                  bg_photo={makeImagePath(movie.backdrop_path, "w500")}
                  layoutId={movie.id + ""}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <BoxInfo variants={boxInfoVariants}>
                    <h4>{movie.title}</h4>
                  </BoxInfo>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <RightArrow
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          onClick={incrementIndex}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </RightArrow>
      </Line>
    </Wrapper>
  );
};

export default Slider;
