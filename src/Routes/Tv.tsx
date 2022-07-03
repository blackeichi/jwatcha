import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovie, getSimilarTv, getTv, IGetResult, makeImg } from "../apit";
import Side from "../Components/Side";

export interface IGetDetail {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  name: string;
  adult: boolean;
  episode_run_time: [];
  homepage: string;
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    name: string;
    overview: string;
    season_number: number;
    vote_average: number;
  };
  seasons: [];
  genres: [
    {
      name: string;
    }
  ];
}
const Homeheader = styled.div`
  width: 100%;
  height: 8vh;
  background-color: black;
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
const ContentLayout = styled.div`
  color: white;
  margin-top: 8vh;
  padding: 8vh 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentMain = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
`;
const ContentImg = styled.img`
  border-radius: 10px;
  width: 20vh;
`;
const ContentSeason = styled.h1`
  border-radius: 15px;
  padding: 1vh 2vh;
  border: 1px solid white;
`;

const ContentName = styled.h1`
  font-size: 3vh;
  font-weight: 800;
`;
const Contentvote = styled.h2`
  display: flex;
  font-size: 2vh;
  font-weight: 400;
`;
const ContentGenres = styled.h2`
  color: gray;
  :last-child {
    margin-right: 1vh;
  }
`;
const ContentText = styled.span`
  width: 42vh;
  font-size: 1.8vh;
  color: rgba(255, 255, 255, 0.7);
`;
const ContentBtn = styled(motion.div)`
  background-color: #ff3d6e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1vh 15vh;
  border-radius: 10px;
  margin: 2vh 0;
  cursor: pointer;
  h1 {
    margin-left: 0.5vh;
    font-weight: 700;
    font-size: 1.6vh;
  }
`;
const ContentAdult = styled.h2`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-weight: 800;
  font-size: 1.5vh;
  width: 3vh;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
`;
const ContentInfo = styled.div`
  display: flex;
  gap: 8vh;
  font-size: 1.8vh;
  font-weight: 700;
`;
const ContentInfo_Info = styled.h1`
  border-bottom: 2px solid white;
  padding: 0 2vh;
  padding-bottom: 1.5vh;
  cursor: pointer;
`;
const ContentInfo_relative = styled.h1`
  border-bottom: 2px solid white;
  padding: 0 2vh;
  padding-bottom: 1.5vh;
  cursor: pointer;
`;
const CotentSub = styled.div`
  margin-top: 3vh;
`;
const ContentTitle = styled.h1`
  font-size: 2vh;
  margin-bottom: 1vh;
  font-weight: 700;
`;
const RelativeLayout = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1vw;
`;
const Relative = styled(motion.div)`
  cursor: pointer;
`;
const RelativeImg = styled.img`
  min-width: 140px;
  width: 10vw;
  border-radius: 8px;
`;
const ContetNext = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  font-size: 1.5vh;
`;
const LargeScreen = styled.div`
  display: flex;
  gap: 30px;
  width: 60%;
