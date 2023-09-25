import { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";

import { AiProfile } from "@/components/Svg";
import chatApis from "@/apis/chatApis";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { groupIdState } from "@/atom/chat";

const ChatList = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const groupId = useRecoilValue(groupIdState);

  const { data: chatListData, isSuccess } = useQuery<ChatData[]>(
    ["chatList", groupId],
    () => chatApis.get(groupId),
    {
      enabled: !!groupId,
    },
  );
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatListData]);

  return (
    <>
      {isSuccess &&
        chatListData.map(
          ({ id, userMessage, answer, tailQuestion, createdAt }, index) => {
            return (
              <Fragment key={id}>
                {index === 0 && <DateText>{createdAt}</DateText>}

                {answer && (
                  <AIContainrer>
                    <Row>
                      <ProfileImgWrap>
                        <AiProfile />
                      </ProfileImgWrap>
                      <p>AI 면접 멘토</p>
                    </Row>

                    <AIMessageWrap>{answer}</AIMessageWrap>
                  </AIContainrer>
                )}

                {userMessage && (
                  <RowEnd>
                    <MyMessageWrap>{userMessage}</MyMessageWrap>
                  </RowEnd>
                )}
                {tailQuestion && (
                  <AIContainrer>
                    <Row>
                      <ProfileImgWrap>
                        <AiProfile />
                      </ProfileImgWrap>
                      <p>AI 면접 멘토</p>
                    </Row>

                    <AIMessageWrap>{tailQuestion}</AIMessageWrap>
                  </AIContainrer>
                )}
              </Fragment>
            );
          },
        )}
      <div ref={messageEndRef}></div>
    </>
  );
};

export default ChatList;

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
