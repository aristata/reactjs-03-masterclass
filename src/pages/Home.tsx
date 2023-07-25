import { useQuery } from "@tanstack/react-query";
import getMoviesNowPlaying from "../apis/getMoviesNowPlaying";
import styled from "styled-components";
import { makeImagePath } from "../utils/makeImagePath";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { MoviesResult } from "../apis/types/Movie";
import { useMatch, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const ModalCoverImage = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const ModalOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Home = () => {
  const moviePathMatch = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<MoviesResult>(
    ["getMovies", "nowPlaying"],
    getMoviesNowPlaying
  );
  const navigate = useNavigate();

  const onOverlayClicked = () => {
    navigate("/");
  };
  const clickedMovie =
    moviePathMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id.toString() === moviePathMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bg_photo={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {data && <Slider title="현재 상영작" data={data} />}

          <AnimatePresence>
            {moviePathMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <MovieModal
                  layoutId={moviePathMatch.params.movieId}
                  style={{
                    top: scrollY.get() + 100
                  }}
                >
                  {clickedMovie && (
                    <>
                      <ModalCoverImage
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`
                        }}
                      />
                      <ModalTitle>{clickedMovie.title}</ModalTitle>
                      <ModalOverview>{clickedMovie.overview}</ModalOverview>
                    </>
                  )}
                </MovieModal>
              </>
            ) : null}
          </AnimatePresence>
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
