import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  a {
    text-decoration: none;
    width: 100px;
    height: 50px;
    border-radius: 25px;
    background-color: orange;
    color: whitesmoke;
    text-align: center;
    line-height: 50px;
    box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
    &:hover {
      cursor: pointer;
      color: whitesmoke;
      opacity: 0.8;
    }
    &:active {
      box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
      position: relative;
      top: 3px;
    }
  }
  button {
    width: 100px;
    height: 50px;
    border-radius: 25px;
    background-color: orange;
    color: whitesmoke;
    border: none;
    box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
    &:hover {
      cursor: pointer;
      color: whitesmoke;
      opacity: 0.8;
    }
    &:active {
      box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
      position: relative;
      top: 3px;
    }
  }
`;

/*
  useNavigate

  페이지를 이동시킬때 Link 를 사용한다
  하지만 Link 는 사용자가 클릭을 해야만 동작을 한다
  로그인이 되면 다른페이지로 리다이렉트 시키는 동작을 만들려면 어떻게 해야 할까?
  react-router-dom 은 useNavigate 훅을 제공한다
  이 훅은 navigate 함수를 제공하는데, 이 함수를 사용하여 손 쉽게 페이지를 이동시킬 수 있다
 */
const Header = () => {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate(`/about?now=${Date.now()}`);
  };
  return (
    <MenuBar>
      <Link to={"/"}>Home</Link>
      <button onClick={onAboutClick}>About</button>
    </MenuBar>
  );
};

export default Header;