`;

const Btnvariants = {
  hover: {
    opacity: 0.7,
    transition: {
      duration: 0.1,
    },
  },
};
const boxVariants = {
  normal: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.15,
    y: -30,
    zIndex: 1,
    transition: {
      delay: 0.5,
    },
  },
};

function Tv() {
  const history = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id") as string;
  const { data: tvshow, isLoading: tvLoading } = useQuery<IGetDetail>(
    ["Tv", id],
    () => getTv(id)
  );

  const { data: similar, isLoading: similarLoading } = useQuery<IGetResult>(
    ["Tv", "similar"],
    () => getSimilarTv(id)
  );
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
      //컴포넌트가 자주 리렌더 될 경우에는 이로 인해 심각한 메모리 누수가 발생할 수 있다. 따라서 리렌더된 후, 새로운 리스너가 생기기 이전에 기존의 리스너를 제거해줘야함
    };
  }, [window.innerWidth]);
  const clickWatch = () => {
    if (tvshow) {
      window.open(tvshow?.homepage);
    }
  };
  const [relative, setRelative] = useState(false);
  const onClickInfo = () => {
    setRelative((prev) => !prev);
  };
  const onClickContent = (id: number) => {
    history(`/tv/?id=${id}`);
  };
  return (
    <>
      {small || xsmall ? null : <Side></Side>}
      <Homeheader>
        <img
          style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
          src="http://www.casenews.co.kr/news/photo/202202/10638_22049_4541.jpg"
        />
      </Homeheader>
      <ContentLayout
        style={
          small || xsmall
            ? {
                backgroundColor: "black",
                marginLeft: "0",
              }
            : {
                minHeight: "100vh",
                backgroundColor: "black",
                marginLeft: "35vh",
              }
        }
      >
        {tvshow ? (
          <>
            {" "}
            <ContentMain
              style={large ? { width: "100%", alignItems: "start" } : {}}
            >
              {large ? (
                <>
                  {" "}
                  <LargeScreen>
                    <ContentImg src={makeImg(tvshow?.poster_path)}></ContentImg>
                    <div>
                      <div style={{ height: "40%" }}></div>
                      <ContentName style={{ fontSize: "7vh" }}>
                        {tvshow?.name}
                      </ContentName>
                      <Contentvote
                        style={{
                          fontSize: "1.6vh",
                          fontWeight: 700,
                          margin: "1vh 0",
                          alignItems: "center",
                        }}
                      >
                        {tvshow.genres.map((data) => (
                          <ContentGenres>{data.name}◦</ContentGenres>
                        ))}
                        평점 : {tvshow.vote_average}
                        <ContentAdult style={{ margin: "0 10px" }}>
                          {tvshow?.adult ? 19 : 15}
                        </ContentAdult>
                      </Contentvote>
                      <ContentText
                        style={{ fontSize: "1.6vh", fontWeight: 700 }}
                      >
                        [왓챠 오리지널] {tvshow.overview}
                      </ContentText>
                    </div>
                  </LargeScreen>
                  <div
                    style={{
                      width: "100%",
                      borderTop: "1px solid rgba(255,255,255,0.2)",
                      margin: "2vh 0",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {" "}
                    <ContentBtn
                      whileHover="hover"
                      variants={Btnvariants}
                      onClick={clickWatch}
                      style={{ padding: "1vh 2vh", width: "10%" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "4vh", height: "4vh" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.8"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h1>감상하기</h1>
                    </ContentBtn>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <ContentImg src={makeImg(tvshow?.poster_path)}></ContentImg>
                  <ContentSeason>
                    시즌 에피소드 {tvshow.seasons.length}
                  </ContentSeason>
                  <ContentName>{tvshow?.name}</ContentName>
                  <Contentvote>
                    {tvshow.genres.map((data) => (
                      <ContentGenres>{data.name}◦</ContentGenres>
                    ))}
                    평점 : {tvshow.vote_average}
                  </Contentvote>
                  <ContentBtn
                    whileHover="hover"
                    variants={Btnvariants}
                    onClick={clickWatch}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "4vh", height: "4vh" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h1>감상하기</h1>
                  </ContentBtn>
                  <ContentText>
                    [왓챠 오리지널] {tvshow.overview}
                    <ContentAdult>{tvshow?.adult ? 19 : 15}</ContentAdult>
                  </ContentText>
                </>
              )}

              <ContentInfo>
                <ContentInfo_Info
                  onClick={onClickInfo}
                  style={relative ? { color: "gray", border: "none" } : {}}
                >
                  콘텐츠 정보
                </ContentInfo_Info>
                <ContentInfo_relative
                  onClick={onClickInfo}
                  style={relative ? {} : { color: "gray", border: "none" }}
                >
                  관련 콘텐츠
                </ContentInfo_relative>
              </ContentInfo>
            </ContentMain>
            {relative ? (
              <CotentSub>
                <ContentTitle>비슷한 콘텐츠</ContentTitle>
                <RelativeLayout>
                  {similar?.results.map((data) => (
                    <Relative
                      key={data.id}
                      whileHover="hover"
                      initial="normal"
                      exit="normal"
                      variants={boxVariants}
                      onClick={() => onClickContent(data.id)}
                    >
                      <RelativeImg
                        src={makeImg(data.poster_path)}
                      ></RelativeImg>
                    </Relative>
                  ))}
                </RelativeLayout>
              </CotentSub>
            ) : (
              <CotentSub style={large ? { marginTop: "5vh" } : {}}>
                <ContentTitle>다음 에피소드</ContentTitle>
                <ContetNext>
                  <h1>다음 방영일 : {tvshow.next_episode_to_air.air_date}</h1>
                  <h1>
                    다음 회차 : {tvshow.next_episode_to_air.episode_number} 화
                  </h1>
                  {tvshow.next_episode_to_air.name ? (
                    <h1>
                      Next episode name : {tvshow.next_episode_to_air.name}
                    </h1>
                  ) : null}
                  {tvshow.next_episode_to_air.overview ? (
                    <h1>{tvshow.next_episode_to_air.overview}</h1>
                  ) : null}
                </ContetNext>
              </CotentSub>
            )}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </ContentLayout>
    </>
  );
}

export default Tv;
