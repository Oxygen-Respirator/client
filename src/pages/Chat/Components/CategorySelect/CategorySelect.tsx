import { useRecoilValue, useRecoilState } from "recoil";
import * as S from "./style.ts";

import { groupIdState } from "@/atom/chat";
import { langListAtom } from "@/atom/langList";

const CategorySelect = () => {
  const langList = useRecoilValue(langListAtom);
  const [groupId, setGroupId] = useRecoilState(groupIdState);

  return (
    <S.SubjectItemWrap>
      {langList.map(({ id, name }) => {
        const coinCideId = !!(groupId === id);
        return (
          <S.SubjectItem
            key={id}
            onClick={() => {
              setGroupId(id);
            }}
            $groupId={coinCideId}
          >
            {name}
          </S.SubjectItem>
        );
      })}
    </S.SubjectItemWrap>
  );
};

export default CategorySelect;
