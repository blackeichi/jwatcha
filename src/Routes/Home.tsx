import { useQuery } from "react-query";
import styled from "styled-components";
import { getPopularTv, IGetTvsResult, makeImg } from "../apit";
import Header, { Comein } from "../Components/Header";

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
`;
const BannerTitle = styled.h1`
  font-size: 3.8vw;
  color: white;
  font-weight: 800;
  padding: 5vh 0;
  margin-top: 25vh;
`;
const BannerSub = styled.h1`
  font-size: 2vw;
  color: lightgray;
  font-weight: 800;
`;

function Home() {
  const { data: popularTv, isLoading } = useQuery<IGetTvsResult>(
    ["tvshow", "popular"],
    getPopularTv
  );
  console.log(popularTv?.results[0]);
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
            <Comein
              style={{
                marginTop: "8vh",
                marginBottom: "10vh",
                fontSize: "3.5vw",
                padding: "2vw 4vw",
                backgroundColor: "#f70776",
              }}
            >
              입장하기
            </Comein>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "10vw", color: "white", cursor: "pointer" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
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
              <BannerTitle>
                영화, 드라마, 예능, 다큐멘터리를 무제한으로
              </BannerTitle>
              <BannerSub>
                매주 5백 여편의 신작이 업데이트 되며, 추가 요금은 전혀 없어요
              </BannerSub>
              <Comein
                style={{
                  marginTop: "8vh",
                  marginBottom: "10vh",
                  fontSize: "3.5vw",
                  padding: "2vw 4vw",
                  backgroundColor: "#f70776",
                }}
              >
                입장하기
              </Comein>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "10vw", color: "white", cursor: "pointer" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
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
