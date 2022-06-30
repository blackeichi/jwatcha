import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebtn from "../Components/Sidebtn";

const Sidepart = styled.div`
  width: 35vh;
  height: 100vh;
  position: fixed;
  background-color: #2e383f;
  padding: 20px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: none;
  box-sizing: border-box;
  top: 0;
  left: 0;
`;
const Logo = styled.img`
  width: 15vh;
  cursor: pointer;
  margin-bottom: 20px;
`;

function Side() {
  const location = useLocation().pathname;
  return (
    <Sidepart>
      <Link to="/browse">
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/b/b8/%EC%99%93%EC%B1%A0_%EB%A1%9C%EA%B3%A0_2021.png" />
      </Link>
      <Sidebtn
        home={true}
        here={location === "/browse" ? true : false}
        text="홈"
      ></Sidebtn>
      <Sidebtn
        search={true}
        here={location === "/search" ? true : false}
        text="검색"
      ></Sidebtn>
    </Sidepart>
  );
}
export default Side;
