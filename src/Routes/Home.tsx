import { useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPopularTv, IGetResult, makeImg } from "../apit";
import Header, { Comein } from "../Components/Header";
//index로 페이지 이동 구현하기.
const Loading = styled.div``;
const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  position: relative;
`;
const BannerTitle = styled.h1`
  font-size: 3.8vw;
  color: white;
  font-weight: 800;
  padding: 5vh 0;
  margin-top: 15vh;
`;
const BannerSub = styled.h1`
  font-size: 2vw;
  color: lightgray;
  font-weight: 800;
`;

function Home() {
  const { data: popularTv, isLoading } = useQuery<IGetResult>(
    ["tvshow", "popular"],
    () => getPopularTv("popular")
  );
  const { scrollY } = useViewportScroll();

  //console.log(popularTv?.results[0]);
  const downClick = () => {
    let pageHeight = window.innerHeight;
    //console.log(pageHeight);
    let scrollHeight = scrollY.get() % pageHeight;
    //console.log(scrollHeight);
    window.scrollBy(0, pageHeight - scrollHeight);
  };
  const upClick = () => {
    let pageHeight = window.innerHeight;
    window.scrollBy(0, -(2 * pageHeight));
  };
  return (
    <>
      <Header></Header>
      {isLoading ? (
        <Loading>Loading</Loading>
      ) : (
        <>
          <Banner bgphoto={makeImg(popularTv?.results[0].backdrop_path || "")}>
            <BannerTitle>
              영화, 드라마, 예능, 다큐멘터리를 무제한으로
            </BannerTitle>
            <BannerSub>
              매주 5백 여편의 신작이 업데이트 되며, 추가 요금은 전혀 없어요
            </BannerSub>
            <Link
              style={{ marginTop: "8vh", marginBottom: "10vh" }}
              to="/browse"
            >
              <a>
                <Comein
                  style={{
                    fontSize: "1.5vw",
                    padding: "1.5vw 3vw",
                    backgroundColor: "#f70776",
                  }}
                >
                  이용해보기
                </Comein>
              </a>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                width: "5vh",
                color: "white",
                cursor: "pointer",
                bottom: "35",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
              onClick={downClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
          </Banner>
          {popularTv?.results.slice(1, 2).map((tvshow) => (
            <Banner bgphoto={makeImg(tvshow.backdrop_path || "")}>
              <BannerTitle>여럿이 함께, 하나의 이용권으로</BannerTitle>
              <BannerSub>
                동시 4개 기기에서 재생이 가능한 프리미엄 이용권을 이용해보세요.
              </BannerSub>
              <Link
                style={{ marginTop: "8vh", marginBottom: "10vh" }}
                to="/browse"
              >
                <a>
                  <Comein
                    style={{
                      fontSize: "1.5vw",
                      padding: "1.5vw 3vw",
                      backgroundColor: "#f70776",
                    }}
                  >
                    이용해보기
                  </Comein>
                </a>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  width: "5vh",
                  color: "white",
                  cursor: "pointer",
                  bottom: "35",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
                onClick={downClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
            </Banner>
          ))}
          {popularTv?.results.slice(2, 3).map((tvshow) => (
            <Banner bgphoto={makeImg(tvshow.backdrop_path || "")}>
              <BannerTitle>이동 중에도 감상을 멈추지 마세요</BannerTitle>
              <BannerSub>
                보고 싶은 콘텐츠를 다운로드하여 오프라인으로 즐기세요.
              </BannerSub>
              <Link
                style={{ marginTop: "8vh", marginBottom: "10vh" }}
                to="/browse"
              >
                <a>
                  <Comein
                    style={{
                      fontSize: "1.5vw",
                      padding: "1.5vw 3vw",
                      backgroundColor: "#f70776",
                    }}
                  >
                    이용해보기
                  </Comein>
                </a>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  width: "5vh",
                  color: "white",
                  cursor: "pointer",
                  bottom: "35",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
                onClick={upClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                />
              </svg>
            </Banner>
          ))}
        </>
      )}
    </>
  );
}

export default Home;
