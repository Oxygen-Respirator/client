import * as S from "./style.ts";
import ChatList from "./Components/ChatList/ChatList";
import ChatSend from "./Components/ChatSend/ChatSend";
import AIMessage from "./Components/AIMessage/AIMessage";
import CategorySelect from "./Components/CategorySelect/CategorySelect";

const Chat = () => {
  return (
    <S.ChatContainer>
      <S.MessageWrap>
        <S.AIContainrer>
          <AIMessage answer={"모의면접 학습할 주제를 선택해주세요."} />
          <CategorySelect />
        </S.AIContainrer>
        <ChatList />
      </S.MessageWrap>
      <ChatSend />
    </S.ChatContainer>
  );
};

export default Chat;
