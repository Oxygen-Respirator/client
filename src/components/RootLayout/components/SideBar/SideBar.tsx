import styled from "styled-components";
import Logo from "../../../../../public/logo.svg";
const SideBar = () => {
  const SUBJECT_LIST = [
    "Java",
    "JavaScript",
    "Kotlin",
    "React",
    "Next.js",
    "Node.js",
    "Nest.js",
    "Spring",
    "CS",
  ];
  return (
    <SideBarContainer>
      <div>
        <TitleText>히스토리</TitleText>
        {SUBJECT_LIST.map(sbj => (
          <Myinfo key={sbj}>
            <img src={Logo} />
            {sbj} 모의면접
          </Myinfo>
        ))}
      </div>
    </SideBarContainer>
  );
};

export default SideBar;

const TitleText = styled.p`
  margin-top: 1rem;
  font-weight: bold;
`;

const SideBarContainer = styled.div`
  width: 15%;
  min-width: 220px;
  height: 100%;
  background-color: ${({ theme: { color } }) => color.subColor};
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 2rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Myinfo = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;
