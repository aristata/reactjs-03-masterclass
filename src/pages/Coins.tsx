import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Coins = () => {
  return <Title>코인 목록 페이지 입니다.</Title>;
};

export default Coins;
