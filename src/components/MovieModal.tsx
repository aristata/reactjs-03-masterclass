import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Movie } from "../apis/types/Movie";
import { makeImagePath } from "../utils/makeImagePath";

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

interface Props {
  selectedMovie: Movie;
}
const Modal = ({ selectedMovie }: Props) => {
  /*************************************************************************************************
   * useMatch
   *
   * - 현재 경로가 아규먼트와 일치여부를 반환해 주는 react-router-dom 의 훅이다
   * - 여기에서는 movie를 선택했는지 확인하기 위한 수단으로 사용되었다
   *************************************************************************************************/
  const moviePathMatch = useMatch("/movies/:movieId");

  /*************************************************************************************************
   * useScroll
   *
   * - framer motion 에서 제공하는 scroll hook
   * - 현재 스크롤의 Y 값을 가져오기 위해 사용되었다
   * - MovieModal 의 style 에 사용되어, 모달이 스크롤 어디에 있든 화면에 뜨게 하기 위해 사용되었다
   *************************************************************************************************/
  const { scrollY } = useScroll();

  /*************************************************************************************************
   * useNavigate
   *
   * - 경로를 변경할 때 사용하는 react-router-dom 의 훅이다
   * - 5이하 버전에서는 history 로 사용되었는데, 6버전 부터 navigate 로 변경되었다
   *************************************************************************************************/
  const navigate = useNavigate();

  /*************************************************************************************************
   * onClick eventHandler
   *
   * overlay 영역을 클릭했을 때 홈화면으로 이동한다
   * 홈화면으로 이동하면 overlay 가 사라질 것이다
   * 왜냐하면 overlay 는 현재 경로가 /movies/:movieId 일때 (= moviePathMatch 가 true 일때)
   *************************************************************************************************/
  const onOverlayClicked = () => {
    navigate("/");
  };

  return (
    <>
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
              <ModalCoverImage
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    selectedMovie.backdrop_path,
                    "w500"
                  )})`
                }}
              />
              <ModalTitle>{selectedMovie.title}</ModalTitle>
              <ModalOverview>{selectedMovie.overview}</ModalOverview>
            </MovieModal>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Modal;
