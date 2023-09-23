import styled from "styled-components";
import Logo from "../../../../../public/logo.svg";
import chatApis from "@/apis/chatApis";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { groupIdState } from "@/atom/chat";

const SideBar = () => {
  const setGroupId = useSetRecoilState(groupIdState);
  const { data: chatListData, isSuccess: isChatListData } = useQuery<
    ChatData[]
  >(["chatList"], () => chatApis.get());

  const SUBJECT_LIST = [
    { title: "Java", id: 1 },
    { title: "JavaScript", id: 2 },
    { title: "Kotlin", id: 3 },
    { title: "React", id: 4 },
    { title: "Next.js", id: 5 },
    { title: "Node.js", id: 6 },
    { title: "Nest.js", id: 7 },
    { title: "Spring", id: 8 },
    { title: "CS", id: 9 },
  ];

  function getIdByTitle(title: string) {
    const subject = SUBJECT_LIST.find(item => item.title === title);
    return subject ? subject.id : null;
  }
  return (
    <SideBarContainer>
      <div>
        <TitleText>히스토리</TitleText>
        {isChatListData &&
          chatListData.map(({ langGroupName }) => (
            <Myinfo
              key={langGroupName}
              type="button"
              onClick={() => {
                if (langGroupName) {
                  const gruopId = getIdByTitle(langGroupName);
                  if (gruopId) {
                    setGroupId(gruopId);
                  }
                }
              }}
            >
              <img src={Logo} />
              {langGroupName} 모의면접
            </Myinfo>
          ))}
        {chatListData?.length === 0 && <p>대화기록이 없습니다.</p>}
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

const Myinfo = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
