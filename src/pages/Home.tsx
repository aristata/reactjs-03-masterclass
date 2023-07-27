import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import getMoviesNowPlaying from "../apis/getMoviesNowPlaying";
import { Movie, MoviesResult } from "../apis/types/Movie";
import MovieModal from "../components/MovieModal";
import Slider from "../components/Slider";
import { makeImagePath } from "../utils/makeImagePath";
import { useEffect, useState } from "react";
import getMoviesPopular from "../apis/getMoviesPopular";
import { useScroll } from "framer-motion";

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

const Banner = styled.div<{ bg_photo: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bg_photo});
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

const SliderArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 200px;
`;

export interface SelectedMovie extends Movie {
  layoutId: string;
}

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | null>(
    null
  );

  const clickMovieHandler = (movie: Movie, layoutId: string) => {
    setSelectedMovie({ ...movie, layoutId });
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // console.log("selectedMovie", selectedMovie);

  /*************************************************************************************************
   * 현재 상영작 데이터 조회
   *************************************************************************************************/
  const { data: nowPlayingData, isLoading } = useQuery<MoviesResult>(
    ["getMovies", "nowPlaying"],
    getMoviesNowPlaying
  );

  /*************************************************************************************************
   * 인기작 데이터 조회
   *************************************************************************************************/
  const { data: popularData } = useQuery<MoviesResult>(
    ["getMovies", "popular"],
    getMoviesPopular
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bg_photo={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          <SliderArea>
            {nowPlayingData && (
              <Slider
                title="현재 상영작"
                data={nowPlayingData}
                clickedMovie={clickMovieHandler}
              />
            )}
            {popularData && (
              <Slider
                title="인기작"
                data={popularData}
                clickedMovie={clickMovieHandler}
              />
            )}
          </SliderArea>

          {selectedMovie && (
            <MovieModal selectedMovie={selectedMovie} closeModal={closeModal} />
          )}
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
