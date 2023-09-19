import { useState } from "react";
import styled from "styled-components";

const SideBar = () => {
  const [selectdSbj, setSelectedSbj] = useState<string>("Java");
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
        <div>
          <TitleText>💻개발 공부 분야 선택</TitleText>
          <SubjectList>
            {SUBJECT_LIST.map(sbj => (
              <SubjectItem
                onClick={() => {
                  setSelectedSbj(sbj);
                }}
                selectdSbj={!!(selectdSbj === sbj)}
              >
                {sbj}
              </SubjectItem>
            ))}
          </SubjectList>
        </div>
      </div>
    </SideBarContainer>
  );
};

export default SideBar;

const TitleText = styled.p`
  margin-top: 1rem;
`;

const SideBarContainer = styled.div`
  width: 10%;
  min-width: 220px;
  height: 100%;
  border-radius: 0.75rem;
  background-color: #f7f8fa;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 2rem;
`;
const SubjectList = styled.ul`
  margin-top: 2rem;
`;

const SubjectItem = styled.li<{ selectdSbj: boolean }>`
  padding: 1rem;
  background-color: ${({ selectdSbj }) => selectdSbj && "#3C71FE"};
  font-weight: ${({ selectdSbj }) => selectdSbj && "bold"};
  color: ${({ selectdSbj }) => selectdSbj && "#fff"};
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
`;
