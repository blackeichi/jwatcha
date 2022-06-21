import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getPopularMovie, IGetResult } from "../apit";
import Side from "../Components/Side";

const Homeheader = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #2e383f;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 5vh;
`;
const Content = styled.div`
  color: white;
  margin-top: 8vh;
  padding: 8vh 5vh;
`;
const Homelayout = styled.div`
  background-color: black;
  position: relative;
  width: 100%;
  box-sizing: content-box;
`;
const Home = styled.div`
  h1 {
    width: 100%;
    font-size: 5vh;
    font-weight: 700;
    padding-bottom: 3vh;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  div {
    height: 100vh;
  }
`;

function Video() {
  const { data: popularMovie, isLoading: popularLoading } =
    useQuery<IGetResult>(["movies", "popular"], getPopularMovie);
  const [small, setSmall] = useState(false);
  console.log(window.innerWidth);
  return (
    <Homelayout>
      <Side></Side>
      <div
        style={{
          backgroundColor: "black",
          marginLeft: "35vh",
        }}
      >
        <Homeheader>
          <img
            style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
            src="http://www.casenews.co.kr/news/photo/202202/10638_22049_4541.jpg"
            alt=""
          />
        </Homeheader>
        <Content>
          <Home>
            <h1>홈</h1>
            <div></div>
          </Home>
        </Content>
      </div>
    </Homelayout>
  );
}

export default Video;
