import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    font-size: 24px;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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

interface ICoinResponse {
  coins: ICoin[];
  totalCount: number;
}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [response, setResponse] = useState<ICoinResponse>({
    coins: [],
    totalCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setResponse({
        coins: json.slice(0, 20),
        totalCount: Array.from(json).length
      });
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인 리스트: {response.totalCount}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {response.coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.symbol}`}>{coin.name} →</Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;