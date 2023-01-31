import { useState } from "react";
import { Params, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

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

interface IRouterParams extends Params {
  coinId: string;
}

interface IRouterLocation {
  state: {
    coinName: string;
  };
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams() as IRouterParams;
  const { state } = useLocation() as IRouterLocation;

  console.log("coinId", coinId);
  console.log("state", state);

  return (
    <Container>
      <Header>
        <Title>{state?.coinName || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
