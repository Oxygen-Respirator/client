import { Fragment, useEffect, useRef } from "react";
import * as S from "./style.ts";
import chatApis from "@/apis/chatApis";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { groupIdState } from "@/atom/chat";
import AIMessage from "../AIMessage/AIMessage.tsx";

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
                {index === 0 && <S.DateText>{createdAt}</S.DateText>}
                {answer && <AIMessage answer={answer} />}
                {userMessage && (
                  <S.RowEnd>
                    <S.MyMessageWrap>{userMessage}</S.MyMessageWrap>
                  </S.RowEnd>
                )}
                {tailQuestion && <AIMessage answer={tailQuestion} />}
              </Fragment>
            );
          },
        )}
      <div ref={messageEndRef}></div>
    </>
  );
};

export default ChatList;
