import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

/*
  1. Outlet
  상위 경로 요소에서 `<Outlet>` 을 사용하면, 하위 경로 요소를 중첩하여 표현할 수 있다.
  
  예를 들어 상위 경로가 "/", 이고 하위 경로가 "about" 인 경우,
  "/about" 에 접근하려고 하면, 우선 상위 경로 요소인 <Root></Root> 컴포넌트가 렌더링 되고,
  하위 경로 요소인 <About></About> 컴포넌트가 <Outlet></Outlet> 컴포넌트 위치에 렌더링 된다.

  2. Outlet context
  종종 상위 경로는 하위 경로와 state 또는 기타 값을 공유한다.
  Outlet 에 기본으로 제공되는 context 를 사용하여 그 값들을 공유할 수 있다.
*/
const Root = () => {
  return (
    <div>
      <Header />
      <Outlet context={{ masterName: "장성민" }} />
    </div>
  );
};

export default Root;
