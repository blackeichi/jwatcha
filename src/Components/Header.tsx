import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Headerdiv = styled(motion.span)`
  width: 100%;
  height: 13vh;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vw;
  box-sizing: border-box;
  position: fixed;
`;
const Logo = styled.img`
  width: 90px;
  cursor: pointer;
`;
export const Comein = styled.span`
  background-color: #ff0097;
  color: white;
  padding: 1.5vw 3vw;
  font-size: 2vw;
  border-radius: 30px;
  font-weight: 900;
  cursor: pointer;
`;
const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 8)",
  },
};

function Header() {
  const { scrollY } = useViewportScroll();
  const scrollAni = useAnimation();
  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get());
      if (scrollY.get() > 80) {
        scrollAni.start("scroll");
      } else {
        scrollAni.start("top");
      }
    });
  }, [scrollY, scrollAni]);
  return (
    <Headerdiv variants={navVariants} animate={scrollAni} initial={"top"}>
      <Link to="/">
        <Logo
          className="_7QUkiw9R"
          width="100%"
          src="//w.namu.la/s/806795f01bfdb99ee07ef5ed4d26c7a76ce99bddf229f51418d040f4387944e4e06d19bcbd84da2a179de6273e3ca30f084aabc97154fb91a2f167ee349cec6dfcdd45699b15055db7b8e25be479ae9514c87130bb925e1513c027a442e264bc"
          data-filesize="1540"
          data-src="//w.namu.la/s/806795f01bfdb99ee07ef5ed4d26c7a76ce99bddf229f51418d040f4387944e4e06d19bcbd84da2a179de6273e3ca30f084aabc97154fb91a2f167ee349cec6dfcdd45699b15055db7b8e25be479ae9514c87130bb925e1513c027a442e264bc"
          alt="왓챠 로고"
          data-v-ed82b693=""
          loading="lazy"
        ></Logo>
      </Link>

      <Comein>입장하기</Comein>
    </Headerdiv>
  );
}

export default Header;
