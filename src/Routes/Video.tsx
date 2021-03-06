import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getPopularMovie,
  getPopularTv,
  getTrending,
  IGetResult,
  makeImg,
} from "../apit";
import Side from "../Components/Side";
import Exclusive from "../Components/Exclusive";
import Populartv from "../Components/Populartv";

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
  padding: 0 2vh;
  z-index: 1;
`;
const Content = styled.div`
  color: white;
  margin-top: 8vh;
  padding: 8vh 0;
`;
const Homelayout = styled.div`
  background-color: black;
  position: relative;
  width: 100%;
  box-sizing: content-box;
`;
const Home = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5vh;
  h1 {
    width: 100%;
    font-size: 5vh;
    font-weight: 700;
    padding-bottom: 3vh;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
const Homecontent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 4vh;
`;
const Homecontentsemi = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vh;

  span {
    font-size: 1vh;
    color: darkgray;
    font-weight: 800;
    width: 100%;
  }
  h2 {
    font-size: 3vh;
    font-weight: 800;
    padding: 1vh 0;
    width: 100%;
  }
  h3 {
    font-size: 3vh;
    color: darkgray;
    padding-bottom: 1vh;
    width: 100%;
  }
`;
const Populardiv = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 80%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const ContentBtnlist = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 0;
  gap: 10px;
  padding-left: 5vh;
  box-sizing: border-box;
`;
const ContentButton = styled.div`
  max-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  padding: 10px 20px;
  font-weight: 800;
  cursor: pointer;
  border: 3px solid rgba(255, 255, 255, 0.2);
  font-size: 15px;
  color: darkgray;
`;
const AllLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

function Video() {
  const { data: popularMovie, isLoading: popularLoading } =
    useQuery<IGetResult>(["movies", "popular"], () =>
      getPopularMovie("popular")
    );
  const { data: latestMovie, isLoading: latestLoading } = useQuery<IGetResult>(
    ["movies", "latest"],
    () => getPopularMovie("latest")
  );
  const { data: topratedMovie, isLoading: topratedLoading } =
    useQuery<IGetResult>(["movies", "top_rated"], () =>
      getPopularMovie("top_rated")
    );
  const { data: popularTv, isLoading: popularTvLoading } = useQuery<IGetResult>(
    ["Tv", "popular"],
    () => getPopularTv("popular")
  );
  const { data: latestTv, isLoading: latestTvLoading } = useQuery<IGetResult>(
    ["Tv", "latest"],
    () => getPopularTv("latest")
  );
  const { data: trending, isLoading: trendingLoading } = useQuery<IGetResult>(
    ["trend", "trending"],
    getTrending
  );
  const [content, setContent] = useState("all");
  const [xsmall, setXsmall] = useState(false);
  const [small, setSmall] = useState(false);
  const [medium, setmedium] = useState(false);
  const [large, setlarge] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setXsmall(true);
    } else {
      setXsmall(false);
    }
    if (window.innerWidth <= 950 && window.innerWidth > 600) {
      setSmall(true);
    } else {
      setSmall(false);
    }
    if (window.innerWidth >= 1400) {
      if (!large) {
        setlarge(true);
      }
    } else {
      if (large) {
        setlarge(false);
      }
    }
    if (window.innerWidth > 950 && window.innerWidth < 1400) {
      setmedium(true);
    } else {
      setmedium(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 600) {
      setXsmall(true);
    } else {
      setXsmall(false);
    }
    if (window.innerWidth <= 950 && window.innerWidth > 600) {
      setSmall(true);
    } else {
      setSmall(false);
    }
    if (window.innerWidth >= 1400) {
      setlarge(true);
    } else {
      setlarge(false);
    }
    if (window.innerWidth > 950 && window.innerWidth < 1400) {
      setmedium(true);
    } else {
      setmedium(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      //??????????????? ?????? ????????? ??? ???????????? ?????? ?????? ????????? ????????? ????????? ????????? ??? ??????. ????????? ???????????? ???, ????????? ???????????? ????????? ????????? ????????? ???????????? ??????????????????
    };
  }, [window.innerWidth]);
  const onClickcontent = (content: string) => {
    setContent(content);
  };
  return (
    <Homelayout>
      {small || xsmall ? null : <Side></Side>}

      <div
        style={
          small || xsmall
            ? {
                backgroundColor: "black",
                marginLeft: "0",
              }
            : {
                backgroundColor: "black",
                marginLeft: "35vh",
              }
        }
      >
        <Homeheader>
          <img
            style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
            src="http://www.casenews.co.kr/news/photo/202202/10638_22049_4541.jpg"
          />
        </Homeheader>
        <Content>
          <Home>
            <h1>???</h1>
            <Homecontent>
              <Homecontentsemi
                style={
                  large ? { width: "30%", height: "21vw" } : { width: "100%" }
                }
              >
                <span>???????????????</span>
                <h2>?????? ?????? ?????? ??????</h2>
                <h3>??? ?????? ??????????????? ????????? ???????????????!</h3>
                <Populardiv
                  bgphoto={makeImg(
                    popularMovie?.results[0].backdrop_path || ""
                  )}
                ></Populardiv>
              </Homecontentsemi>
              <Homecontentsemi
                style={
                  large ? { width: "30%", height: "21vw" } : { width: "100%" }
                }
              >
                <span>????????? ?????????</span>
                <h2>?????? ??????????????????</h2>
                <h3>????????? ????????? ????????? Tv show!</h3>
                <Populardiv
                  bgphoto={makeImg(popularTv?.results[0].backdrop_path || "")}
                ></Populardiv>
              </Homecontentsemi>
              <Homecontentsemi
                style={
                  large ? { width: "30%", height: "21vw" } : { width: "100%" }
                }
              >
                <span>?????? Trend</span>
                <h2>?????? ?????? ????????????</h2>
                <h3>????????? ?????? ???????????? ???????????? ???????????????!</h3>
                <Populardiv
                  bgphoto={makeImg(trending?.results[0].backdrop_path || "")}
                ></Populardiv>
              </Homecontentsemi>
            </Homecontent>
          </Home>
          <ContentBtnlist>
            <ContentButton
              onClick={() => onClickcontent("all")}
              style={
                content === "all"
                  ? {
                      backgroundColor: "white",
                      color: "black",
                      border: "3px solid white",
                    }
                  : {}
              }
            >
              ??????
            </ContentButton>
            <ContentButton
              onClick={() => onClickcontent("movie")}
              style={
                content === "movie"
                  ? {
                      backgroundColor: "white",
                      color: "black",
                      border: "3px solid white",
                    }
                  : {}
              }
            >
              ??????
            </ContentButton>
            <ContentButton
              onClick={() => onClickcontent("tv")}
              style={
                content === "tv"
                  ? {
                      backgroundColor: "white",
                      color: "black",
                      border: "3px solid white",
                    }
                  : {}
              }
            >
              TV ????????????
            </ContentButton>
          </ContentBtnlist>
          {content === "all" ? (
            <AllLayout>
              <Exclusive></Exclusive>
              <Populartv></Populartv>
            </AllLayout>
          ) : null}
          {content === "movie" ? <div>movie</div> : null}
          {content === "tv" ? <div>tv</div> : null}
        </Content>
      </div>
    </Homelayout>
  );
}

export default Video;
