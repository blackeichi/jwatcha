import { motion } from "framer-motion";
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
const ContentLayout = styled(motion.div)`
  position: relative;
`;
const ContentBox = styled.div`
  display: grid;
`;
const Content_sub = styled.div``;
const ContentImg = styled.img`
  width: 100%;
`;
const IncreseIndexBtn = styled.div`
  width: 30px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  right: 0px;
  top: 0;
  display: none;
  align-items: center;
  cursor: pointer;
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
  const { data: topratedTv, isLoading: topratedTvLoading } =
    useQuery<IGetResult>(["Tv", "top_rated"], () => getPopularTv("top_rated"));
  const { data: trending, isLoading: trendingLoading } = useQuery<IGetResult>(
    ["trend", "trending"],
    getTrending
  );
  const [offset, setOffset] = useState(6);
  const [content, setContent] = useState("all");
  const [small, setSmall] = useState(false);
  const [medium, setMedium] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 650) {
      setSmall(true);
    } else {
      setSmall(false);
    }
    if (window.innerWidth >= 1000) {
      setMedium(true);
      setOffset(6);
    } else {
      setMedium(false);
      setOffset(3);
    }
  };
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    if (window.innerWidth <= 650) {
      setSmall(true);
    } else {
      setSmall(false);
    }
    if (window.innerWidth >= 1000) {
      setMedium(true);
      setOffset(6);
    } else {
      setMedium(false);
      setOffset(3);
    }
  }, []);
  const onClickcontent = (content: string) => {
    setContent(content);
  };
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (topratedTv) {
      const total = topratedTv.results.length - 2;
      const maxIndex = Math.floor(total / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const [hover, setHover] = useState(false);
  return (
    <Homelayout>
      {small ? null : <Side></Side>}

      <div
        style={
          small
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
            alt=""
          />
        </Homeheader>
        <Content>
          <Home>
            <h1>홈</h1>
            <Homecontent>
              <Homecontentsemi
                style={
                  medium ? { width: "30%", height: "21vw" } : { width: "100%" }
                }
              >
                <span>스테디셀러</span>
                <h2>왓챠 최고 인기 영화</h2>
                <h3>뭘 볼지 모르겠다면 여기서 골라보세요!</h3>
                <Populardiv
                  bgphoto={makeImg(
                    popularMovie?.results[0].backdrop_path || ""
                  )}
                ></Populardiv>
              </Homecontentsemi>
              <Homecontentsemi
                style={
                  medium ? { width: "30%", height: "21vw" } : { width: "100%" }
                }
              >
                <span>베스트 셀렉션</span>
                <h2>왓챠 익스클루시브</h2>
                <h3>왓챠가 발굴한 소문난 Tv show!</h3>
                <Populardiv
                  bgphoto={makeImg(popularTv?.results[0].backdrop_path || "")}
                ></Populardiv>
              </Homecontentsemi>
              <Homecontentsemi
                style={
                  medium ? { width: "30%", height: "21vw" } : { width: "100%" }
                }
              >
                <span>왓챠 Trend</span>
                <h2>왓챠 최신 트렌딩작</h2>
                <h3>왓챠가 고른 트렌딩한 작품들을 골라보세요!</h3>
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
              전체
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
              영화
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
              TV 프로그램
            </ContentButton>
          </ContentBtnlist>
          {content === "all" ? (
            <div>
              <ContentLayout
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
              >
                <h1>왓챠 익스클루시브</h1>
                {topratedTvLoading ? (
                  <div>loading...</div>
                ) : (
                  <ContentBox
                    style={
                      !medium
                        ? { gridTemplateColumns: "repeat(3, 1fr)" }
                        : { gridTemplateColumns: "repeat(6, 1fr)" }
                    }
                  >
                    {topratedTv?.results
                      .slice(0)
                      .slice(offset * index, offset * index + offset)
                      .map((data) => (
                        <Content_sub key={data.id}>
                          <ContentImg src={makeImg(data.poster_path)} />
                        </Content_sub>
                      ))}
                  </ContentBox>
                )}

                <IncreseIndexBtn
                  style={hover ? { display: "flex" } : { display: "none" }}
                  onClick={increaseIndex}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </IncreseIndexBtn>
              </ContentLayout>
            </div>
          ) : null}
          {content === "movie" ? <div>movie</div> : null}
          {content === "tv" ? <div>tv</div> : null}
        </Content>
      </div>
    </Homelayout>
  );
}

export default Video;
