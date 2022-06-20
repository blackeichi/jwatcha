import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Headerdiv = styled(motion.span)`
  width: 100%;
  height: 9vh;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  box-sizing: border-box;
  position: fixed;
  z-index: 1;
`;
const Logo = styled.img`
  width: 12vh;
  cursor: pointer;
`;
export const Comein = styled.span`
  background-color: #ff0097;
  color: white;
  padding: 1.2vh 2vh;
  font-size: 1.2vh;
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
      //console.log(scrollY.get());
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
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/b/b8/%EC%99%93%EC%B1%A0_%EB%A1%9C%EA%B3%A0_2021.png" />
      </Link>
      <Link to="/browse">
        <a>
          <Comein
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          >
            입장하기
          </Comein>
        </a>
      </Link>
    </Headerdiv>
  );
}

export default Header;
