import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { CoinPrice } from "../apis/coins/types";

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  gap: 10px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-size: 24px;
  font-weight: 700;
  border: 1px solid white;
  border-radius: 30px;
  padding: 8px 16px;
`;

const Text = styled.span`
  font-size: 32px;
`;

interface OutletContext {
  priceData: CoinPrice;
}
const Price = () => {
  const { priceData } = useOutletContext<OutletContext>();

  console.log("priceData", priceData);
  return (
    <>
      {!priceData ? (
        "isLoading..."
      ) : (
        <>
          <Container>
            {/* 현재 가격 */}
            <Item>
              <Label>현재 가격</Label>
              <Text>{`${priceData.quotes.USD.price.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                currency: "USD",
                currencyDisplay: "symbol",
                style: "currency"
              })}`}</Text>
            </Item>
            {/* 시가 총액 */}
            <Item>
              <Label>시가 총액</Label>
              <Text>{`${priceData.quotes.USD.market_cap.toLocaleString(
                "en-US",
                {
                  maximumFractionDigits: 2,
                  currency: "USD",
                  currencyDisplay: "symbol",
                  style: "currency"
                }
              )}`}</Text>
            </Item>
            {/* 24시간 거래량 */}
            <Item>
              <Label>24시간 거래량</Label>
              <Text>{`${priceData.quotes.USD.volume_24h.toLocaleString(
                "en-US",
                {
                  maximumFractionDigits: 2,
                  style: "decimal"
                }
              )}`}</Text>
            </Item>
            {/* 거래량 / 시가총액 */}
            <Item>
              <Label>거래량(24h) / 시가총액</Label>
              <Text>
                {`${(
                  (priceData.quotes.USD.volume_24h /
                    priceData.quotes.USD.market_cap) *
                  100
                ).toFixed(2)}%`}
              </Text>
            </Item>
            {/* 24시간 전과 가격 비교 */}
            <Item>
              <Label>24시간 전과 가격 비교</Label>
              <Text>{`${priceData.quotes.USD.percent_change_24h}%`}</Text>
            </Item>
            {/* 24시간 전과 거래량 비교 */}
            <Item>
              <Label>24시간 전과 거래량 비교</Label>
              <Text>{`${priceData.quotes.USD.market_cap_change_24h}%`}</Text>
            </Item>
          </Container>
        </>
      )}
    </>
  );
};

export default Price;
