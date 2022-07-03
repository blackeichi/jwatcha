import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getPopularTv, IGetResult, makeImg } from "../apit";
const ContentLayout = styled(motion.div)`
  position: relative;
  height: 300px;
  margin-top: 7vh;
  h1 {
    font-size: 2.4vh;
    font-weight: 800;
    padding: 1vh 5vh;
  }
`;
const ContentBox = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  padding: 0 5vh;
  align-items: center;
  box-sizing: border-box;
`;
const Content_sub = styled(motion.div)`
  overflow: hidden;
  position: relative;
  height: 300px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const ContentImg = styled(motion.img)`
  width: 100%;
`;
const ContentInfo = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  flex-direction: column;
  justify-content: flex-end;
  display: flex;
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 10px;
  opacity: 0;
  gap: 5px;
`;
const ContentInfo_title = styled.div`
  span {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 800;
    box-sizing: content-box;
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    width: 25px;
    height: 25px;
    background-color: orange;
    border-radius: 50%;
    margin-left: 5px;
  }
`;
const ContentInfo_date = styled.h2`
  font-size: 1.5vh;
  font-weight: 800;
  color: lightgray;
`;
const ContentInfo_vote = styled.h2`
  font-size: 1.9vh;
`;
const IncreseIndexBtn = styled.div`
  width: 5vh;
  height: 300px;
  right: 0;
  background-color: black;
  display: none;
  position: absolute;
  align-items: center;
  cursor: pointer;
`;
const Block = styled.div`
  width: 5vh;
  height: 300px;
  left: 0;
  background-color: black;
  position: absolute;
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth + 10,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -window.innerWidth - 10,
    opacity: 0,
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
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};
export default function Exclusive(props: any) {
  const history = useNavigate();
  const { data: topratedTv, isLoading: topratedTvLoading } =
    useQuery<IGetResult>(["Tv", "top_rated"], () => getPopularTv("top_rated"));
  const [offset, setOffset] = useState(6);
  const [xsmall, setXsmall] = useState(false);
  const [small, setSmall] = useState(false);
  const [medium, setmedium] = useState(false);
  const [large, setlarge] = useState(false);
  const [index, setIndex] = useState(0);
  const handleResize = () => {
    setIndex(0);
    if (window.innerWidth <= 600) {
      setXsmall(true);
      setOffset(2);
    } else {
      setXsmall(false);
    }
    if (window.innerWidth <= 950 && window.innerWidth > 600) {
      setSmall(true);
      setOffset(3);
    } else {
      setSmall(false);
    }
    if (window.innerWidth >= 1400) {
      if (!large) {
        setlarge(true);
        setOffset(6);
      }
    } else {
      if (large) {
        setlarge(false);
      }
    }
    if (window.innerWidth > 950 && window.innerWidth < 1400) {
      setmedium(true);
      setOffset(4);
    } else {
      setmedium(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 600) {
      setXsmall(true);
      setOffset(2);
    } else {
      setXsmall(false);
    }
    if (window.innerWidth <= 950 && window.innerWidth > 600) {
      setSmall(true);
      setOffset(3);
    } else {
      setSmall(false);
    }
    if (window.innerWidth >= 1400) {
      setlarge(true);
      setOffset(6);
    } else {
      setlarge(false);
    }
    if (window.innerWidth > 950 && window.innerWidth < 1400) {
      setmedium(true);
      setOffset(4);
    } else {
      setmedium(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      //컴포넌트가 자주 리렌더 될 경우에는 이로 인해 심각한 메모리 누수가 발생할 수 있다. 따라서 리렌더된 후, 새로운 리스너가 생기기 이전에 기존의 리스너를 제거해줘야함
    };
  }, [window.innerWidth]);

  const increaseIndex = () => {
    if (topratedTv) {
      const total = topratedTv.results.length - 2;
      const maxIndex = Math.floor(total / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const [hover, setHover] = useState(false);
  const onClickContent = (id: number) => {
    history(`/tv/?id=${id}`);
  };
  return (
    <ContentLayout
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <h1 style={xsmall ? { fontSize: "17px" } : {}}>왓챠 익스클루시브</h1>
      {topratedTvLoading ? (
        <div>loading...</div>
      ) : (
        <AnimatePresence initial={false}>
          <ContentBox
            style={
              large
                ? { gridTemplateColumns: "repeat(6, 1fr)" }
                : medium
                ? { gridTemplateColumns: "repeat(4, 1fr)" }
                : small
                ? { gridTemplateColumns: "repeat(3, 1fr)" }
                : { gridTemplateColumns: "repeat(2, 1fr)" }
            }
            variants={rowVariants}
            key={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {topratedTv?.results
              .slice(0)
              .slice(offset * index, offset * index + offset)
              .map((data) => (
                <Content_sub
                  key={data.id}
                  whileHover="hover"
                  initial="normal"
                  exit="normal"
                  variants={boxVariants}
                  onClick={() => onClickContent(data.id)}
                >
                  <ContentImg src={makeImg(data.poster_path)} />
                  <ContentInfo whileHover="hover" variants={infoVariants}>
                    <ContentInfo_title
                      style={data.adult ? { backgroundColor: "tomato" } : {}}
                    >
                      <span>
                        {data.name}
                        <h3> {data.adult ? 19 : 15}</h3>
                      </span>
                    </ContentInfo_title>
                    <ContentInfo_date>{data.first_air_date}</ContentInfo_date>
                    <ContentInfo_vote>{data.vote_average}</ContentInfo_vote>
                  </ContentInfo>
                </Content_sub>
              ))}
          </ContentBox>
        </AnimatePresence>
      )}
      <IncreseIndexBtn
        style={
          xsmall
            ? { display: "flex" }
            : hover
            ? { display: "flex" }
            : { display: "none" }
        }
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </IncreseIndexBtn>
      <Block></Block>
    </ContentLayout>
  );
}
