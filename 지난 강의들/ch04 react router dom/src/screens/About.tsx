import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/*
  useSearchParams

  useSearchParams 훅은 현재 경로에 대한 URL 쿼리 파라미터를 읽거나 수정하는데 사용한다.
  useState 훅과 같이 값과, 값을 변경하는 함수의 배열을 반환한다.
 */
const About = () => {
  const [readSearchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const now = Number(readSearchParams.get("now"));
    console.log("now", now);
    if (now >= 1) {
      setTimeout(() => {
        setSearchParams({
          param: "변경됨"
        });
      }, 5 * 1000);
    }
  });

  return (
    <>
      <h1>About</h1>
      <span>{readSearchParams.get("now")}</span>
    </>
  );
};

export default About;
