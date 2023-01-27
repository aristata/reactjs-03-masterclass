import React from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

interface CircleProps {
  bgColor: string;
  borderColor?: string; // 특정 props 를 옵션너블하게 사용하고 싶다면, propsName 뒤에 ? 를 붙인다
  text?: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${(props) => props.bgColor};
  border-color: ${(props) => props.borderColor};
  text-align: center;
  line-height: 200px;
  color: white;
`;

const Circle = ({
  bgColor,
  borderColor,
  text = "default text"
}: CircleProps) => {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
};

export default Circle;
