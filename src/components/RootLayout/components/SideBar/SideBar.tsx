import Logo from "../../../../../public/logo.svg";
import chatApis from "@/apis/chatApis";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { groupIdState } from "@/atom/chat";
import * as S from "./style";

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
    <S.SideBarContainer>
      <div>
        <S.TitleText>히스토리</S.TitleText>
        {isChatListData &&
          chatListData.map(({ langGroupName }) => (
            <S.Myinfo
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
            </S.Myinfo>
          ))}
        {chatListData?.length === 0 && <p>대화기록이 없습니다.</p>}
      </div>
    </S.SideBarContainer>
  );
};

export default SideBar;
