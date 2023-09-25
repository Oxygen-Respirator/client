import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { groupIdState } from "@/atom/chat";
import { userInfoAtom } from "@/atom/userInfo";
import chatApis from "@/apis/chatApis";

const ChatSend = () => {
  const groupId = useRecoilValue(groupIdState);
  const [message, setMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const postMessageMutation = useMutation(
    ({ groupId, message }: { groupId: number; message: string }) =>
      chatApis.post(groupId, { message }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chatList"]);
      },
    },
  );

  const { remainAnswerCount, maxAnswerCount } = useRecoilValue(userInfoAtom);

  const handleSendMessage = () => {
    if (message) {
      postMessageMutation.mutateAsync({ groupId, message });

      setMessage(null);
    }
  };
  return (
    <ChatWrap>
      <CustomTextarea
        disabled={!!(remainAnswerCount === 0)}
        value={message || ""}
        onChange={e => setMessage(e.target.value)}
        placeholder={
          remainAnswerCount === 0
            ? "남은 답변 횟수가 없습니다."
            : "텍스트를 입력해주세요"
        }
      />
      <ChatSendBtnWrap>
        <p>
          남은 답변 횟수 {remainAnswerCount}/{maxAnswerCount}
        </p>
        <ChatSendBtn onClick={handleSendMessage}>전송</ChatSendBtn>
      </ChatSendBtnWrap>
    </ChatWrap>
  );
};

export default ChatSend;
const ChatWrap = styled.div`
  width: 100%;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  width: calc(100% - 6rem);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;
const CustomTextarea = styled.textarea`
  width: 100%;
  border: 0;
  height: 100px;
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatSendBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChatSendBtn = styled.button`
  width: 100px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  background-color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
`;
