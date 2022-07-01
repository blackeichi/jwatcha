import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovie, getTv, IGetResult, makeImg } from "../apit";
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
  padding: 8vh 0;
`;
const ContentMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
`;
const ContentImg = styled.img`
  width: 20vh;
`;
const ContentAdult = styled.h2`
  padding: 1vh;
  background-color: gray;
  border-radius: 50%;
  font-weight: 800;
  font-size: 2vh;
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
const Btnvariants = {
  hover: {
    opacity: 0.7,
    transition: {
      duration: 0.1,
    },
  },
};
function Content() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id") as string;
  const hash = location.hash;
  const { data: tvshow, isLoading: tvLoading } = useQuery<IGetDetail>(
    ["Tv", id],
    () => getTv(id)
  );
  console.log(tvshow);
  const { data: movieshow, isLoading: MovieLoading } = useQuery<IGetDetail>(
    ["Movie", id],
    () => getMovie(id)
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
  return (
    <>
      {small || xsmall ? null : <Side></Side>}
      <Homeheader>
        <img
          style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
          src="http://www.casenews.co.kr/news/photo/202202/10638_22049_4541.jpg"
        />
      </Homeheader>
      {hash === "#tv" ? (
        <ContentLayout
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
          {tvshow ? (
            <>
              {" "}
              <ContentMain>
                <ContentImg src={makeImg(tvshow?.poster_path)}></ContentImg>
                <ContentAdult>{tvshow?.adult ? 19 : 15}</ContentAdult>
                <ContentName>{tvshow?.name}</ContentName>
                <Contentvote>
                  {tvshow.genres.map((data) => (
                    <ContentGenres>{data.name}◦</ContentGenres>
                  ))}
                  평점 : {tvshow.vote_average}
                </Contentvote>

                <ContentBtn whileHover="hover" variants={Btnvariants}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "4vh", height: "4vh" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                    onClick={clickWatch}
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
              </ContentMain>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </ContentLayout>
      ) : (
        <>movie </>
      )}
    </>
  );
}

export default Content;
