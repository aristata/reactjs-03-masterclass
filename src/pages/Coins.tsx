import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CoinResponse } from "../apis/coins/types";
import { getCoins } from "../apis/coins";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms/DarkModeAtom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 8px;
  button {
    border: 1px solid ${(props) => props.theme.bgColor};
    border-radius: 20px;
    padding: 8px 16px;
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
  }
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    font-size: 24px;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const blinkEffect = keyframes`
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.8;
  }
  20% {
    opacity: 0.6;
  }
  30% {
    opacity: 0.4;
  }
  40% {
    opacity: 0.2;
  }
  50% {
    opacity: 0;
  }
  60% {
    opacity: 0.2;
  }
  70% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
`;

const Loader = styled.span`
  font-size: 48px;
  text-align: center;
  display: block;
  animation: ${blinkEffect} 1s infinite;
`;

/* 
  recoil 을 사용하면 아래 인터페이스도 필요가 없다
  interface OutletContext {
    isDark: boolean;
    toggleTheme: () => void;
  } 
*/

const Coins = () => {
  /* 
    recoil 을 사용하면 OutletContext 를 사용하여 상태를 넘겨 줄 필요가 없다 
    const { isDark, toggleTheme } = useOutletContext<OutletContext>(); 

    값을 불러 올땐, useRecoilValue 훅을 사용한다
    값을 세팅 할땐, useSetRecoilState 훅을 사용한다
    불러오는 것과 세팅 하는 것 둘다 사용할땐, useRecoilState 훅을 사용한다
  */
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  const { isLoading, data } = useQuery<CoinResponse>(["/coins"], () =>
    getCoins()
  );

  return (
    <Container>
      <Helmet>
        <title>코인 리스트</title>
      </Helmet>
      <Header>
        <Title>코인 리스트: {data?.totalCount}</Title>
        <button onClick={toggleTheme}>
          {isDark ? "라이트 모드로" : "다크 모드로"}
        </button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.coins?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ coinName: coin.name }}>
                <CoinImage
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} →
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
