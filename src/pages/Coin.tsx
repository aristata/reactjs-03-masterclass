import { useParams } from "react-router-dom";

const Coin = () => {
  const { coinId } = useParams();
  return (
    <>
      <h1>코인 페이지 입니다.</h1>
      <p>선택된 코인 아이디 = {coinId}</p>
    </>
  );
};

export default Coin;
