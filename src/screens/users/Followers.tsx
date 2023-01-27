import { useOutletContext } from "react-router-dom";

interface IFollowersContext {
  userName: string;
}

const Followers = () => {
  console.log("Followers component", useOutletContext());
  const { userName } = useOutletContext<IFollowersContext>();
  return (
    <>
      <h1>Followers</h1>
      <p>여기는 {userName} 의 followers 컴포넌트 입니다.</p>
    </>
  );
};

export default Followers;
