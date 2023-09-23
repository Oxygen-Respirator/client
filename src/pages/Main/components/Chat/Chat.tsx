import { Fragment, useState } from "react";
import styled from "styled-components";
import { AiProfile } from "@/components/Svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import chatApis from "@/apis/chatApis";

const Chat = () => {
  const [groupId, setGroupId] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

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

  const { data: chatListData, isSuccess } = useQuery<ChatData[]>(
    ["chatList", groupId],
    () => chatApis.get(groupId),
  );

  const postMessageMutation = useMutation(
    ({ groupId, message }: { groupId: number; message: string }) =>
      chatApis.post(groupId, { message }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chatList"]);
      },
    },
  );

  const handleSendMessage = () => {
    if (message) {
      postMessageMutation.mutateAsync({ groupId, message });

      setMessage(null);
    }
  };

  return (
    <ChatContainer>
      <MessageWrap>
        <AIContainrer>
          <Row>
            <ProfileImgWrap>
              <AiProfile />
            </ProfileImgWrap>
            <p>AI 면접 멘토</p>
          </Row>
          <AIMessageWrap>모의면접 학습할 주제를 선택해주세요.</AIMessageWrap>
          <SubjectItemWrap>
            {SUBJECT_LIST.map(sbj => (
              <SubjectItem
                key={sbj.id}
                onClick={() => {
                  setGroupId(sbj.id);
                }}
                $groupId={!!(groupId === sbj.id)}
              >
                {sbj.title}
              </SubjectItem>
            ))}
          </SubjectItemWrap>
        </AIContainrer>
        {isSuccess &&
          chatListData.map(({ id, createdAt, role, message }, index) => {
            return (
              <Fragment key={id}>
                {index === 0 && <DateText>{createdAt}</DateText>}
                {role === "assistant" && (
                  <AIContainrer>
                    <Row>
                      <ProfileImgWrap>
                        <AiProfile />
                      </ProfileImgWrap>
                      <p>AI 면접 멘토</p>
                    </Row>

                    <AIMessageWrap>{message}</AIMessageWrap>
                  </AIContainrer>
                )}
                {role === "user" && (
                  <RowEnd>
                    <MyMessageWrap>{message}</MyMessageWrap>
                  </RowEnd>
                )}
              </Fragment>
            );
          })}
      </MessageWrap>
      <ChatWrap>
        <CustomTextarea
          value={message || ""}
          onChange={e => setMessage(e.target.value)}
        />
        <ChatSendBtnWrap>
          <p>남은 답변 횟수 7/10</p>
          <ChatSendBtn onClick={handleSendMessage}>전송</ChatSendBtn>
        </ChatSendBtnWrap>
      </ChatWrap>
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
`;

const DateText = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;
const ProfileImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  overflow: hidden;
  background-color: ${({ theme: { color } }) => color.mainColor};
`;

const AIContainrer = styled.div`
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const RowEnd = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const MyMessageWrap = styled.div`
  width: 60%;
  padding: 2rem;
  background-color: #fefcf4;
  border-radius: 0.75rem 0.75rem 0 0.75rem;
  line-height: 180%;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const AIMessageWrap = styled.div`
  width: 30%;
  min-width: 470px;
  padding: 1rem 2rem;
  background-color: ${({ theme: { color } }) => color.subColor};
  border-radius: 0.75rem 0.75rem 0.75rem 0;
  line-height: 180%;
  margin-top: 1.5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;

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

const SubjectItemWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-top: 1.5rem;
  max-width: 800px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SubjectItem = styled.button<{ $groupId: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ theme: { color }, $groupId }) =>
      $groupId ? color.mainColor : color.borderColor};
  color: ${({ theme: { color }, $groupId }) => $groupId && color.mainColor};
  border-radius: 10px;
  font-weight: bold;
  width: 130px;
  @media screen and (max-width: 768px) {
    width: 100px;
    padding: 0.5rem;
  }
`;
