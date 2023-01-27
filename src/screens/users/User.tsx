import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { users } from "../../db";

/*
  useParams

  router 를 사용하여 페이지간에 이동을 할때 파라미터를 전달할 수 있다.
  그 방법은 useParams 훅을 사용하는 것이다.
  useParams 훅은 해당 페이지로 이동할때 함께 전달된 파라미터에 접근할 수 있게 해주는 훅이다.
  파라미터는 객체로 반환되기 때문에, 객체 내부의 변수명을 사용하여 해당 파라미터를 사용할 수 있다.
 */
const User = () => {
  console.log("User component", useOutletContext());
  const { userId } = useParams();
  return (
    <div>
      <h1>
        User with id {userId} is named: {users[Number(userId) - 1].name}
      </h1>
      <hr />
      <Link to={"followers"}>See follwers</Link>
      <Outlet
        context={{
          userName: users[Number(userId) - 1].name
        }}
      />
    </div>
  );
};

export default User;
