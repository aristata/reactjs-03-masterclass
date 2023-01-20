import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
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
  `;

  return (
    <MenuBar>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
    </MenuBar>
  );
};

export default Header;
