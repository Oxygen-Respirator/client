import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as S from "./style.ts";

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
    <S.ChatWrap>
      <S.CustomTextarea
        disabled={!!(remainAnswerCount === 0)}
        value={message || ""}
        onChange={e => setMessage(e.target.value)}
        placeholder={
          remainAnswerCount === 0
            ? "남은 답변 횟수가 없습니다."
            : "텍스트를 입력해주세요"
        }
      />
      <S.ChatSendBtnWrap>
        <p>
          남은 답변 횟수 {remainAnswerCount}/{maxAnswerCount}
        </p>
        <S.ChatSendBtn onClick={handleSendMessage}>전송</S.ChatSendBtn>
      </S.ChatSendBtnWrap>
    </S.ChatWrap>
  );
};

export default ChatSend;
