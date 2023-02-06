import {
  Link,
  Outlet,
  Params,
  useLocation,
  useMatch,
  useParams
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { CoinInfo, CoinPrice } from "../apis/coins/types";
import { getCoinInfo, getCoinPrice } from "../apis/coins";
import { Helmet } from "react-helmet";

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
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  justify-items: center;
  svg {
    width: 50px;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 24px;
  }
  span:first-child {
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  font-size: 24px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
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
  const { coinId } = useParams() as IRouterParams;
  const { state } = useLocation() as IRouterLocation;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<CoinInfo>(
    ["coinInfo", coinId],
    () => getCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<CoinPrice>(
    ["coinPrice", coinId],
    () => getCoinPrice(coinId)
  );
  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.coinName
            ? state.coinName
            : loading
            ? "Loading..."
            : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={`/coins`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </Link>
        <Title>
          {state?.coinName
            ? state?.coinName
            : loading
            ? "Loading..."
            : infoData?.name ?? "코인이름을 찾지 못했습니다"}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId, priceData }} />
        </>
      )}
    </Container>
  );
};

export default Coin;
