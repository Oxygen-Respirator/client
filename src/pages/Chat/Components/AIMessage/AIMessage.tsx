import * as S from "./style.ts";
import AiProfile from "@/components/Svg/AiProfile.tsx";

const AIMessage = ({ answer }: { answer: string }) => {
  return (
    <S.AIContainrer>
      <S.Row>
        <S.ProfileImgWrap>
          <AiProfile />
        </S.ProfileImgWrap>
        <p>AI 면접 멘토</p>
      </S.Row>
      <S.AIMessageWrap>{answer}</S.AIMessageWrap>
    </S.AIContainrer>
  );
};

export default AIMessage;
