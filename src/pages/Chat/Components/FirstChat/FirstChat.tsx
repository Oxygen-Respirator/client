import { useRecoilValue, useRecoilState } from "recoil";
import * as S from "./style.ts";

import { groupIdState } from "@/atom/chat";
import { langListAtom } from "@/atom/langList";

import { AiProfile } from "@/components/Svg";

const FirstChat = () => {
  const langList = useRecoilValue(langListAtom);
  const [groupId, setGroupId] = useRecoilState(groupIdState);

  return (
    <S.AIContainrer>
      <S.Row>
        <S.ProfileImgWrap>
          <AiProfile />
        </S.ProfileImgWrap>
        <p>AI 면접 멘토</p>
      </S.Row>
      <S.AIMessageWrap>모의면접 학습할 주제를 선택해주세요.</S.AIMessageWrap>
      <S.SubjectItemWrap>
        {langList.map(({ id, name }) => (
          <S.SubjectItem
            key={id}
            onClick={() => {
              setGroupId(id);
            }}
            $groupId={!!(groupId === id)}
          >
            {name}
          </S.SubjectItem>
        ))}
      </S.SubjectItemWrap>
    </S.AIContainrer>
  );
};

export default FirstChat;
