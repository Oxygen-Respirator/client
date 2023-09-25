import styled from "styled-components";

import FirstChat from "./Components/FirstChat/FirstChat";
import ChatList from "./Components/ChatList/ChatList";
import ChatSend from "./Components/ChatSend/ChatSend";

const Chat = () => {
  return (
    <ChatContainer>
      <MessageWrap>
        <FirstChat />
        <ChatList />
      </MessageWrap>
      <ChatSend />
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;

const MessageWrap = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 1rem;
  padding-bottom: 150px;
  scroll-behavior: smooth;
  height: 100%;
  scroll-margin-bottom: 9999px;
`;
