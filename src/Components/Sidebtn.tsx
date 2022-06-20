import styled from "styled-components";

const Sidewrap = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 10px;
  padding: 10px;

  border-radius: 10px;
  cursor: pointer;
`;
const SideSvg = styled.svg`
  width: 20px;
`;
interface Isidebtn {
  home?: boolean;
  search?: boolean;
  text?: string;
  here?: boolean;
}

export default function Sidebtn({ home, search, text, here }: Isidebtn) {
  return (
    <Sidewrap
      style={here ? { backgroundColor: "rgba(255, 255, 255, 0.1)" } : {}}
    >
      {home ? (
        <SideSvg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </SideSvg>
      ) : null}
      {search ? (
        <SideSvg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </SideSvg>
      ) : null}
      <span>{text}</span>
    </Sidewrap>
  );
}
